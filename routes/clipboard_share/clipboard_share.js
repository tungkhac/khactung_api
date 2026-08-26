/*
 * Small encrypted clipboard shared through a single temporary file.
 * The file may be publicly downloadable, but its contents are AES-GCM ciphertext.
 */

var express = require('express');
var crypto = require('crypto');
var fs = require('fs').promises;
var path = require('path');
var router = express.Router();

var STORE_DIR = path.join(__dirname, '../../public/clipboard-share/tmp');
var STORE_FILE = path.join(STORE_DIR, 'latest.enc.json');
var MAX_TEXT_LENGTH = 100000000;
var UNLOCK_PASSWORD = process.env.CLIPBOARD_PASSWORD || 'abcd1234';

// Create an ephemeral RSA key pair for encrypting form data during browser-to-server transport.
var TRANSPORT_KEYS = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: { type: 'spki', format: 'der' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
});
var TRANSPORT_PUBLIC_KEY = TRANSPORT_KEYS.publicKey.toString('base64');

// Compare two strings in constant time after hashing them into equal-length buffers.
function safeEqualText(left, right) {
  var leftHash = crypto.createHash('sha256').update(String(left)).digest();
  var rightHash = crypto.createHash('sha256').update(String(right)).digest();
  return crypto.timingSafeEqual(leftHash, rightHash);
}

// Derive a 256-bit encryption key from the password and a unique salt.
function deriveKey(password, salt) {
  return crypto.scryptSync(password, salt, 32);
}

// Decrypt the hybrid RSA-OAEP and AES-256-GCM payload submitted by the browser.
function decryptTransport(body) {
  var encryptedKey = Buffer.from(body.transportKey || '', 'base64');
  var iv = Buffer.from(body.transportIv || '', 'base64');
  var encryptedWithTag = Buffer.from(body.transportData || '', 'base64');

  if (!encryptedKey.length || iv.length !== 12 || encryptedWithTag.length < 17) {
    throw new Error('Invalid encrypted transport payload');
  }

  // Use RSA only for the random AES key and AES-GCM for the potentially large content.
  var aesKey = crypto.privateDecrypt({
    key: TRANSPORT_KEYS.privateKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: 'sha256'
  }, encryptedKey);
  var authTag = encryptedWithTag.slice(encryptedWithTag.length - 16);
  var ciphertext = encryptedWithTag.slice(0, encryptedWithTag.length - 16);
  var decipher = crypto.createDecipheriv('aes-256-gcm', aesKey, iv);
  decipher.setAuthTag(authTag);
  return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString('utf8');
}

// Encrypt plaintext with AES-256-GCM and return a self-contained JSON payload.
function encrypt(plainText) {
  // Fresh random values ensure identical submissions produce different ciphertext.
  var salt = crypto.randomBytes(16);
  var iv = crypto.randomBytes(12);
  var cipher = crypto.createCipheriv('aes-256-gcm', deriveKey(UNLOCK_PASSWORD, salt), iv);
  var encrypted = Buffer.concat([cipher.update(plainText, 'utf8'), cipher.final()]);

  // Store only encryption metadata and ciphertext; plaintext is never written to disk.
  return {
    version: 1,
    algorithm: 'aes-256-gcm+scrypt',
    salt: salt.toString('base64'),
    iv: iv.toString('base64'),
    tag: cipher.getAuthTag().toString('base64'),
    data: encrypted.toString('base64'),
    updatedAt: new Date().toISOString()
  };
}

// Authenticate and decrypt a previously stored AES-256-GCM payload.
function decrypt(payload) {
  if (!payload || payload.version !== 1) throw new Error('Unsupported encrypted data');

  // Rebuild the key and cipher state from the salt, IV, and authentication tag.
  var salt = Buffer.from(payload.salt, 'base64');
  var decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    deriveKey(UNLOCK_PASSWORD, salt),
    Buffer.from(payload.iv, 'base64')
  );
  decipher.setAuthTag(Buffer.from(payload.tag, 'base64'));
  return Buffer.concat([
    decipher.update(Buffer.from(payload.data, 'base64')),
    decipher.final()
  ]).toString('utf8');
}

// Persist encrypted content atomically so readers cannot observe a partial file.
async function saveEncrypted(text) {
  await fs.mkdir(STORE_DIR, { recursive: true });

  // Write to a process-specific temporary file before replacing the shared file.
  var temporaryFile = STORE_FILE + '.' + process.pid + '.tmp';
  await fs.writeFile(temporaryFile, JSON.stringify(encrypt(text)), { encoding: 'utf8', mode: 0o600 });
  await fs.rename(temporaryFile, STORE_FILE);
}

// Prevent browsers and intermediary caches from retaining sensitive responses.
function noStore(res) {
  res.set('Cache-Control', 'no-store');
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('X-Frame-Options', 'DENY');
}

// Render the text submission page.
router.get('/', function (req, res) {
  noStore(res);
  res.render('clipboard_share/input', {
    title: 'Text', saved: req.query.saved === '1', error: null,
    success_message: req.query.saved === '1' ? 'Saved content successfully.' : null,
    transportPublicKey: TRANSPORT_PUBLIC_KEY
  });
});

// Validate, encrypt, and save the submitted text.
router.post('/', async function (req, res, next) {
  noStore(res);
  var text;

  // Accept ciphertext fields only, ensuring plaintext does not appear in the POST request.
  try {
    text = decryptTransport(req.body);
  } catch (error) {
    return res.status(400).render('clipboard_share/input', {
      title: 'Text', saved: false, error: 'Invalid encrypted submission.',
      transportPublicKey: TRANSPORT_PUBLIC_KEY
    });
  }
  if (!text.trim()) {
    return res.status(400).render('clipboard_share/input', {
      title: 'Text', saved: false, error: 'Please enter content.',
      transportPublicKey: TRANSPORT_PUBLIC_KEY
    });
  }
  if (text.length > MAX_TEXT_LENGTH) {
    return res.status(413).render('clipboard_share/input', {
      title: 'Text', saved: false, error: 'Maximum content length is 100,000,000 characters.',
      transportPublicKey: TRANSPORT_PUBLIC_KEY
    });
  }

  // Forward storage or cryptography errors to the central Express error handler.
  try {
    await saveEncrypted(text);
    return res.redirect('/cb?saved=1');
  } catch (error) {
    return next(error);
  }
});

// Render the unlock form without reading or exposing the stored content.
router.get('/view', function (req, res) {
  noStore(res);
  res.render('clipboard_share/view', {
    title: 'View text', saved: req.query.saved === '1', data: null, error: null
  });
});

// Verify the password, decrypt the latest file, and render its plaintext content.
router.post('/view', async function (req, res, next) {
  noStore(res);

  // Use constant-time comparison to reduce password timing leakage.
  if (!safeEqualText(req.body.password || '', UNLOCK_PASSWORD)) {
    return res.status(401).render('clipboard_share/view', {
      title: 'View text', saved: false, data: null, error: 'Password incorrect.'
    });
  }

  // Access encrypted storage only after the supplied password is accepted.
  try {
    var payload = JSON.parse(await fs.readFile(STORE_FILE, 'utf8'));
    return res.render('clipboard_share/view', {
      title: 'View text', saved: false, data: decrypt(payload), error: null
    });
  } catch (error) {
    // Show a safe empty state when no shared content has been saved yet.
    if (error.code === 'ENOENT') {
      return res.status(404).render('clipboard_share/view', {
        title: 'View text', saved: false, data: null, error: 'No content shared yet.'
      });
    }
    return next(error);
  }
});

module.exports = router;

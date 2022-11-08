var fs = require('fs');

async function isFileExist(file_path) {
    try {
        return fs.existsSync(file_path);
    } catch (err) {
        console.error(err);
    }
    return false;
}

exports.isFileExist = isFileExist;

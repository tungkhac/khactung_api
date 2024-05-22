var fs = require('fs');

async function isFileExist(file_path) {
    try {
        return fs.existsSync(file_path);
    } catch (err) {
        console.error(err);
    }
    return false;
}

function sort(list, type = 'desc', field = null) {
    try {
        if(!Array.isArray(list) || !list.length) {
            return list;
        }
        return list.sort((a, b) => {
            if(field) {
                return (type === 'desc') ? b[field]-a[field] : a[field]-b[field];
            } else {
                return (type === 'desc') ? b-a : a-b;    
            }            
        });
    } catch (err) {
        console.error(err);
        return list;
    }
}

exports.isFileExist = isFileExist;
exports.sort = sort;

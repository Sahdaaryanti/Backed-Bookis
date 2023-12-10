const multer = require('multer');
const imagekit = require('../config/imageKitConfig');

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
});

module.exports = upload;

// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'public/uploads');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     },
// });

// const upload = multer({ 
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 5, // batas ukuran file (dalam byte), contoh disini adalah 5 MB
//     },
// });

// module.exports = upload, storage;

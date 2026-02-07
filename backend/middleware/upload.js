const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'milk-shop',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    resource_type: 'auto',
  },
});



const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedMimes.includes(file.mimetype)) {
      return cb(null, false); // ❗ DO NOT throw error here
    }
    cb(null, true);
  },
});


module.exports = upload;

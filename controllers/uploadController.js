const multer = require('multer');
const path = require('path');

// Set storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Directory to store images
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Generate unique filename
    }
});

// Init multer upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 8000000 }, // 1=8MB limit
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('image');

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images only!');
    }
}

// Upload function
exports.uploadImage = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        if (!req.file) {
            return res.status(400).json({ message: 'No file selected!' });
        }
        res.json({
            message: 'File uploaded successfully!',
            file: `uploads/${req.file.filename}`
        });
    });
};

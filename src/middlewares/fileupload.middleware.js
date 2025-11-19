// 1. import multer
import multer from 'multer';

// 2. configure storage (optional, you can customize as needed)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // specify the destination directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // specify the file name
    }
});

let upload = multer({ storage: storage });

export default upload;
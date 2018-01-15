const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination (req, file, cb) {
        cb(null, './uploads')
    },
    filename (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10000000
    },
    fileFilter: (req, file, cb) => {
        // Check for extension and mime type
        const fileTypes = /jpeg|jpg|png|gif/;
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        // Check the mime type
        const mimeType = fileTypes.test(file.mimetype);

        if (extName && mimeType){
            return cb(null, true);
        } else {
            return cb('Error: incorrect file type. Only images can be uploaded')
        }
    }
});

module.exports = (app) => {
    // Routes declared here

    app.get('/api', (req, res) => {
        res.send({message: 'Hello world'});
    });

    app.post('/api/file', upload.array('files', 20), (req, res, next) => {
        // console.log('POST request received', req);
        res.send(req.files);
    });

};
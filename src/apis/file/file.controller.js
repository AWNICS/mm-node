import express from 'express';
import Multer from 'multer';
import FileService from './file.service';
import bucket from '../../config/gcp.config';

const router = express.Router();
const fileService = new FileService();
const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 5 * 1024 * 1024 // no larger than 5mb
    }
});

//message files
router.post('/file', multer.single('file'), function(req, res, next) {
    const fileName = Date.now() + req.file.originalname;
    //send the created thumbnail back to user
    fileService.resizeToThumb(req, bucket, fileName, (result) => {
        res.send(result);
    });
});

router.get('/file/:fileName', function(req, res) {
    const fileName = req.params.fileName;
    fileService.download(bucket, fileName, res);
});

router.post('/file/thumbnail', multer.single('file'), function(req, res, next) {
    fileService.createThumb(req.file, (result) => {
        req.file.buffer = result;
        req.file.originalname = 'thumbnail_' + req.file.originalname;
        fileService.upload(req, bucket, req.file.originalname , (response) => {
            res.send(response);
        });
    });
});

//other files like reports
router.post('/file/reports', multer.single('file'), function(req, res, next) {
    const fileName = Date.now() + req.file.originalname;
    //send the created thumbnail back to user
    fileService.upload(req, bucket, fileName, (result) => {
        res.send(result);
    });
});

module.exports = router;
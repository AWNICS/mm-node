import express from 'express';
import Multer from 'multer';
import FileUploadService from './file-upload.service';
import bucket from '../../config/gcp.config';

const router = express.Router();
const fileUploadService = new FileUploadService();
const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 5 * 1024 * 1024 // no larger than 5mb
    }
});

router.post('/image', multer.single('file'), function(req, res, next) {
    fileUploadService.uploadImage(req, bucket, next, (result) => {
        res.send(result);
    });
});

router.get('/image/:fileName', function(req, res) {
    const fileName = req.params.fileName;
    fileUploadService.downloadImage(bucket, fileName, res);
});

router.post('/video', multer.single('file'), function(req, res, next) {
    fileUploadService.uploadVideo(req, bucket, next, (result) => {
        res.send(result);
    });
});

router.get('/video/:fileName', function(req, res) {
    const fileName = req.params.fileName;
    fileUploadService.downloadVideo(bucket, fileName, res);
});

router.post('/doc', multer.single('file'), function(req, res, next) {
    fileUploadService.uploadDoc(req, bucket, next, (result) => {
        res.send(result);
    });
});

router.get('/doc/:fileName', function(req, res) {
    const fileName = req.params.fileName;
    fileUploadService.downloadDoc(bucket, fileName, res);
});

module.exports = router;
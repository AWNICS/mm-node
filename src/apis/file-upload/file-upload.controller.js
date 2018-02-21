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

router.post('/controllers/image/up', multer.single('file'), function(req, res, next) {
    fileUploadService.uploadFile(req, bucket, next, (result) => {
        res.send(result);
    });
});

router.get('/controllers/image/down/:fileName', multer.single('file'), function(req, res) {
    console.log('Downloading...');
    const fileName = req.params.fileName;
    fileUploadService.downloadImage(bucket, fileName, (result) => {
        console.log('result ', JSON.stringify(result));
        res.send(result);
    });
});

module.exports = router;
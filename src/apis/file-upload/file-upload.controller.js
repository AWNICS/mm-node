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
    fileUploadService.uploadFile(req, bucket, next);
    res.send({ 'value': 'File successfully uploaded' });
});

router.get('/controllers/image/down', multer.single('file'), function(req, res, next) {
    fileUploadService.uploadFile(req, bucket, next);
    res.send({ 'value': 'File successfully uploaded' });
});

module.exports = router;
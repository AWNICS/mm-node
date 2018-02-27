import fs from 'fs';

class FileUploadService {

    constructor() {
        this.mimeType = {
            '.ico': 'image/x-icon',
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.json': 'application/json',
            '.css': 'text/css',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.wav': 'audio/wav',
            '.mp3': 'audio/mpeg',
            '.mp4': 'video/mp4',
            '.wmv': 'video/x-ms-wmv',
            '.svg': 'image/svg+xml',
            '.pdf': 'application/pdf',
            '.doc': 'application/msword',
            '.eot': 'appliaction/vnd.ms-fontobject',
            '.ttf': 'aplication/font-sfnt'
        };
    }

    uploadImage(req, bucket, next, callback) {
        if (!req.file) {
            return next();
        }
        console.log('Uploading image...');
        const gcsname = Date.now() + req.file.originalname;
        const file = bucket.file(gcsname);

        const stream = file.createWriteStream({
            metadata: {
                contentType: req.file.mimetype
            }
        });

        stream.on('error', (err) => {
            req.file.cloudStorageError = err;
            console.log('Error uploading: ', err);
            next(err);
        });

        stream.on('finish', () => {
            console.log('Upload complete');
        });

        stream.end(req.file.buffer);
        callback(gcsname);
    }

    uploadVideo(req, bucket, next, callback) {
        if (!req.file) {
            return next();
        }
        console.log('Uploading video...');
        const gcsname = Date.now() + req.file.originalname;
        const file = bucket.file(gcsname);

        const stream = file.createWriteStream({
            metadata: {
                contentType: req.file.mimetype
            }
        });

        stream.on('error', (err) => {
            req.file.cloudStorageError = err;
            console.log('Error uploading: ', err);
            next(err);
        });

        stream.on('finish', () => {
            console.log('Upload complete');
        });

        stream.end(req.file.buffer);
        callback(gcsname);
    }

    uploadDoc(req, bucket, next, callback) {
        if (!req.file) {
            return next();
        }
        console.log('Uploading doc...');
        const gcsname = Date.now() + req.file.originalname;
        const file = bucket.file(gcsname);

        const stream = file.createWriteStream({
            metadata: {
                contentType: req.file.mimetype
            }
        });

        stream.on('error', (err) => {
            req.file.cloudStorageError = err;
            console.log('Error uploading: ', err);
            next(err);
        });

        stream.on('finish', () => {
            console.log('Upload complete');
        });

        stream.end(req.file.buffer);
        callback(gcsname);
    }

    downloadImage(bucket, fileName, res) {
        var remoteFile = bucket.file(fileName);
        remoteFile.createReadStream({ encoding: 'base64' })
            .on('error', function(err) {
                console.log('Error in download: ', err);
            })
            .on('response', function(response) {
                // Server connected and responded with the specified status and headers.
            })
            .on('end', function() {
                // The file is fully downloaded.
                console.log('File download complete');
            })
            .pipe(res);
    }

    downloadVideo(bucket, fileName, res) {
        const remoteFile = bucket.file(fileName);
        const readStream = remoteFile.createReadStream({ encoding: 'base64' });
        remoteFile.getMetadata()
            .then((result) => {
                const metadata = result[0];
                res.setHeader('Content-Length', metadata.size);
                res.setHeader('Content-type', metadata.contentType || 'text/plain');
                res.setHeader('Content-Disposition', 'attachment;');
                readStream
                    .on('error', function(err) {
                        console.log('Error in download: ', err);
                    })
                    .on('response', function(response) {
                        // Server connected and responded with the specified status and headers.
                    })
                    .on('end', function() {
                        // The file is fully downloaded.
                        console.log('File download complete');
                    })
                    .pipe(res);
            })
            .catch(err => console.log('err ', err));
    }

    downloadDoc(bucket, fileName, res) {
        const remoteFile = bucket.file(fileName);
        const readStream = remoteFile.createReadStream({ encoding: 'base64' });
        const ext = remoteFile.ext;
        res.setHeader('Content-Length', remoteFile.size);
        res.setHeader('Content-type', this.mimeType[ext] || 'text/plain');
        res.setHeader('Content-Disposition', 'attachment;');
        readStream
            .on('error', function(err) {
                console.log('Error in download: ', err);
            })
            .on('response', function(response) {
                // Server connected and responded with the specified status and headers.
            })
            .on('end', function() {
                // The file is fully downloaded.
                console.log('File download complete');
            })
            .pipe(res);
    }
}

export default FileUploadService;
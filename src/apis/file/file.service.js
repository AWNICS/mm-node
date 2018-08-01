import sharp from 'sharp';
import log from '../../config/log4js.config';

class FileService {

    constructor() {
        this.sharp = sharp;
    }

    createThumb(file, callback) {
        const image = sharp(file.buffer);
        image
            .metadata()
            .then((metadata, err) => {
                if (err) {
                    log.error('Error while converting file ', err);
                } else {
                    return image
                        .resize(Math.round(metadata.width / 2), Math.round(metadata.height / 2))
                        .jpeg({
                            quality: 80,
                            chromaSubsampling: '4:4:4'
                        })
                        .toBuffer({ resolveWithObject: true })
                        .then(({ data, info }) => {
                            log.info('Converted file info: ', info);
                            callback(data);
                        })
                        .catch(err => {
                            log.error('err ', err);
                        });
                }
            });
    }

    upload(req, bucket, next, callback) {
        if (!req.file) {
            return next();
        }
        log.info('Uploading file...');
        const gcsname = Date.now() + req.file.originalname;
        const file = bucket.file(gcsname);

        const stream = file.createWriteStream({
            metadata: {
                contentType: req.file.mimetype
            }
        });

        stream.on('error', (err) => {
            req.file.cloudStorageError = err;
            log.error('Error uploading: ', err);
            next(err);
        });

        stream.on('finish', () => {
            log.info('Upload complete');
            callback(gcsname);
        });

        stream.end(req.file.buffer);
    }

    download(bucket, fileName, res) {
        var remoteFile = bucket.file(fileName);
        const readStream = remoteFile.createReadStream({
            encoding: 'base64'
        });
        remoteFile.getMetadata()
            .then((result) => {
                const metadata = result[0];
                res.setHeader('Content-Length', metadata.size);
                res.setHeader('Content-type', metadata.contentType || 'text/plain');
                res.setHeader('Content-Disposition', 'attachment;');
                readStream
                    .on('error', function(err) {
                        log.error('Error in download: ', err);
                    })
                    .on('response', function(response) {
                        // Server connected and responded with the specified status and headers.
                    })
                    .on('end', function() {
                        // The file is fully downloaded.
                        log.info('File download complete');
                    })
                    .pipe(res);
            })
            .catch(err => log.error('err ', err));
    }
}

export default FileService;
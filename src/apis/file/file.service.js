import sharp from 'sharp';
import log from '../../config/log4js.config';
import fs from 'fs';

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
        //resize the image to thumbnail for faster UI repsone time
    resizeToThumb(req, bucket, fileName, callback) {
        if (req.file.mimetype.match(/image/)) {
            sharp(req.file.buffer)
                .resize(130, 130)
                .ignoreAspectRatio()
                .jpeg()
                .toBuffer({ resolveWithObject: true })
                .then(({ data, info }) => {
                    let imageExtension = fileName.match(/\.\S+$/);
                    let thumbFileName = fileName.replace(imageExtension[0],'') + '-thumb'+'.jpeg';
                    fileName = fileName.replace(imageExtension[0],'.jpeg')
                    log.info('Resized file info: ', info);
                    const file = bucket.file(thumbFileName);

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
                        log.info('Upload Thumbnail complete');
                        callback(thumbFileName);
                        this.upload(req, bucket, fileName, (result) => {});
                    });
                    stream.end(data);
                })
                .catch(err => {
                    log.error('Error in resize to thumb method Fileservice ', err);
                });
        } else {
            this.upload(req, bucket, fileName, (result) => {
                callback(result);
            });
        }
    }

    upload(req, bucket, fileName, callback) {
        if (!req.file) {
            return next();
        }
        log.info('Uploading file...');
        const gcsname = fileName;
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
            callback(fileName);
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
                res.setHeader('Cache-control', 'private, max-age=1728000')
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

    pdfUpload(fileName, bucket, callback) {
        bucket.upload('./tmp/' + fileName, { destination: fileName }, (err, file) => {
            if (err) {
                log.info('Error while  uploading pdf ' + err);
            } else {
                log.info('Uploading PDF success');
                fs.unlink('./tmp/' + fileName);
                callback({ "fileName": fileName });
            }
        })
    }
}

export default FileService;

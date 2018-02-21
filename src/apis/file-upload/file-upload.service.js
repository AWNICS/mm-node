class FileUploadService {
    constructor() {}

    uploadFile(req, bucket, next, callback) {
        if (!req.file) {
            return next();
        }

        const gcsname = req.file.originalname;
        const file = bucket.file(gcsname);

        const stream = file.createWriteStream({
            metadata: {
                contentType: req.file.mimetype
            }
        });

        stream.on('error', (err) => {
            req.file.cloudStorageError = err;
            next(err);
        });

        stream.on('finish', () => {
            req.file.cloudStorageObject = gcsname;
            file.makePublic().then(() => {
                req.file.cloudStoragePublicUrl = this.getPublicUrl(gcsname);
                next();
            });
        });

        stream.end(req.file.buffer);
        callback(gcsname);
    }

    getPublicUrl(filename) {
        return `https://storage.googleapis.com/mmstore/${filename}`;
    }

    downloadImage(bucket, fileName, callback) {
        const destFilename = `C:/Users/arun-awnics/Downloads/google_downloads/${fileName}`;
        const options = {
                destination: destFilename
            }
            // Download a file from your bucket.
        bucket.file(fileName).download(options).then(() => {
                console.log(`Download of ${fileName} success at ${destFilename}`);
                callback(this.getPublicUrl(fileName));
            })
            .catch((err) => {
                console.log('Error ', err);
            });
    }
}

export default FileUploadService;
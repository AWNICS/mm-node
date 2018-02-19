class FileUploadService {
    constructor() {}

    uploadFile(req, bucket, next) {
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
    }


    getPublicUrl(filename) {
        return `https://storage.googleapis.com/mmstore/${filename}`;
    }
}

export default FileUploadService;
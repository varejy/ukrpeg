import path from 'path';

export default function wwwRedirect (req, res, next) {
    if (req.originalUrl.match(/^\/.well-known\/pki-validation\/247F40C458DA926F1493D88C3CE5DE8E.txt/)) {
        return res.sendFile(path.resolve(__dirname, '..', 'verification', 'https.txt'));
    }

    next();
};

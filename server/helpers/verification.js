import path from 'path';

export default function wwwRedirect (req, res, next) {
    if (req.originalUrl.match(/^\/.well-known\/pki-validation\/498CD1BF1F8ED54BFC7B0925B1C7DF4D.txt/)) {
        return res.sendFile(path.resolve(__dirname, '..', 'verification', 'https.txt'));
    }

    next();
};

import path from 'path';

export default function wwwRedirect (req, res, next) {
    if (req.originalUrl.match(/^\/.well-known\/pki-validation\/55DF69A746A2FA1057CFE15A57722598.txt/)) {
        return res.sendFile(path.resolve(__dirname, '..', 'verification', 'https.txt'));
    }

    next();
};

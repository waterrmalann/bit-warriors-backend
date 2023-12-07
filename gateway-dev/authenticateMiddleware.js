import jwt from 'jsonwebtoken';

export default function authenticate(req, res, next) {
    let token = req.cookies.jwt;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.headers['X-Username'] = decoded.username;
            req.headers['X-Verified'] = "true";
        } catch (err) {
            req.headers['X-Verified'] = "false";
        }
    } else {
        req.headers['X-Verified'] = "false";
    }
    next();
}
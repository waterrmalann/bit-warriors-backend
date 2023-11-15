import jwt from 'jsonwebtoken';

export default function authenticate(req, res, next) {
    let token = req.cookies.jwt;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.headers['X-Username'] = decoded.username;
            next();
        } catch (err) {
            res.status(401).send("not authorized, invalid token");
        }
    } else {
        res.status(401).send("not authorized, no token");
    }
}
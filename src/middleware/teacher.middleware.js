import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()

export default (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, value) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        if (value.id && value.status === 'teacher') {
            req.teacher = value;
            next();
        } else {
            return res.status(403).json({ error: 'Forbidden' });
        }
    });
};
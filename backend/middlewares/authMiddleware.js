import jwt from 'jsonwebtoken';

//protect route from unauthenticated users
export const requireSignin = async (req, res, next) => {
    try {
        const decoded = jwt.verify(
            req.headers.authtoken, 
            process.env.JWT_SECRET
        );
        next();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
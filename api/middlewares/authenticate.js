import { checkToken, verifyToken } from '../utils/toolbox.js'

export const authenticate = (req, res, next) => {
    try {
        const token = checkToken(req);

        if (!token) return res.status(401).send({ status: false, message: 'Access denied, Token required' });
        const decodedToken = verifyToken(token);

        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(404).send({ status: false, message: error.message });
    }
}

export const checkIfIsAdmin = (req, res, next) => {
    const { role } = req.user;
    if(role !== 'admin'){
        return res.status(401).send({ status: false, message: 'Access denied, Admin Access Only !!!' });
    }
    next()
}
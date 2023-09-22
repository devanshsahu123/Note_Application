var jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const checkUser = await jwt.verify(token, process.env.JWT_SECRET_KEY,
            (err, decoded) => {
                if (err) {
                    console.error('Token verification failed:', err.message);
                    return res.status(401).json({
                        status: false,
                        error: req.__('Token verification failed')
                    })
                }
                req.user = decoded
                next();
            })
    } catch (error) {
        return res.status(401).json({
            status: false,
            error: req.__('UNAUTHORIZE')
        })
    }
}

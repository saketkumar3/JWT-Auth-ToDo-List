const jwt = require('jsonwebtoken');

const isAuth = (req,res,next) => {
    const token = req.headers['authorization'];

    if(!token) {
        return res.status(403).json({message: 'Unauthorize'});
    }

    jwt.verify(token,process.env.JWT_SECRET, (err,decoded) =>{
        if(err){
            return res.status(403).json({ message: 'Invalud token'});
        }
        req.user = decoded;

    next();
    });
};

module.exports = isAuth;
const JWT = require('jsonwebtoken');

exports.userAuth = (req,res, next) => {

    const token = req.headers['token'];
    if(token) {
        JWT.verify(token, 'binMohammad',(error, response) => {
            if(error){
                return res.status(401).json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            }
            req.headers.email = response['email'];
            next();
        })
    }else {
        return res.status(401).json({
            success: false,
            message: 'No token provided.'
        });
    }

}
const jwt = require('jsonwebtoken');

const secret = 'somethingsecret';
 
function authenticate(req, res, next){
    const token = req.headers['x-auth-token'];
    try{
        const { userId, name, handle } = jwt.verify(token, new Buffer(secret, 'base64'));
        req.user = { userId, name, handle };
        next();
    }catch(error){
        console.log(error)
        res.status(401).send({message: 'Unable to authenticate'})
    }
}

module.exports = {
    authenticate,
}
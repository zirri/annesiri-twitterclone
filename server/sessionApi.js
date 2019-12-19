const express = require('express');
const router = express.Router();
const db = require('./databaseService');
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

router.post('/', async (req, res) => {
    const { handle, password } = req.body;
    const user = await db.getUserByHandle(handle);

    if(!user){
        return res.status(401).json({message: 'Unknown user'});
    }
    if(user.password !== password){
        return res.status(401).json({message: 'Wrong password'});
    }
    const token = jwt.sign({
        userId: user.id,
        handle: user.handle,
        name: user.name
    }, new Buffer(secret, 'base64'));
    res.json({token})
})

module.exports = router;
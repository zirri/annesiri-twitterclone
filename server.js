require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const port = process.env.PORT;
const twittercloneApi = require('./server/twittercloneApi');
const db = require('./server/databaseService');
const { authenticate } = require('./middleware');

const secret = process.env.SECRET;

app.use(express.static('build'));

const api = express();

//Body parser
api.use(bodyParser.json());
api.use(cors());

//middleware
api.use('/', (req, res, next) =>{
    console.log(`Incoming request: type ${req.method}`);
    next();
})

api.post('/tweets', authenticate);

//routing
api.use('/tweets', twittercloneApi);

api.get('/session', authenticate, (req,res) => {
    res.send({
        message: 'You are authenticated'
    });
});


api.post('/session', async (req, res) => {
    const { handle, password } = req.body;
    const user = await db.getUserByHandle(handle);

    if(!user){
        return res.status(401).json({error: 'Unknown user'});
    }
    if(user.password !== password){
        return res.status(401).json({error: 'Wrong password'});
    }
    const token = jwt.sign({
        userId: user.id,
        handle: user.handle,
        name: user.name
    }, new Buffer(secret, 'base64'));
    res.json({token})
});

app.use('/api', api);

app.listen(port, () => {
    console.log(`Twitterclone is running on http://localhost:${port}`);
});
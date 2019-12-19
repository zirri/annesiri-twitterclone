const express = require('express');
const router = express.Router();
const db = require('./databaseService');


router.get('/', async (req, res) => {
    const tweets = await db.getAllTweets();
    res.json(tweets)
})

router.get('/:handle', async (req, res) => {
    const handle = req.params.handle;
    const tweets = await db.getTweetsByUser(handle);
    res.json(tweets)
})

router.post('/', async (req,res)=>{
    const { message } = req.body;
    const user = req.user;
    console.log(message)
    const tweet = await db.insertNewTweet(message, user.userId);
    res.json(tweet);
})

module.exports = router;

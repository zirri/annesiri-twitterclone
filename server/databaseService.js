const Pool = require('pg').Pool;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function getAllTweets(){
    const sql = `
    SELECT tweets.id, 
        tweets.message,
        tweets.created_at,
        users.name,
        users.handle
    FROM
        tweets, 
        users
    WHERE
        users.id = tweets.user_id
    ORDER BY
        tweets.id DESC;`

    const tweets = await pool.query(sql);
    return tweets.rows;
};

async function getTweetsByUser(handle){
    const sql = `
    SELECT tweets.id, 
        tweets.message,
        tweets.created_at,
        users.name,
        users.handle
    FROM
        tweets, 
        users
    WHERE
        users.id = tweets.user_id
    AND
        users.handle = $1
    ORDER BY
        tweets.created_at DESC;;`

    const tweets = await pool.query(sql,[handle]);
    return tweets.rows;
};

async function insertNewTweet(message, userId){
    const sql = `
    INSERT INTO tweets
        (message, user_id)
    VALUES
        ($1, $2)
    RETURNING *;`

    const tweet = await pool.query(sql, [message, userId]);
    return tweet.rows[0];
};

async function getUserByHandle(handle){
    const sql = `SELECT 
        name,
        password,
        handle,
        id
    FROM 
        users
    WHERE
        handle = $1;`

    const user = await pool.query(sql, [handle]);
    return user.rows[0];
}

module.exports = {
    getAllTweets,
    getTweetsByUser,
    insertNewTweet,
    getUserByHandle
}
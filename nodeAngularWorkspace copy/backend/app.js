const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.post("/api/posts", (req, res, next) => {
    const post = req.body;
    res.status(201).json({
        message: 'Post added successfully'
    });
})

app.use("/api/posts", (req, res, next) => {
   const posts = [
    {
        id: 'adafsdff',
        title: 'First Server',
        content: 'This is server side content'
    },
    {
        id: 'adafsdff',
        title: 'Second Server',
        content: 'This is server side content'
    },
   ]
   res.status(200).json({
    message: 'Posts featched successfully',
    posts: posts
   });
    next();
});

app.use((req, res, next) => {
    res.send('Hello from second');
});

module.exports = app;
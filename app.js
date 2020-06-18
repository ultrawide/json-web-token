const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'welcome to the API'
    });
});

app.post('/api/post', (req, res) => {
    res.json({
        message: "post created"
    });
});

app.post('/api/post/login', (req, res) => {
    // Mock user
    const user = {
        id: 1, 
        username: 'colin',
        email: 'colin@gmail.com'
    }

    jwt.sign({user: user}, 'secretkey', (err, token) => {
        res.json({
            token: token
        });
    });
});

app.listen(3000, () => console.log('Server started on port 3000'))
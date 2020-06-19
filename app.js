const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'welcome to the API'
    });
});

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secret', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: "post created...",
                authData
            });
        }
    });
});

app.post('/api/login', (req, res) => {
    // Mock user
    const user = {
        id: 1, 
        username: 'colin',
        email: 'colin@gmail.com'
    }

    jwt.sign({user: user}, 'secret', {expiresIn: '30s'}, (err, token) => {
        res.json({
            token: token
        });
    });
});

// FORMAT of token
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
    // Get the auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined 
    if (typeof bearerHeader !== "undefined") {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}

app.listen(3000, () => console.log('Server started on port 3000'))
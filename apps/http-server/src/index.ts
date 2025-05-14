import express from 'express';
import jwt from 'jsonwebtoken';
import { JWTSECRET } from './config';
import { authMiddleware } from './middleware';
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/api/v1/sign-in', (req, res) => {
    const user = req.body.user;
    const password = req.body.password;
    const userId = "1234";

    const token = jwt.sign({ userId }, JWTSECRET);
    res.send({ token });
});

app.post('/api/v1/sign-up', (req, res) => {
    res.send('Hello World!');
});

app.post('/api/v1/create-room',authMiddleware, (req, res) => {
    res.send('Hello World!');
});

app.listen(3001, () => {
    console.log('HTTP Server is running on port 3001');
});
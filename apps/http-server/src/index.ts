import express from 'express';
import jwt from 'jsonwebtoken';
import { JWTSECRET } from '@repo/backend-common/config';
import { authMiddleware } from './middleware';
import { CreateUserSchema, SignInSchema, CreateRoomSchema } from '@repo/common/types';
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/api/v1/sign-in', (req, res) => {

    const data = SignInSchema.safeParse(req.body);
    if(!data.success){
        res.status(400).json({ message: data.error.message });
        return;
    }
    //TODO: check user and password
    const user = req.body.user;
    const password = req.body.password;
    const userId = "1234";
    
    const token = jwt.sign({ userId }, JWTSECRET);
    res.send({ token });
});

app.post('/api/v1/sign-up', (req, res) => {
    const data = CreateUserSchema.safeParse(req.body);
    if(!data.success){
        res.status(400).json({ message: data.error.message });
        return;
    }
    //TODO: save user to database
    res.json({ message: 'Hello World!' });  
});

app.post('/api/v1/create-room',authMiddleware, (req, res) => {
    const data = CreateRoomSchema.safeParse(req.body);
    if(!data.success){
        res.status(400).json({ message: data.error.message });
        return;
    }
    //TODO: save room to database
    res.json({ message: 'Hello World!' });
});

app.listen(3001, () => {
    console.log('HTTP Server is running on port 3001');
});
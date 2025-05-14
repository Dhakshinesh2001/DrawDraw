import WebSocket from 'ws'; 
import jwt from 'jsonwebtoken';
import { JWTSECRET } from '@repo/backend-common/config';

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws, request) => {

    const url  =  request.url;
if(!url){
    return;
}
    const queryParam = new URLSearchParams(url.split('?')[1]);
    const token = queryParam.get('token') || "";

    const decoded = jwt.verify(token, JWTSECRET) as { userId: string };

    if(!decoded || !decoded.userId){
        ws.close();
        return;
    }

    ws.on('message', (message) => {
        console.log('received: %s', message);


        ws.send('something');
    });

   
});
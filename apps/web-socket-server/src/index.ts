import WebSocket from 'ws'; 
import jwt from 'jsonwebtoken';
import { JWTSECRET } from '@repo/backend-common/config';
import { prisma } from '@repo/db/client';   

const wss = new WebSocket.Server({ port: 8080 });


interface User { 
    userId: string;
    rooms: string[];
    ws: WebSocket;
}

const users: User[] = [];

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

    users.push({
        userId: decoded.userId,
        rooms: [],
        ws
    });

    ws.on('message', async (data) => {
    const parsedData = JSON.parse(data as unknown as string);

        if(parsedData.type === 'join'){
            users.find(x=> x.ws === ws )?.rooms.push(parsedData.roomId);
            ws.send(JSON.stringify({ type: 'join', roomId: parsedData.roomId, message: "You have joined the room" }));
        }
        else if(parsedData.type === 'leave'){
           const user = users.find(x =>x.ws === ws);
           if(!user){
               return;
           }
           user.rooms.splice(user.rooms.indexOf(parsedData.roomId), 1);
            ws.send(JSON.stringify({ type: 'leave', roomId: parsedData.roomId,message: "You left the room" }));
        }
        else if(parsedData.type === 'message'){ 
await prisma.chat.create({   
  data: {     
      message: parsedData.message,
      roomId : parseInt(parsedData.roomId),
      userId : parseInt(decoded.userId),
  }
});

            users.forEach(user => {
                if(user.rooms.includes(parsedData.roomId) && user.ws !== ws){
                    user.ws.send(JSON.stringify({ type: 'message', roomId: parsedData.roomId, message: parsedData.message }));
                }
            });
        }

       
    });

   
});
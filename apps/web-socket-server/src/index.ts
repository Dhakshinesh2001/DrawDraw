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
    // console.log("connected");
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
        console.log("message received");
        console.log(data);
    const parsedData = JSON.parse(data as unknown as string);
    console.log(JSON.stringify(parsedData));
    // console.log(JSON.stringify(parsedData));

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
            console.log("message received");
            console.log(parsedData);
            console.log(parsedData.roomId);
            try{
await prisma.chat.create({   
  data: {     
      message: parsedData.message,
      roomId : Number(parsedData.roomId),
      userId : parseInt(decoded.userId)
  }
});}catch(e){
console.log(e);
}
            // console.log("reached line 63");
            users.forEach(user => {
                if(user.rooms.includes(parsedData.roomId)){
                    // console.log("reached line ");
                    user.ws.send(JSON.stringify({ type: 'message', roomId: parsedData.roomId, message: parsedData.message }));
                }
            });
        }

       
    });

   
});
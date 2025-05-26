import axios from "axios";
import { BACKEND_URL } from "../app/config";
import { ChatRoomClient } from "./ChatRoomClient";

export async function getChats(roomId:  string) {
    // console.log(`${BACKEND_URL}/chats/${roomId}`);
    const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`,
         { 'headers': { 'Authorization': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc0ODE5NDEzM30.2g4HDnAkvyTcSOteFT3cCKl1ifFOme2BkDjKd-2zvtU` } });
    return response.data.chats;
}

export async function ChatRoom({id}: {
    id: string
}) {
    const messages = await getChats(id);
    // console.log("messages:");
    // console.log(JSON.stringify(messages));

    return (
        <div>
            <ChatRoomClient id={id} messages={messages} />
        </div>
    )
}
    

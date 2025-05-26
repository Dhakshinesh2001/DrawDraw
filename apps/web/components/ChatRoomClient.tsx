"use client";

import { useSocket } from "../hooks/useSocket";
import { useEffect, useState } from "react";

export function ChatRoomClient(
    { id, messages }:
        {
            id: string,
            messages: { message: string, userId?: string }[];
        }
) {

    const [chats, setChats] = useState(messages ?? []);
    const [currentMessage, setCurrentMessage] = useState("");
    const { socket, loading } = useSocket();


    useEffect(() => {
        if (socket && !loading) {

            socket.send(JSON.stringify({ type: "join", roomId: `${id}` }));
            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.type === "message") {
                    setChats(c => [...c, { message: data.message, userId: data.userId ?? "" }]);
                }
            };
        }
    }, [socket, loading, id]);
    // console.log(JSON.stringify({ chats }));

   
    let a = 0;
    return (
        <div>
            {
                chats.map(c => {
                    
                    a++;
                    return (
                        <div key={a} style={{
                            border: "1px solid black",
                            margin: "20px"
                        }}>
                            <div >
                                {c.userId}
                            </div>
                            <div>
                                {c.message}
                            </div>
                        </div>
                    )
                }
                )}


            <input type="text" value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} />
            <button onClick={() => {
                socket?.send(JSON.stringify({ type: "message", message: currentMessage, roomId: `${id}` }));
                setCurrentMessage("");
            }}>Send</button>

        </div>
    )
}
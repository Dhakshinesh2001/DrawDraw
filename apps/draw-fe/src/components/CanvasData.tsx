"use client";

import Canvas from './Canvas'
import{useEffect, useState } from 'react'
import Loading from './Loading';
// import ws from 'ws'

const CanvasData = ({roomId}: {roomId : string}) => {

  const [socket,setSocket] = useState<WebSocket | null>(null);
  // const roomIdstr= `"` + roomId + `"`;
  // console.log(roomIdstr);

    useEffect(() => {
        console.log("use effect");
        const ws = new WebSocket(`ws://localhost:8080/?token=${localStorage.getItem('token')}`);
        
        ws.onopen = () => {
          setSocket(ws);
            console.log("connected");
            ws.send(JSON.stringify({ type: 'join', roomId }));
        };

        return () => {
            console.log("unmounting");
            ws.close();
        }
        

    },[]);

    if(!socket){
        return <Loading />
    }

  return (
    <Canvas roomId={roomId} socket={socket} />
  )
}

export default CanvasData
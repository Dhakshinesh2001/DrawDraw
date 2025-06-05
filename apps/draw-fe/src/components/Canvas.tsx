"use client";

import { drawShapes, endEventListeners } from "@/Draw";
import { useEffect, useRef } from "react"

export default function Canvas({roomId, socket}: {roomId : string, socket: WebSocket}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

        useEffect(() => {

            if (canvasRef.current) {
                drawShapes(canvasRef.current, [], socket, roomId);
            }
            return () => {
                console.log("unmounting");
                endEventListeners(canvasRef.current);
            }
        },[]);
    return <div>
        <canvas ref={canvasRef} width={2000} height={1000}></canvas>
    </div>
}
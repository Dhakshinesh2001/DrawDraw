"use client";

// import { drawShapes, endEventListeners } from "@/Draw";
import { use, useEffect, useRef, useState } from "react"
import { CanvasClass } from "../Draw/canvasClass";

export default function Canvas({roomId, socket}: {roomId : string, socket: WebSocket}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [currShape, setCurrShapes] = useState<"rect" | "circle">("rect");
    const [canvasGame, setCanvasGame] = useState<CanvasClass>();
    // const [socket  , setSocket] = useState<WebSocket>();

        useEffect(() => {

            if (canvasRef.current) {
                const canvas = new CanvasClass(canvasRef.current, socket, roomId);
                setCanvasGame(canvas);
                // drawShapes(canvasRef.current, [], socket, roomId);
            }
            return () => {
                console.log("unmounting");
                canvasGame?.endEventListeners();
            }
        },[]);

        useEffect(() => {
            canvasGame?.setCurrTool(currShape);
        },[currShape]);
    return <div>
        <canvas ref={canvasRef} width={2000} height={1000}></canvas>
    </div>
}
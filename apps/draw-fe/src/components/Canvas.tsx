"use client";

// import { drawShapes, endEventListeners } from "@/Draw";
import { use, useEffect, useRef, useState } from "react"
import { CanvasClass } from "../Draw/canvasClass";

export default function Canvas({roomId, socket}: {roomId : string, socket: WebSocket}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [currTool, setCurrTool] = useState<"rect" | "circle">("rect");
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
            canvasGame?.setCurrTool(currTool);
        },[currTool]);
    return <div>
        <canvas ref={canvasRef} width={2000} height={1000}></canvas>

        <div className="absolute top-2 justify-items-center flex gap-2">
        <button onClick={()=>setCurrTool("rect")}>Rect</button>
        <button className="bg-red-500" onClick={()=>setCurrTool("circle")}>Circle</button>
        </div>
    </div>
}
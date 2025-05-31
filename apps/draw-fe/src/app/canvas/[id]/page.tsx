"use client";

import { drawShapes } from "@/Draw";
import { useEffect,useState, useRef } from "react"

export default function Canvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [canvasShapes, setCanvasShapes] = useState<CanvasClass | null>(null);
     let clicked = false;
            let startX = 0;
            let startY = 0;
    
    
    useEffect(() => {

        if (canvasRef.current) {
            drawShapes(canvasRef.current);
        }            
        },[]);
      
    // useEffect(() => {}, [canvasShapes]);
    return <div>
        <canvas ref={canvasRef} width={500} height={500}></canvas>
    </div>
}
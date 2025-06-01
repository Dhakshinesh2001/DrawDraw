// import axios from "axios";
type Shape = {
    type : "rect";
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}

class CanvasClass {
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    public shapes: Shape[] = [];
    
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
    }

    DrawRect(startX: number, startY: number, endX: number, endY: number) {
        this.ctx.strokeRect(startX, startY, endX-startX, endY - startY);
    }
}
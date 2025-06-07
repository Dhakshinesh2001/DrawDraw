// import axios from "axios";
// import draePrev
type Shape = {
    type : "rect" | "circle";
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}

export class CanvasClass {
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    public shapes: Shape[] = [];
    public currTool: "rect" | "circle" = "rect";
    public clicked = false;
    public startX = 0;
    public startY = 0;
    public socket: WebSocket;
    public roomId: string;

    
    constructor(canvas: HTMLCanvasElement,socket: WebSocket, roomId: string) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.initMouseEvents();
        this.socket = socket;
        this.roomId = roomId;
        this.socketHandler();
        
    }

    setCurrTool(Tool: "rect" | "circle") {
        this.currTool = Tool;
    }

    socketHandler() {
        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data);
            if(data.type === "message"){
                const s = JSON.parse(data.message);
                console.log(s);
                if(s.type === "rect" || s.type === "circle"){
                this.shapes.push(s);
                this.drawPreviousShapes();}
            }
        }
    }

    handleMouseDown = (e: MouseEvent) => {
        console.log("down");
        this.clicked = true
        this.startX = e.clientX
        this.startY = e.clientY
    };

    handleMouseUp = (e: MouseEvent) => {
        console.log("up inside class");
        this.clicked = false;
        this.shapes.push({type: this.currTool, startX: this.startX, startY: this.startY, endX: e.clientX, endY: e.clientY});
        console.log(this.shapes);

        this.socket.send(JSON.stringify({type: "message", roomId:this.roomId, message: JSON.stringify({type: this.currTool  , startX: this.startX, startY: this.startY, endX: e.clientX, endY: e.clientY})}));
    };

    handleMouseMove = (e: any)=> {
        if (this.clicked) {
            const width = e.clientX - this.startX;
            const height = e.clientY - this.startY;  
            this.drawPreviousShapes();
            this.ctx.strokeStyle = "#FF0000";

            if(this.currTool === "rect"){
                this.ctx.strokeRect(this.startX, this.startY, width, height);
            }
            else if(this.currTool === "circle"){
                const centerX = this.startX + width/2;
                const centerY = this.startY + height/2;
                const radius = Math.max(Math.abs(width/2), Math.abs(height/2));
                this.ctx.strokeStyle = "#FF0000";
                this.ctx.beginPath();
                this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                this.ctx.stroke();
            }
        }};

    initMouseEvents() {
        this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    }

    // DrawRect(startX: number, startY: number, endX: number, endY: number) {
    //     this.ctx.strokeRect(startX, startY, endX-startX, endY - startY);
    // }

    drawPreviousShapes() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.shapes.forEach(shape => {
            const width = shape.endX - shape.startX;
            const height = shape.endY - shape.startY;  
            // this.drawPreviousShapes();
            this.ctx.strokeStyle = "#FF0000";

            if(this.currTool === "rect"){
                this.ctx.strokeRect(shape.startX,shape.startY, width, height);
            }
        else if(this.currTool === "circle"){
                const centerX = shape.startX + width/2;
                const centerY = shape.startY + height/2;
                const radius = Math.max(Math.abs(width/2), Math.abs(height/2));
                this.ctx.strokeStyle = "#FF0000";
                this.ctx.beginPath();
                this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                this.ctx.stroke();
            }
    });
    }

    endEventListeners() {
        this.canvas.removeEventListener('mousedown',this.handleMouseDown.bind(this));
        this.canvas.removeEventListener('mouseup', this.handleMouseUp.bind(this));
        this.canvas.removeEventListener('mousemove', this.handleMouseMove.bind(this));
    }
}
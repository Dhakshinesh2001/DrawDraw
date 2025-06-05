
let handleMouseDownRef: ((e: MouseEvent) => void) | null = null;
let handleMouseUpRef: ((e: MouseEvent) => void) | null = null;
let handleMouseMoveRef: ((e: MouseEvent) => void) | null = null;

export function drawShapes(canvas: HTMLCanvasElement, shapes: Shape[], socket: WebSocket, roomId: string) {
    console.log("draw");
    const ctx = canvas.getContext('2d')!;

    let shapesInCanvas: Shape[] = shapes;
    let clicked = false;
    let startX = 0;
    let startY = 0;

    socket.onmessage = (event) => {
      
        const data = JSON.parse(event.data);
 
        

        const s = JSON.parse(data.message);

        console.log("s:",s);

        // console.log(s.message.type);
        console.log(s.startX);
        console.log(s.startY);
        console.log(s.endX);
        console.log(s.endY);
        console.log(s.type);

       
        if (data.type === 'message') {
            console.log("pushing shape");
            shapesInCanvas.push(s);
            console.log("drawing");
            console.log(shapesInCanvas);
            drawPreviousShapes(canvas, shapesInCanvas, ctx);
        }
        
    }

     handleMouseDownRef = function handleMouseDown(e) {
        console.log("down");
        clicked = true
        startX = e.clientX
        startY = e.clientY
    };

    handleMouseUpRef =  function handleMouseUp(e: any) {
        console.log("up");
        clicked = false;
        shapesInCanvas.push({type: "rect", startX, startY, endX: e.clientX, endY: e.clientY});
        socket.send(JSON.stringify({type: "message", roomId:roomId, message: JSON.stringify({type: "rect", startX, startY, endX: e.clientX, endY: e.clientY})}));
    };

    handleMouseMoveRef =  function handleMouseMove(e: any) {
        if (clicked) {
            const width = e.clientX - startX;
            const height = e.clientY - startY;  
            drawPreviousShapes(canvas, shapesInCanvas, ctx);
            ctx.strokeStyle = "#FF0000";
            ctx.strokeRect(startX, startY, width, height);
        }};
    
    // let shapesInCanvas: Shape[] = shapes;

    if (!ctx)  return;

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);



    canvas.addEventListener('mousedown', handleMouseDownRef!);

    canvas.addEventListener('mouseup',handleMouseUpRef!)            

    canvas.addEventListener('mousemove',handleMouseMoveRef!);


   
}




function drawPreviousShapes(canvas: HTMLCanvasElement, shapes: Shape[], ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    shapes.forEach(shape => {
        if (shape.type === "rect") {
            ctx.strokeRect(shape.startX, shape.startY, shape.endX - shape.startX, shape.endY - shape.startY);
        }
    });
}

export function endEventListeners(canvas: HTMLCanvasElement | null) {
    if(!canvas){
        return;
    }
    canvas.removeEventListener('mousedown', handleMouseDownRef!);
    canvas.removeEventListener('mouseup', handleMouseUpRef!);
    canvas.removeEventListener('mousemove', handleMouseMoveRef!);
}
    

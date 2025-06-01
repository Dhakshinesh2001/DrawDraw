


export function drawShapes(canvas: HTMLCanvasElement, shapes: Shape[]) {
    console.log("draw");
    const ctx = canvas.getContext('2d')!;

    let shapesInCanvas: Shape[] = [];

    if (!ctx)  return;

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let clicked = false;
    let startX = 0;
    let startY = 0;

    canvas.addEventListener('mousedown', (e) => {
        console.log("down");
        clicked = true
        startX = e.clientX
        startY = e.clientY
    })

    canvas.addEventListener('mouseup', (e: any) => {
        console.log("up");
        clicked = false;
        shapesInCanvas.push({type: "rect", startX, startY, endX: e.clientX, endY: e.clientY});
    })            

    canvas.addEventListener('mousemove', (e: any) => {
        if (clicked) {
            const width = e.clientX - startX;
            const height = e.clientY - startY;  
            drawPreviousShapes(canvas, shapesInCanvas, ctx);
            ctx.strokeStyle = "#FF0000";
            ctx.strokeRect(startX, startY, width, height);
        }
    });
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
    

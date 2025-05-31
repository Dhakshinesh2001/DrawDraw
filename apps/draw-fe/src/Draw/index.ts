export function drawShapes(canvas: HTMLCanvasElement) {
    console.log("draw");
    const ctx = canvas.getContext('2d')!;

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

    canvas.addEventListener('mouseup', (e) => {
        console.log("up");
        clicked = false;
         const width = e.clientX - startX;
            const height = e.clientY - startY;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            console.log("stroking")
            ctx.strokeStyle = "#ffffff";
            ctx.strokeRect(startX, startY, width, height);
        // console.log(e.clientX)
        // console.log(e.clientY)
    })            

    canvas.addEventListener('mousemove', (e) => {
        if (clicked) {
            const width = e.clientX - startX;
            const height = e.clientY - startY;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            console.log("stroking");
            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = "#ffffff";
            ctx.strokeRect(startX, startY, width, height);
        }
    });
}
    

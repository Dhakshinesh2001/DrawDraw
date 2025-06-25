import CanvasData from "@/components/CanvasData";
//@ts-ignore
export default async function DrawPage({params}: any) {

    const roomId =(await params).id as string;
    console.log("roomId:");
    console.log(roomId);
    console.log(typeof roomId);


    return <CanvasData roomId={roomId} />
}
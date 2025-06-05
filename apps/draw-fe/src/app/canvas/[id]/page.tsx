import CanvasData from "@/components/CanvasData";

export default async function DrawPage({params}: {params:{id: string}}) {

    const roomId =(await params).id as string;
    console.log("roomId:");
    console.log(roomId);
    console.log(typeof roomId);


    return <CanvasData roomId={roomId} />
}
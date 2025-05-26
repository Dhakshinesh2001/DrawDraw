import axios from "axios";
import { BACKEND_URL } from "../../config";
import { ChatRoom } from "../../../components/ChatRoom";

async function getRoomId(slug:string) {
  const response = await axios.get(`${BACKEND_URL}/room/${slug}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc0ODExMDcwOH0.CkFIwTwupyDqlqtiXdvq8fL8LIOO8x7cjoXcnzmGGyU`);
//   console.log(response.data);
// //   console.log(`${BACKEND_URL}/room/${slug}`);
// console.log(response.data.room.id);
  return response.data.room.id;
}

export default async function Roomchat({params}:{params:{slug:string}}) {
   const p = await params;
   const slug = p.slug;
   // console.log(slug);
   // console.log(`${BACKEND_URL}/room/${slug}`);
   const roomId = await getRoomId(slug);
   // if(!roomId || typeof roomId !== "string"){
   //     return <div>Room not found</div>
   // }

   return <ChatRoom id={roomId} />
   // return <div>Roomchat</div>
}
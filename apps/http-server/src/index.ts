import express from 'express';
import jwt from 'jsonwebtoken';
import { JWTSECRET } from '@repo/backend-common/config';
import { authMiddleware } from './middleware';
import { CreateUserSchema, SignInSchema, CreateRoomSchema } from '@repo/common/types';
import { prisma } from '@repo/db/client';
import { Request,Response} from 'express';


interface authRequest extends Request {
    userId?: string;
    slug?: string;
   
}

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/api/v1/sign-in',async (req, res) => {

    const data = SignInSchema.safeParse(req.body);
    if(!data.success){
        res.status(400).json({ message: "wrong inputs" });
        return;
    }
    //TODO: check user and password
    const username = req.body.username? req.body.username : req.body.email;
    const password = req.body.password;
    const email = req.body.email;
    // const userId = "1234";

    try{
        const dbuser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: email },
                    { name: username }
                ]
            }
        });
        if(!dbuser || dbuser.password !== password){
            res.status(400).json({ message: "Invalid Credentials" });
            return;
        }
       
        const token = jwt.sign({ userId: dbuser.id }, JWTSECRET);
        res.status(200).json({ message: "Successfully Signed In", token });
    }catch(e){
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
    
    
});

app.post('/api/v1/sign-up', async (req, res) => {
    const parsedData = CreateUserSchema.safeParse(req.body);
    if(!parsedData.success){
        res.status(400).json({ message: parsedData.error.message });
        // console.log(parsedData.error);
        return;
    }
    
    try{
        // console.log(parsedData.data.email);
        // console.log(parsedData.data.username);
        // console.log(parsedData.data.password);
        const user = await prisma.user.create({
            data: {
                email: parsedData.data.email,
                name: parsedData.data.username,
                password: parsedData.data.password,
                photo: "asdf"
             }
        });

        res.json({ message: 'created user', user });
    }catch(e){
        res.status(500).json({ message: "user creation failed" });
        return;
    }finally{
        return;
    }
    
    
});

app.post('/api/v1/create-room',authMiddleware, async (req: authRequest, res) => {
    
    // if(!req.userId){
    const parseddata = CreateRoomSchema.safeParse(req.body);
    if(!parseddata.success){
        res.json({ message: parseddata.error.message });
        return;
    }
    if(typeof req.userId === 'undefined'){
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    try{
        const room = await prisma.room.create({
            data: {
                slug: parseddata.data.name,
                
                adminId: parseInt(req.userId),
            }
            
        });

        res.status(200).json({ message: 'room created', room });
    }catch(e){
        res.status(500).json({ message: "room creation failed" });
        return;
    }
    //TODO: save room to database
    
});

app.get('/api/v1/chats/:roomId', authMiddleware, async (req, res) => {  

    const roomId = Number(req.params.roomId);
    try{
        const chats = await prisma.chat.findMany({
            where: {
                roomId: roomId
            },
            orderBy: {
                id: 'desc'
            },
            take: 30
        });
        // console.log(JSON.stringify(chats));
        // console.log("reached line 138");
        res.status(200).json({ message: 'room found', chats });
    }catch(e){
        // console.log("reached line 141");
        res.status(500).json({ message: "chat not found" });
        return;
    }

});
//@ts-ignore
app.get('/api/v1/room/:slug', async (req: any, res: any) => {
    const slug = req.params.slug;
    try{
    const room = await prisma.room.findFirst({
        where: {
            slug: slug
        }
    });
    if(!room){
        res.status(404).json({ message: "Room not found" });
        return;
    }
    else{
        res.status(200).json({ message: "Room found", room,id:room.id });
        return room;
    }

}catch(e){
    res.status(500).json({ message: "Room not found" });
    return;
}
});

app.listen(3001, () => {
    console.log('HTTP Server is running on port 3001');
});
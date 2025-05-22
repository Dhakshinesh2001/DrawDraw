import {z} from 'zod';

export const CreateUserSchema = z.object({
    username: z.string().min(3).max(30),
    email: z.string().email(),
    password: z.string().min(6),
});

export const SignInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const CreateRoomSchema = z.object({
    name: z.string().min(3).max(30).optional(),
    slug: z.string().min(5).max(20),
    userId: z.string().min(3).max(30)

});
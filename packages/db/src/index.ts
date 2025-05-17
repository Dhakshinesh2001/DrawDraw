import { PrismaClient } from './generated/prisma/edge'

export const prismaClient = new PrismaClient()
// use `prisma` in your application to read and write data in your DB
import { PrismaClient } from './generated/prisma/index.js'

export const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB
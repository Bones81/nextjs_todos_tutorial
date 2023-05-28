// This code prevents NextJS from constantly spinning up new Prisma Clients. It stores a client instance in the global object, and it only creates a new instance if one does not already exist.

import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma = 
    globalForPrisma.prisma ?? 
    new PrismaClient({
        log: ["query"]
    })

// Then, it assigns the prisma client to the global object when not in production mode
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
import { PrismaClient } from '@prisma/client';

// Declare a global prisma client to avoid creating multiple instances in development
declare global {
  var prisma: PrismaClient | undefined; // Use 'var' to make it globally available during development
}

// Create the PrismaClient only once to avoid unnecessary new instances in development
export const prisma = globalThis.prisma || new PrismaClient();

// Set it on the global object for development mode
if (process.env.NODE_ENV === 'development') {
  globalThis.prisma = prisma;
}

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testConnection() {
  try {
    await prisma.$connect()
    console.log(' La Db est connectée ')
    await prisma.$disconnect()
  } catch (error) {
    console.error('La DB nest pas connectée', error)
    process.exit(1)
  }
}

testConnection()

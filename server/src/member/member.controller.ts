import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = Router()

router.get('/list', async (req, res) => {
    const members = await prisma.member.findMany()
    res.send(members)
})

export default router

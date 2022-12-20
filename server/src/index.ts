import express from 'express'
import { PrismaClient } from '@prisma/client'
import routes from './app/app.routes';

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.use('/api', routes)

app.get('/', async (req, res) => {
  const newUser = await  prisma.member.create({data: {firstname: 'gerrymie', lastname: 'lumawag'}})
    res.send(newUser)
})


app.listen(3001, () => console.log('server listening on port 3001'))

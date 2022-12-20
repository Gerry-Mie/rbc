import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { Controller, Get, Post } from '../app/decorators';
import { Service } from 'typedi';


@Controller('/member')
@Service()
// @ClassI
class MemberController {

    constructor(
        private prisma = new PrismaClient()
    ) {}

    @Get('list')
    async hellos(req: Request, res: Response) {
        const members = await this.prisma.member.findMany()

        res.send(members)
    }

    @Post('/create')
    async create(req: Request, res: Response) {
        const user = await this.prisma.member.create({data: req.body})
        res.send(user)
    }
}

export default MemberController

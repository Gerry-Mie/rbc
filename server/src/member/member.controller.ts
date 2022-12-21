import { Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { Body, Controller, Delete, Get, Params, Post, Res } from '../app/decorators';
import CreateUsrDto from './dto/create-usr.dto';

@Controller('/member')
class MemberController {

    constructor(
        private prisma = new PrismaClient()
    ) {
    }

    @Get('list')
    async list(@Res() res: Response) {
        const members = await this.prisma.member.findMany()
        res.send(members)
    }

    @Post('/create')
    async create(@Body() body: CreateUsrDto, res: Response) {
        try{
            const user = await this.prisma.member.create({data: body})
            res.send(user)
        }catch (error){
            res.send({error})
        }

    }

    @Delete('/delete/:id')
    async delete(@Params('id') id: string, res: Response){
        try {
            const member = await this.prisma.member.delete({
                where:{
                    id: +id
                }
            })
            res.send(member)
        }catch (error: any){

            const respose = {
                code: error.code,
                message: error?.meta?.cause
            }

         res.status(404).send({error: respose})
        }
    }
}

export default MemberController

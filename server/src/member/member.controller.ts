import { PrismaClient } from '@prisma/client'
import CreateUsrDto from './dto/create-usr.dto';
import { Body, Controller, Delete, Get, Params, Post } from '../app/decorators';

@Controller('/member')
class MemberController {

    constructor(
        private prisma = new PrismaClient()
    ) {
    }

    @Get('/list')
    async list() {
        return this.prisma.member.findMany()
    }

    @Post('/create')
    async create(@Body() body: CreateUsrDto) {
        return this.prisma.member.create({data: body})
    }

    @Delete('/delete/:id')
    async delete(@Params('id') id: string) {
        return await this.prisma.member.delete({where: {id: +id}})
    }
}

export default MemberController

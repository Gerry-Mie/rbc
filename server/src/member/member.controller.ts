import { PrismaClient } from '@prisma/client'
import CreateUsrDto from './dto/create-usr.dto';
import { Body, Controller, Delete, Get, Params, Post, Put } from '../app/decorators';
import UpdateUserDto from './dto/update-user.dto';

@Controller('/member')
class MemberController {

    constructor(
        private prisma = new PrismaClient()
    ) {
    }

    @Get('list')
    list() {
        return this.prisma.member.findMany()
    }

    @Get('count')
    count() {
        return this.prisma.member.count()
    }

    @Post('create')
    create(@Body() body: CreateUsrDto) {
        return this.prisma.member.create({data: body})
    }

    @Put('update/:id')
    edit(@Params('id') id: string, @Body() body: UpdateUserDto) {
        return this.prisma.member.update({
            where: {member_id: +id},
            data: body
        })
    }

    @Delete('delete/:id')
    delete(@Params('id') id: string) {
        return this.prisma.member.delete({where: {member_id: +id}})
    }
}

export default MemberController

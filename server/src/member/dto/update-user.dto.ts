import { IsOptional, Length, Matches, IsEmail, IsIn } from 'class-validator'
import {Expose} from 'class-transformer'
import { Dto } from '../../app/decorators/dto/class.decorator';

@Dto()
class UpdateUserDto {
    @Expose()
    @IsOptional()
    @Length(2, 30)
    firstname?: string

    @Expose()
    @IsOptional()
    @Length(2, 30)
    lastname?: string

    @Expose()
    @IsOptional()
    @Matches(/09\d{9}/, {message: 'Invalid Phone Number'})
    phoneNumber?: string

    @Expose()
    @IsOptional()
    @IsEmail()
    email?: string

    @Expose()
    @IsOptional()
    @IsIn(['male', 'female'])
    gender?: string

}

export default UpdateUserDto

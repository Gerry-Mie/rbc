import {Length } from 'class-validator'
import {Expose} from 'class-transformer'
import { Dto } from '../../app/decorators/dto/class.decorator';

@Dto()
class CreateUsrDto {
    @Expose()
    @Length(2, 30)
    firstname: string

    @Expose()
    @Length(2, 30)
    lastname: string
}

export default CreateUsrDto

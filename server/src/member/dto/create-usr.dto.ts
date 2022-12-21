import {Length } from 'class-validator'
import {Expose} from 'class-transformer'

class CreateUsrDto {
    @Expose()
    @Length(2, 30)
    firstname: string

    @Expose()
    @Length(2, 30)
    lastname: string
}

export default CreateUsrDto

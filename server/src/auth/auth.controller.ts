import { Controller, Post } from '../app/decorators';

@Controller('/auth')
class AuthController {
    @Post('/login')
    login(){
        return 'okokokok'
    }
}

export default AuthController

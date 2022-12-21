import { Controller, Post } from '../app/decorators';
import { Request, Response } from 'express';

@Controller('/auth')
class AuthController {
    @Post('/login')
    login(req: Request, res: Response){
        res.send('login route')
    }
}

export default AuthController

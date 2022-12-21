
import  MemberController  from '../member/member.controller'
import initRoutes from './services/init-routes';
import AuthController from '../auth/auth.controller';


// router.use('/m',m)
export default initRoutes([
    MemberController,
    AuthController
])

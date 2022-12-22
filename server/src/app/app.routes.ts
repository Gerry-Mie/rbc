
import  MemberController  from '../member/member.controller'
import initRoutes from './services/init-routes';
import AuthController from '../auth/auth.controller';

const appRoutes = initRoutes([
    MemberController,
    AuthController
])

export default appRoutes

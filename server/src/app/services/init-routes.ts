import { Router } from 'express';
import { Routes } from '../decorators';

const initRoutes = (Controllers: any[]) => {
    const router = Router()

    Controllers.forEach(Controller => {
        if (Controller.prototype.routes || Controller.prototype.path) {
            const instance = new Controller()
            const rtr = Router()
            const routes: Routes = Controller.prototype.routes || {}
            if (typeof routes === 'object') {
                for (let i in routes) {
                    const route = routes[i]
                    rtr[route.method](route.path, (req, res)=> instance[i](req,res))
                }
            }
            router.use(Controller.prototype.path, rtr)

        }
    })
    return router
}

export default initRoutes

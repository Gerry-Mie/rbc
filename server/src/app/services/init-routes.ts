import { Request, Response, Router } from 'express';
import { ParamType, Routes } from '../decorators';
import { ClassConstructor } from 'class-transformer';
import 'reflect-metadata';

const initRoutes = (Controllers: ClassConstructor<any>[]) => {

    const router = Router()

    // loop the provided controllers and register the routes to Router 'router'
    Controllers.forEach(Controller => {
        // skip this Controller if the required prototype is not provided
        if (!Controller.prototype.routes || !Controller.prototype.path) return;
        // create instance of each controller
        const instance = new Controller()

        const rtr = Router()
        //get all request that registered by decorator [Get, Post, Put, Delete]
        const routes: Routes = Controller.prototype.routes

        if (typeof routes === 'object') {

            // loop each request to register it to Router 'rtr'
            for (let i in routes) {
                const route = routes[i]
                // check if this request has parameter decorator
                if (route.params) {
                    const sortedParam = route.params.sort((a, b) =>
                        a.index > b.index ? 0 : -1)

                    // register the request to Router 'rtr'  with custom arguments
                    rtr[route.method](route.path, route.validation, (req: Request, res: Response) => {

                        const params = sortedParam.map(param => {
                            return getParams(req, res, param.type, param.property)
                        })

                        //  call the original method of request and pass the custom parameter to decorator
                        instance[i](...params, res, req)
                    })

                } else {
                    // register the request to Router 'rtr with original the original argument's req, res, next
                    rtr[route.method](route.path, route.validation, instance[i].bind(instance))
                }
            }
        }

        // register to Router 'router' each controller's route
        router.use(Controller.prototype.path, rtr)
    })
    return router
}


const getParams = (req: Request, res: Response, paramType: ParamType, key: string | undefined = undefined) => {
    const paramTypes: { [key in ParamType]: any } = {
        param: req.params,
        req: req,
        body: req.body,
        res: res,
        query: req.query
    }
    const data = paramTypes[paramType]
    if (key) return data[key]
    return data
}

export default initRoutes



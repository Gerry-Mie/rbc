import { Request, RequestHandler, Response, Router } from 'express';
import { ClassConstructor } from 'class-transformer';
import 'reflect-metadata';
import {
    DecoratorMethod,
    DecoratorMethods,
    DecoratorParameter,
    DecoratorParameterType
} from '../types/decorators.types';

const initRoutes = (Controllers: ClassConstructor<any>[]) => {

    const router = Router()

    // loop the provided controllers and register the routes to Router 'router'
    Controllers.forEach(Controller => {

        //get all methods that added by decorator [Get, Post, Put, Delete]
        const methods: DecoratorMethods = Reflect.getMetadata('methods', Controller)
        // get the path that added by Controller decorator
        const controllerPath: string = Reflect.getMetadata('path', Controller)

        // skip this Controller if the required metadata is not provided
        if (!methods || !controllerPath || typeof methods !== 'object') return;
        // create instance of each controller
        const instance = new Controller()

        const rtr = Router()

        // loop each method to register it to Router 'rtr'
        for (let i in methods) {

            const route: DecoratorMethod = methods[i]

            // callback for Route 'rtr
            const callback: RequestHandler = async (req, res, next) => {
                const parameters = []
                if (route.params) {
                    const sortedParam = route.params.sort((a, b) =>
                        a.index > b.index ? 0 : -1)
                    sortedParam.forEach(param => {
                        parameters.push(getParams(req, res, next, param))
                    })
                }
                parameters.push(...[req, res])

                try {
                    const data = await instance[i](...parameters)
                    if (typeof data === 'function') data();
                    else res.send({data});
                } catch (error) {
                    next(error)
                }
            }

            // register the request to Router 'rtr
            rtr[route.method](route.path, route.validation, callback)

        }
        // register to Router 'router' each controller's route
        router.use(controllerPath, rtr)
    })
    return router
}


const getParams = (
    req: Request,
    res: Response,
    next: Function,
    param: DecoratorParameter
) => {

    const params: { [key in DecoratorParameterType]: any } = {
        param: req.params,
        req: req,
        body: req.body,
        res: res,
        query: req.query,
        next: (arg: any) => () => next(arg)
    }
    const data = params[param.type]
    if (param.property) return data[param.property]
    return data
}

export default initRoutes



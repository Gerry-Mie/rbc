import { Request, RequestHandler, Response, Router } from 'express';
import { ClassConstructor } from 'class-transformer';
import 'reflect-metadata';
import {
    DecoratorMethod,
    DecoratorMethods,
    DecoratorParameterType
} from '../types/decorators.types';
import { CONTROLLER_METADATA_KEY_PATH, CONTROLLER_METADATA_KEY_ROUTES } from '../constants/decorator-metadata-key';

const initRoutes = (Controllers: ClassConstructor<any>[]) => {

    const router = Router()

    // loop the provided controllers and register the routes to Router 'router'
    Controllers.forEach(Controller => {

        //get all methods that added by decorator [Get, Post, Put, Delete]
        const methods: DecoratorMethods = Reflect.getMetadata(CONTROLLER_METADATA_KEY_ROUTES, Controller)
        // get the path that added by Controller decorator
        const controllerPath: string = Reflect.getMetadata(CONTROLLER_METADATA_KEY_PATH, Controller)

        // skip this Controller if the required metadata is not provided
        if (!methods || !controllerPath || typeof methods !== 'object')
            return console.error('Invalid Controller: ' + Controller.name);

        // create instance of each controller
        const instance = new Controller()

        const rtr = Router()

        // loop each method to register it to Router 'rtr'
        for (let i in methods) {

            const route: DecoratorMethod = methods[i]

            // callback for Route 'rtr
            const callback: RequestHandler = async (req, res, next) => {

                const parameters = route.params? getParams(req, res, route): []

                parameters.push(...[req, res])

                // catch the errors and pass it to error middleware
                try {
                    const data = await instance[i](...parameters)
                    // we called the res.send here, that's why we don't need to call it in the controller
                     res.send({data});
                } catch (error) {
                    next(error)
                }
            }

            const middlewares = []
            if (route.middleware) middlewares.push(...route.middleware);
            if (route.validation) middlewares.push(route.validation);
            // register the request to Router 'rtr'
            rtr[route.method](route.path, middlewares, callback)
        }
        // register to Router 'router' each controller's route
        router.use(controllerPath, rtr)
    })
    return router
}


const getParams = (req: Request, res: Response, route: DecoratorMethod): unknown[] => {

    const sortedParam = route.params.sort((a, b) =>
        a.index > b.index ? 0 : -1)

    const params: { [key in DecoratorParameterType]: any } = {
        param: req.params,
        req: req,
        body: req.body,
        res: res,
        query: req.query,
        // next: (arg: any) => () => next(arg)
    }

    return sortedParam.map(param => {
        const data = params[param.type]
        if (param.property) return data[param.property]
        return data
    })
}

export default initRoutes



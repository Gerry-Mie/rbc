import { Application, RequestHandler } from 'express';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import 'reflect-metadata';

type MethodName = 'get' | 'post' | 'put' | 'delete'

export type ParamType = 'body' | 'req' | 'res' | 'param' | 'query'

type Parameter = {
    type: ParamType,
    index: number,
    property?: string
}

type Route = {
    method: MethodName
    value: Application
    path: string
    params: Parameter[]
    validation: RequestHandler[]
    middleware?: RequestHandler[]

}

export type Routes = {
    [key: string]: Route
}
const method = (methodName: MethodName) => (path: string) =>
    function (target: any, propertyKey: string, _: PropertyDescriptor) {

        const routes: Routes = target.constructor.prototype.routes || {}

        if (!path.startsWith('/')) {
            path = '/' + path
        }

        routes[propertyKey] = {
            ...routes[propertyKey],
            method: methodName,
            path,
            validation: routes[propertyKey]?.validation?.length ? routes[propertyKey].validation : []
        }
        target.constructor.prototype.routes = routes
    }

export const Get = method('get')
export const Post = method('post')
export const Delete = method('delete')

export const Controller = (path: string) => (constructor: any) => {
    if (!path.startsWith('/')) {
        path = '/' + path
    }
    constructor.prototype.path = path
}

export const Validate = (Obj: ClassConstructor<any>) =>
    function (target: any, propertyKey: string, _: PropertyDescriptor) {
        const routes: Routes = target.constructor.prototype.routes || {}

        // validation middleware
        const validation: RequestHandler = async (req, res, next) => {

            const obj = plainToInstance(Obj, req.body, {excludeExtraneousValues: true})

            // validate using class-validator
            try {
                const error = await validate(obj, {
                    validationError: {
                        target: false,
                        value: false
                    }
                })

                if (error.length) {
                    const constraints = error[0].constraints || {}
                    const key = Object.keys(constraints)[0]
                    return res.send({error: constraints[key]})
                }

            } catch (error) {
                return res.send({error: 'validation error!'})
            }

            // check if there is unwanted property
            for (let i in req.body) {
                if (!obj.hasOwnProperty(i)) {
                    return res.send({error: `the property "${i}" is not allowed`})
                }
            }

            req.body = obj
            next()
        }

        routes[propertyKey] = {
            ...routes[propertyKey],
            validation: [validation]
        }
        target.constructor.prototype.routes = routes
    }


const parameter = (paramType: ParamType) =>
    (p: string | undefined = undefined) => function Body(target: object, key: string, index: number) {
        const routes: Routes = target.constructor.prototype.routes || {}
        const varType = Reflect.getMetadata('design:paramtypes', target, key)[index];

        if (!p && paramType === 'body' && typeof varType === 'function') {
            Validate(varType)(target, key, {})
        }
        const params = routes[key]?.params || []
        routes[key] = {
            ...routes[key],
            params: [...params, {
                type: paramType,
                index,
                property: p
            }]
        }

        target.constructor.prototype.routes = routes

    }


export const Body = parameter('body')
export const Res = parameter('res')

export const Params = parameter('param')

export const Query = parameter('query')

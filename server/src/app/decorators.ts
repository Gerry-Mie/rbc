import {Application } from 'express';

type MethodName = 'get' | 'post' | 'put'

type Route = {
    method: MethodName
    value: Application
    path: string
    validation?: Function[]
    middleware?: Function[]

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
            path
        }
        target.constructor.prototype.routes = routes
    }

export const Get = method('get')
export const Post = method('post')

export const Controller = (path: string) => (constructor: any) => {
    constructor.prototype.path = path
}


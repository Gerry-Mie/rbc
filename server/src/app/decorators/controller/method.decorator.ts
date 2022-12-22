import 'reflect-metadata';
import { DecoratorMethod, DecoratorMethods, MethodType } from '../../types/decorators.types';

const method = (methodType: MethodType) => (path: string = '/') =>
    function (target: any, propertyKey: string, _: PropertyDescriptor) {

        const metadataKey = 'methods'

        const methods: DecoratorMethods = Reflect.getMetadata(metadataKey, target.constructor) || {}

        if (!path.startsWith('/')) {
            path = '/' + path
        }

        let method: DecoratorMethod = methods[propertyKey] || {}
        const validation = method.validation || []

        method = {
            ...method,
            validation,
            method: methodType,
            path
        }
        methods[propertyKey] = method


        Reflect.defineMetadata(metadataKey, methods, target.constructor)
    }

export const Get = method('get')
export const Post = method('post')
export const Delete = method('delete')

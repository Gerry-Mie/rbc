import 'reflect-metadata';
import { DecoratorMethod, DecoratorMethods, MethodType } from '../../types/decorators.types';
import { CONTROLLER_METADATA_KEY_ROUTES } from '../../constants/decorator-metadata-key';

const method = (methodType: MethodType) => (path: string = '/') =>
    function (target: any, propertyKey: string, _: PropertyDescriptor) {

        const metadataKey = CONTROLLER_METADATA_KEY_ROUTES

        const methods: DecoratorMethods = Reflect.getMetadata(metadataKey, target.constructor) || {}

        if (!path.startsWith('/')) {
            path = '/' + path
        }

        let method: DecoratorMethod = methods[propertyKey] || {}

        method = {
            ...method,
            method: methodType,
            path
        }
        methods[propertyKey] = method


        Reflect.defineMetadata(metadataKey, methods, target.constructor)
    }

export const Get = method('get')
export const Post = method('post')
export const Put = method('put')
export const Delete = method('delete')

import { DecoratorMethod, DecoratorMethods } from '../../types/decorators.types';
import { RequestHandler } from 'express';
import 'reflect-metadata';
import { CONTROLLER_METADATA_KEY_ROUTES } from '../../constants/decorator-metadata-key';

const Middleware = (m: RequestHandler[] | RequestHandler) => function (target: any, propertyKey: string, _: PropertyDescriptor) {

    const metadataKey = CONTROLLER_METADATA_KEY_ROUTES

    const methods: DecoratorMethods = Reflect.getMetadata(metadataKey, target.constructor) || {}

    let method: DecoratorMethod = methods[propertyKey] || {}

    if (typeof m === 'function') m = [m];

    method = {
        ...method,
        middleware: m

    }
    methods[propertyKey] = method


    Reflect.defineMetadata(metadataKey, methods, target.constructor)
}

export default Middleware

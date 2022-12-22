import { ClassConstructor } from 'class-transformer';
import { DecoratorMethod, DecoratorMethods } from '../../types/decorators.types';
import 'reflect-metadata';
import validationMiddleware from '../../middleware/validation.middleware';
import { CONTROLLER_METADATA_KEY_ROUTES } from '../../constants/decorator-metadata-key';

export const Validate = (Obj: ClassConstructor<any>, p: string | undefined = undefined) =>
    function (target: any, propertyKey: string, _: PropertyDescriptor) {

        const metadataKey = CONTROLLER_METADATA_KEY_ROUTES

        const methods: DecoratorMethods = Reflect.getMetadata(metadataKey, target.constructor) || {}

        let method: DecoratorMethod = methods[propertyKey] || {}

        method = {
            ...method,
            validation: validationMiddleware(Obj, p)
        }

        methods[propertyKey] = method

        Reflect.defineMetadata(metadataKey, methods, target.constructor)
    }

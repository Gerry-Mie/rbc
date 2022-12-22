import { DecoratorParameterType, DecoratorMethods, DecoratorMethod } from '../../types/decorators.types';
import { Validate } from './validation.decorator';
import 'reflect-metadata';

const parameter = (paramType: DecoratorParameterType) =>
    (p: string | undefined = undefined) => function (target: object, propertyKey: string, index: number) {

        const metadataKey = 'methods'

        const methods: DecoratorMethods = Reflect.getMetadata(metadataKey, target.constructor) || {}

        const varType = Reflect.getMetadata('design:paramtypes', target, propertyKey)[index];

        if (paramType === 'body' && typeof varType === 'function' && Reflect.hasMetadata('dto', varType)) {
            Validate(varType, p)(target, propertyKey, {})
        }

        let method: DecoratorMethod = methods[propertyKey] || {}

        const params = method.params || []
        method = {
            ...method,
            params: [...params, {
                type: paramType,
                index,
                property: p
            }]
        }

        methods[propertyKey] = method

        Reflect.defineMetadata(metadataKey, methods, target.constructor)

    }


export const Body = parameter('body')
export const Res = parameter('res')

export const Params = parameter('param')

export const Query = parameter('query')

/**
 * required return to return the next function
 * ex.  return next(error)
 */
export const Next = parameter('next')()

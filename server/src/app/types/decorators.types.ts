import {RequestHandler } from 'express';

export type MethodType = 'get' | 'post' | 'put' | 'delete'

export type DecoratorParameterType = 'body' | 'req' | 'res' | 'param' | 'query'| 'next'

export type DecoratorParameter = {
    type: DecoratorParameterType,
    index: number,
    property?: string
}

export type DecoratorMethod = {
    method: MethodType
    path: string
    params: DecoratorParameter[]
    validation: RequestHandler[]
    middleware?: RequestHandler[]

}

export type DecoratorMethods ={
    [key: string]: DecoratorMethod
}

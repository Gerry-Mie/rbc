import { ErrorRequestHandler } from 'express';
import { HttpError } from '../exceptions/http-error';
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime';
import ResponseError from '../types/response-error'

const errorHandlerMiddleware: ErrorRequestHandler = (error, req, res, _next) => {

    const resError: ResponseError = {
        status: 500,
        code: '500',
        message: 'Server error'
    }

    if (error instanceof HttpError) {
        resError.status = error.status
        resError.code = error.code
        resError.message = error.message
    }
    if (error instanceof PrismaClientKnownRequestError) {
        resError.status = 400
        resError.code = error.code
        resError.message = error.message
    }

    if (error instanceof PrismaClientValidationError) {
        resError.code = 'prisma-validation-error'
    }
    console.log(error)

    res.status(resError.status).send({
        error: resError
    })
}

export default errorHandlerMiddleware

import { ErrorRequestHandler } from 'express';
import { HttpError } from '../exceptions/http-error';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
const errorHandlerMiddleware: ErrorRequestHandler = (error, req, res, _) => {

    if (error instanceof HttpError) {
        return res.status(error.status).send({
            error: {
                message: error.message,
                code: error.code,
                status: error.status
            }
        })
    }
    if (error instanceof PrismaClientKnownRequestError) {
        return res.status(400).send({
            error: {
                message: error.message,
                code: error.code,
                status: 400
            }
        })
    }


    res.status(500).send({
        error: {
            status: 500,
            code: '500',
            message: 'Server error'
        }
    })
}

export default errorHandlerMiddleware

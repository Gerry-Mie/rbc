import { RequestHandler } from 'express';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { BadRequestError } from '../exceptions/http-error';

type Method = (Obj: ClassConstructor<any>, property: string|undefined)=>RequestHandler

const validationMiddleware: Method = (Obj, property)=> async (req, res, next) => {

    let plainObjet = req.body

    if (property){
        plainObjet = plainObjet[property]
    }

        const obj = plainToInstance(Obj, plainObjet, {excludeExtraneousValues: true})

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

                next(new BadRequestError(constraints[key], 'data-validation-error'))
            }

        } catch (error) {

        }

        // check if there is unwanted property
        for (let i in req.body) {
            if (!obj.hasOwnProperty(i)) {
                return next(new BadRequestError(
                    `the property "${i}" is not allowed`,
                    'data-validation-error'
                ))
            }
        }

        next()
    }


export default validationMiddleware

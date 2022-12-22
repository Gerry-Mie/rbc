import { RequestHandler } from 'express';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

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
                return res.send({error: constraints[key]})
            }

        } catch (error) {
            return res.send({error: 'validation error!'})
        }

        // check if there is unwanted property
        for (let i in req.body) {
            if (!obj.hasOwnProperty(i)) {
                return res.send({error: `the property "${i}" is not allowed`})
            }
        }

        next()
    }


export default validationMiddleware

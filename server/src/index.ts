import express, { RequestHandler } from 'express'
import routes from './app/app.routes';
import errorHandlerMiddleware from './app/middleware/error-handler.middleware';

const app = express()

app.use(express.json())

app.use('/api', routes)

// experimental ********************************************************************************************************

app.get('/sample', (req, res) => {
    const fun = () => true
    let startTime = performance.now();
    fun()
    let endTime = performance.now();
    let elapsedTime = endTime - startTime;

    console.log(`Time elapsed: ${elapsedTime} milliseconds`);
    // throw new NotFoundError('Something went wrong', 'm-invalid-data')
    res.send('test')
})


const catchError = (callback: RequestHandler): RequestHandler => (req, res, next) => {
    try {
        callback(req, res, next)
    } catch (err) {
        next(err)
    }
}


app.get('/sample2', catchError((_req, _res: any) => {
    const send = _res.send
    _res.send = function (data: any) {
        return () => send.bind(this)(data)
    }
    const x = _res.send('new res dot send')
    x()
    // throw new NotFoundError('Something went wrong', 'm-invalid-data')
}))

// experimental ********************************************************************************************************

app.use(errorHandlerMiddleware)

app.listen(3001, () => console.log('server listening on port 3001'))

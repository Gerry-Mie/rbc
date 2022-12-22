import express from 'express'
import routes from './app/app.routes';
import errorHandlerMiddleware from './app/middleware/error-handler.middleware';
import { NotFoundError } from './app/exceptions/http-error';

const app = express()

app.use(express.json())

app.use('/api', routes)

// experimental
app.get('/sample', (req, res) => {
    console.log(req.body)
    res.status(201)
    throw new NotFoundError('Something went wrong', 'm-invalid-data')
})

app.use(errorHandlerMiddleware)

app.listen(3001, () => console.log('server listening on port 3001'))

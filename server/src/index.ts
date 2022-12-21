import express, {Request, Response} from 'express'
import routes from './app/app.routes';

const app = express()

app.use(express.json())

app.use('/api', routes)

app.get('/test', [], [],(req:Request, res:Response)=>{
    console.log( req.query)
    res.send('ok')
})

app.listen(3001, () => console.log('server listening on port 3001'))

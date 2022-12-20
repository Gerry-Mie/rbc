import express from 'express'
import routes from './app/app.routes';

const app = express()

app.use(express.json())

app.use('/api', routes)

app.listen(3001, () => console.log('server listening on port 3001'))

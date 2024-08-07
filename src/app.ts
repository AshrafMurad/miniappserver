import express from 'express'
import { config } from 'dotenv'
import morgan from 'morgan'
import appRouter from './routes/index.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
config()

////
const app = express()
app.use(cors({origin: 'https://miniapp-sable.vercel.app', credentials: true, optionsSuccessStatus: 200}))
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser(process.env.COOKIE_SECRET))

app.get('/', (req, res) => {
  res.send('Welcome to the Express app!');
});
app.use('/api', appRouter) 




export default app
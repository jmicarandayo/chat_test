import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRouter from './routes/auth.js'
import userRouter from './routes/users.js'
import conversationRouter from './routes/conversations.js'
import messageRouter from './routes/messages.js'
import cookieParser from 'cookie-parser'


dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/conversations', conversationRouter)
app.use('/api/messages', messageRouter)


const connect = async() => {
    try {
        await mongoose.connect(process.env.DB);
        console.log('Connected to DB')
        app.listen(PORT, () => {
            console.log(`Server is listening to port http://localhost:${PORT}`)
        })
    } catch(err) {
        console.log(err)
    }
}

connect()
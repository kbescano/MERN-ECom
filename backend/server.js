import path from 'path'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoute from './routes/uploadRuote.js'
import connectDB from './config/db.js'
import {errorHandler, notFound} from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

app.use(cors())

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.get('/', (req, res) => {
  res.send('API is running....')

})

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoute)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))


app.use(notFound)
app.use(errorHandler)

const __dirname = path.resolve()

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${
    process.env.NODE_ENV
} mode on port ${PORT}`))

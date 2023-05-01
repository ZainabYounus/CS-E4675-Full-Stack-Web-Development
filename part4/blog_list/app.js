// const http = require('http')
const config = require('./utils/config')
const express = require('express')
const app = express()
// express-async-errors to eliminate try/catch. Because of the library, we do not need the next(exception) call anymore. If an exception occurs in an async route, the execution is automatically passed to the error handling middleware.
require('express-async-errors')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')


mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
	.then(() => {
		logger.info('connected to MongoDB')
	})
	.catch((error) => {
		logger.error('error connecting to MongoDB:', error.message)
	})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
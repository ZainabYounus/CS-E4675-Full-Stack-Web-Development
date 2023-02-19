require('dotenv').config() // To use the library, we create a .env file at the root of the project. The environment variables are defined inside of the file

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

module.exports = {
	MONGODB_URI,
	PORT
}
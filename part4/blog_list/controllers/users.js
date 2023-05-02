const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// POST
usersRouter.post('/', async (request, response) => {
	const { username, name, password } = request.body

	if (!username) return response.status(400).json({ error: 'Please provide a valid username' })
	if (!password) return response.status(400).json({ error: 'Please provide a valid password' })
	if (username.length < 3 ) return response.status(400).json({ error: 'expected `username` to be at least 3 characters long' })
	if (password.length < 3 ) return response.status(400).json({ error: 'expected `password` to be at least 3 characters long' })

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)

	const user = new User({
		username,
		name,
		passwordHash,
	})

	const savedUser = await user.save()

	response.status(201).json(savedUser)
})

// GET ALL
usersRouter.get('/', async (request, response) => {
	// The Mongoose join is done with the populate method
	// The parameter given to the populate method defines that the ids referencing note objects in the notes field of the user document will be replaced by the referenced note documents.
	const users = await User
		.find({}).populate('blogs', { url:1, title : 1, author: 1 })

	response.json(users)
})

module.exports = usersRouter
const personsRouter = require('express').Router()
const Person = require('../models/person')

// Root page
personsRouter.get('/', (request,response) => {
	Person.find({}).then(persons => {
		response.json(persons)
	})
	// response.send('<h1>Hello World </h1>')
})

// GET BY ID
personsRouter.get('/:id', (request,response,next) => {
	Person.findById(request.params.id).then(person => {
		if(person){
			response.json(person)
		}
		else{
			response.status(404).end()
		}})
		.catch(error => {
			next(error)})
})

// CREATE
personsRouter.post('/', (request, response, next) => {

	const newPerson = request.body

	const person = new Person({
		name: newPerson.name,
		number: newPerson.number
	})

	person.save().then(savedPerson => {
		response.json(savedPerson.toJSON())
	})
		.catch(error => {next(error)})

})

// DELETE
personsRouter.delete('/:id', (request,response, next) => {
	Person.findByIdAndRemove(request.params.id)
		.then(() => {
			response.status(204).end()
		})
		.catch(error => next(error))
})

// UPDATE
personsRouter.put('/:id', (request, response, next) => {
	const updatedPersonObj = request.body
	const person = {
		name: updatedPersonObj.name,
		number: updatedPersonObj.number,
	}

	Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' })
		.then(updatedPerson => {
			response.json(updatedPerson)
		})
		.catch(error => next(error))
})



module.exports = personsRouter
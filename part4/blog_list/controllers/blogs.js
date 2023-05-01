const blogsRouter = require('express').Router()
//const { response } = require('../app')
const Blog = require('../models/blog')

// GET ALL BLOGS
blogsRouter.get('/', async (request, response) => {
	const blogs =  await Blog.find({})
	response.json(blogs)
	//Blog
	// .find({})
	// .then(blogs => {
	// 	response.json(blogs)
	// })
})

// POST A BLOG
blogsRouter.post('/', async (request, response) => {
	const body = request.body

	if(!body.title || !request.url){
		response.status(400).json({ error: 'Bad Request' })
	}

	else{
		const blog = new Blog({
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes === undefined ? 0 : body.likes
		})
		const savedBlog =  await blog.save()
		response.status(201).json(savedBlog.toJSON())
	}

})


// blogsRouter.post('/', (request, response, next) => {
// 	const blog = new Blog(request.body)

// 	blog
// 		.save()
// 		.then(result => {
// 			response.status(201).json(result.toJSON())
// 		})
// 		.catch(error => {next(error)})
// })


// GET BLOG BY ID
blogsRouter.get('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id)
	if (blog) {
		response.json(blog)
	} else {
		response.status(404).end()
	}
})

//UPDATE A BLOG
blogsRouter.put('/:id', async (request, response) => {
	const body = request.body

	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes
	}

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
	response.status(204).json(updatedBlog.toJSON())
})

// DELETE A BLOG BY ID
blogsRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()
})


module.exports = blogsRouter
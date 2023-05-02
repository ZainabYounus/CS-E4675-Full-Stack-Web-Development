const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')


// GET ALL BLOGS
blogsRouter.get('/', async (request, response) => {
	const blogs =  await Blog.find({}).populate('user', { username:1, name:1 })
	response.json(blogs)
})

// POST A BLOG
blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
	const body = request.body
	const jwtUser =  request.user
	const user = await User.findById(jwtUser.id)

	if(!body.title || !body.url){
		response.status(400).json({ error: 'Bad Request' })
	}

	else{
		const blog = new Blog({
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes === undefined ? 0 : body.likes,
			user: user.id
		})
		const savedBlog =  await blog.save()
		user.blogs = user.blogs.concat(savedBlog._id)
		await user.save()
		response.status(201).json(savedBlog.toJSON())
	}

})

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
blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
	const jwtUser =  request.user

	const blog = await Blog.findById(request.params.id)
	if(jwtUser.id.toString() === blog.user.toString()){
		await Blog.findByIdAndRemove(request.params.id)
		response.status(204).end()
	}
	else{
		response.status(401).end()
	}
})


module.exports = blogsRouter
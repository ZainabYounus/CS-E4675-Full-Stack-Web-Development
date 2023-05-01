const Blog = require('../models/blog')

const initialBlogs = [
	{
		title: 'Blog#01',
		author: 'Blog#01 author',
		url: 'www.Blog#01Url.com',
		likes: 3
	},
	{
		title: 'Blog#02',
		author: 'Blog#02 author',
		url: 'www.Blog#02Url.com',
		likes: 3
	},
]

const nonExistingId = async () => {
	const blog = new Blog({ title: 'willremovethissoon', url: 'www.test.com' })
	await blog.save()
	await blog.deleteOne()

	return blog._id.toString()
}

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}

module.exports = {
	initialBlogs, nonExistingId, blogsInDb
}
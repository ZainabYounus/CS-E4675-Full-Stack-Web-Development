const Blog = require('../models/blog')
const User = require('../models/user')

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

const usersInDb = async () => {
	const users = await User.find({})
	return users.map(u => u.toJSON())
}

module.exports = {
	initialBlogs,
	nonExistingId,
	blogsInDb,
	usersInDb
}
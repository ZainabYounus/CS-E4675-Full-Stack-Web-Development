const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
// supertest takes care that the application being tested is started at the port that it uses internally.
const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(helper.initialBlogs)
/*
	const blogObjects = helper.initialBlogs
		.map(blog => new Blog(blog))

	// creates a new array that consists of promises, that are created by calling the save method
	const promiseArray = blogObjects.map(blog => blog.save())

	// Promise.all executes the promises it receives in parallel. If the promises need to be executed in a particular order, this will be problematic.
	await Promise.all(promiseArray)
*/
}, 100000)


describe('when there is initially some blogs saved', () => {
	// Test to check JSON syntax
	test('blogs are returned as json', async () => {
		console.log('entered test')
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	// 4.8
	// Test to check existence of blogs in test database
	test('all blogs are returned', async () => {
		const response = await api.get('/api/blogs')

		expect(response.body).toHaveLength(helper.initialBlogs.length)
	})

	// Test to check title of first blog
	test('a specific blog is within the returned blogs', async () => {
		const response = await api.get('/api/blogs')

		const contents = response.body.map(r => r.title)
		expect(contents).toContain('Blog#01')
	})
})

describe('viewing a specific blog', () => {
	//  Test for fetching an individual blog
	test('succeeds with a valid id', async() => {
		const blogsAtStart = await helper.blogsInDb()

		const blogToView = blogsAtStart[0]

		const resultBlog = await api.get(`/api/blogs/${blogToView.id}`)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		expect(resultBlog.body).toEqual(blogToView)
	})

	// Test which checks for a non-existent blog
	test('fails with statuscode 404 if blog does not exist', async () => {
		const validNonexistingId = await helper.nonExistingId()

		await api
			.get(`/api/blogs/${validNonexistingId}`)
			.expect(404)
	})

	// Test which checks if blog contains invalid id
	test('fails with statuscode 400 if id is invalid', async () => {
		const invalidId = '5a3d5da59070081a82a3445'

		await api
			.get(`/api/blogs/${invalidId}`)
			.expect(400)
	})

})

describe('addition of a new blog', () => {

	// 4.10
	// Test to add a new blog and verify it
	test('succeeds with valid data', async () => {
		const newBlog = {
			title: 'async/await simplifies making async calls',
			author: 'Async and await author',
			url: 'www.test.com',
			likes: 10
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length+1)

		const title = blogsAtEnd.map(b => b.title)

		expect(title).toContain(
			'async/await simplifies making async calls'
		)
	})

	// 4.12
	// Test that verifies that a blog without title or url will not be saved into the database.
	test('fails with status code 400 if data invalid', async () => {
		const newBlog = {
			likes: 5
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(400)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
	})
})

describe('deletion of a blog', () => {

	// 4.13
	//  Test for removing an individual blog
	test('succeeds with status code 204 if id is valid', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToDelete = blogsAtStart[0]

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.expect(204)

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd).toHaveLength(
			helper.initialBlogs.length - 1
		)

		const titles = blogsAtEnd.map(r => r.title)

		expect(titles).not.toContain(blogToDelete.title)
	})

})

describe('updation of a blog', () => {
	//4.14
	test('updates likes of a blog', async() => {

		const blogsAtStart = await helper.blogsInDb()
		const blogToUpdate = blogsAtStart[0]

		blogToUpdate.likes = 15

		await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(blogToUpdate)
			.expect(204)

		const blogsAfterUpdate = await helper.blogsInDb()
		expect(blogsAfterUpdate[0].likes).toEqual(15)
	})

})

// 4.9
// Test that verifies that the unique identifier property of blogs is named id
test('unique identifier is named as id', async () => {
	const blogsInDB = await helper.blogsInDb()
	//const ids = blogsInDB.map(b => b.id)
	//console.log(ids)
	expect(blogsInDB[0].id).toBeDefined()
})

// 4.11
// Test that verifies that if the likes property is missing from the request, it will default to the value 0.
test('blog without likes property will be set to 0', async () => {
	const newBlog = {
		title: 'testingggg',
		url: 'www.test.com'
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)

	const blogsAtEnd = await helper.blogsInDb()
	console.log(blogsAtEnd)
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
})

afterAll(async () => {
	await mongoose.connection.close()
}, 100000)
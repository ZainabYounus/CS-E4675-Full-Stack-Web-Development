const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
// supertest takes care that the application being tested is started at the port that it uses internally.
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

let token

beforeEach(async () => {

	//Delete old data
	await Blog.deleteMany({})
	await User.deleteMany({})

	// Create first user
	await api
		.post('/api/users/')
		.send(helper.initialUsers[0])
		.expect(201)

	// create a user object to use in login
	const user = {
		username: helper.initialUsers[0].username,
		password: helper.initialUsers[0].password,
	}

	// login and obtain fresh token
	await api
		.post('/api/login/')
		.send(user)
		.expect(200)
		.expect(response => {
			token = response.body.token
		})

	// create initial blogs
	await api
		.post('/api/blogs/')
		.set('Authorization', `Bearer ${token}`)
		.send(helper.initialBlogs[0])
		.expect(201)

	await api
		.post('/api/blogs/')
		.set('Authorization', `Bearer ${token}`)
		.send(helper.initialBlogs[1])
		.expect(201)

}, 100000)


describe('GET request tests', () => {
	// Test to check JSON syntax
	test('blogs are returned as json', async () => {
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

	// 4.9
	// Test that verifies that the unique identifier property of blogs is named id
	test('unique identifier is named as id', async () => {
		const blogsInDB = await helper.blogsInDb()
		expect(blogsInDB[0].id).toBeDefined()
	})

	// Test to check title of first blog
	test('a specific blog is within the returned blogs', async () => {
		const response = await api.get('/api/blogs')

		const contents = response.body.map(r => r.title)
		expect(contents).toContain('Blog#01')
	})
})

describe('POST request tests', () => {

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
			.set('Authorization', `Bearer ${token}` )
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

	// 4.11
	// Test that verifies that if the likes property is missing from the request, it will default to the value 0.
	test('blog without likes property will be set to 0', async () => {
		const newBlog = {
			title: 'testingggg',
			url: 'www.test.com'
		}

		await api
			.post('/api/blogs')
			.set('Authorization', `Bearer ${token}`)
			.send(newBlog)
			.expect(201)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
	})

	// 4.12
	// Test that verifies that a blog without title or url will not be saved into the database.
	test('fails with status code 400 if data invalid', async () => {
		const newBlog = {
			likes: 5
		}

		await api
			.post('/api/blogs')
			.set('Authorization', `Bearer ${token}` )
			.send(newBlog)
			.expect(400)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
	})

	// 4.23
	// Test to check that a new blog will not be added without token
	test('checks that 401 unauthorized is returned if a blog is created without token', async () => {
		const newBlog = {
			title: 'async/await simplifies making async calls',
			author: 'Async and await author',
			url: 'www.test.com',
			likes: 10
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(401)
			.expect('Content-Type', /application\/json/)
	})
})

describe('DELETE request tests', () => {

	// 4.13
	//  Test for removing an individual blog
	test('succeeds with status code 204 if id is valid', async () => {
		const blogsAtStart = await helper.blogsInDb()
		const blogToDelete = blogsAtStart[0]

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(204)

		const blogsAtEnd = await helper.blogsInDb()

		expect(blogsAtEnd).toHaveLength(
			helper.initialBlogs.length - 1
		)

		const titles = blogsAtEnd.map(r => r.title)

		expect(titles).not.toContain(blogToDelete.title)
	})

})

describe('PUT request tests', () => {
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


afterAll(async () => {
	await mongoose.connection.close()
}, 100000)

/*
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
*/
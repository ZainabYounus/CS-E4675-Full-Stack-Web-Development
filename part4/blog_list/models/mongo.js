const mongoose = require('mongoose')

if (process.argv.length < 3) {
	console.log('Please provide the password as an argument: node mongo.js <password>')
	process.exit(1)
}

else if(process.argv.length > 7){
	console.log('Too many arguments given!')
	process.exit(1)
}

else if(process.argv.length === 6){
	console.log('Please provide both title and author')
	process.exit(1)
}

const password = process.argv[2]
let title
let author
let url
let likes


const dbUrl = `mongodb+srv://zainab:${password}@cluster0.ce7cwrx.mongodb.net/testBlogListApp?retryWrites=true&w=majority`

const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

if(process.argv.length === 7){
	title = process.argv[3]
	author = process.argv[4]
	url = process.argv[5]
	likes = process.argv[6]

	mongoose
		.connect(dbUrl)
		.then(() => {
			console.log('connected')

			const blog = new Blog({
				title: title,
				author: author,
				url: url,
				likes: likes,
			})

			return blog.save()
		})
		.then(result => {
			console.log(`added ${result.title} title ${result.author} with author`)
			return mongoose.connection.close()
		})
		.catch((err) => console.log(err))

}

else if(process.argv.length === 3){
	mongoose
		.connect(dbUrl)
		.then(() => {
			console.log('connected')

			// The parameter of the method is an object expressing search conditions.
			// Since the parameter is an empty object{}, we get all of the notes stored in the notes collection.
			console.log('Blogs:')
			Blog.find({}).then(result => {
				result.forEach(blog => {
					console.log(`${blog.title} ${blog.author} ${blog.url} ${blog.likes}`)
				})
				mongoose.connection.close()
			})
		})
		.catch((err) => console.log(err))
}
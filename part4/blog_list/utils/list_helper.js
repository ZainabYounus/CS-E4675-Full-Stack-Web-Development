const lodash = require('lodash')

const dummy = (blogs) => {
	console.log(blogs)
	return 1
}

const totalLikes = (blogs) => {
	const reducer = (accumulator, currentItem) => {
		return accumulator + currentItem.likes
	}
	return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
	const blog = blogs.reduce((previousBlog, currentBlog) => {
		if(previousBlog === null) {
			return currentBlog
		}

		if(currentBlog.likes >= previousBlog.likes){
			return currentBlog
		}

		else {
			return previousBlog
		}

	}, null)

	return {
		title: blog.title,
		author: blog.author,
		likes: blog.likes,
	}

}

const mostBlogs = (blogs) => {
	const blogsCountByAuthor  = lodash.countBy(blogs, 'author')
	const blog = Object.keys(blogsCountByAuthor).reduce((previous, current) => blogsCountByAuthor[previous] > blogsCountByAuthor[current] ? previous : current)
	return blogs.length === 0 ? {} : { author: blog, blogs: blogsCountByAuthor[blog] }
}

const mostLikes = (blogs) => {
	const sortedByLikes = lodash.sortBy(blogs, 'likes')
	const blogWithMostLikes = sortedByLikes[sortedByLikes.length - 1]
	return blogWithMostLikes.length === 0 ? {} : { 'author' : blogWithMostLikes.author, 'likes': blogWithMostLikes.likes }
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}

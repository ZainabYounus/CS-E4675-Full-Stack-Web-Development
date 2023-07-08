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


// const mostLikes = (blogs) => {
// 	const sortedByLikes = lodash.sortBy(blogs, 'likes')
// 	const blogWithMostLikes = sortedByLikes[sortedByLikes.length - 1]
// 	return blogWithMostLikes.length === 0 ? {} : { 'author' : blogWithMostLikes.author, 'likes': blogWithMostLikes.likes }
// }

const mostLikes = (blogs) => {
	const authors = lodash.uniq(blogs.map(blog => blog.author))
  
	authorLikes = []
	lodash.forEach(authors, (author) => {
	  let sum = lodash.sumBy(blogs, (o) => { 
		return o.author === author ? o.likes : 0
	  })
	  authorLikes.push({ author: author, likes: sum })
	})
	const mostLikes = Math.max(...authorLikes.map(author => author.likes))
	const authorWithMostLikes = authorLikes.find(author => author.likes === mostLikes)
	
	return blogs.length === 0 ? {} : authorWithMostLikes
  
  }

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}

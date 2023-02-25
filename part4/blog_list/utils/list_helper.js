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

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog
}

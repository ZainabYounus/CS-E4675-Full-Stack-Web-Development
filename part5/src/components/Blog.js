// const Blog = ({blog}) => (
//   <div>
//     {blog.title} {blog.author}
//   </div>  
// )

// export default Blog

import { useState } from "react"
import "../styling/blog.css"
import blogService from '../services/blogs'

const Blog = ({blog, setBlogs}) => {
  const [details, setDetails] = useState(false)

  const toggleDetails = () => {
    setDetails(!details)
  }

  const updateBlogLikes = async (event) => {
    event.preventDefault()

    const updateBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    try {
      await blogService.update(blog.id, updateBlog)
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
    } catch (e) {
      console.error(e)
    }

  }

  return (
  <div className="blog">
    <div className="blog-title">{blog.title}</div>
    {
      details
      ?
      <div>
        {blog.author}<br/>
        <a href={blog.url}>{blog.url}</a><br/>
        {blog.likes}<button className="like-button" onClick={updateBlogLikes}>like</button><br/>
        {/* {blog.url}<br/>
        {blog.likes}<button onClick={() => {console.log("you liked this")}}>like</button><br/> */}
        {blog.user.username}<br/>
        <button className="toggle-details" onClick={toggleDetails}>hide</button>
      </div>
      :
      <button className="toggle-details" onClick={toggleDetails}>show</button>
    }
  </div>)}

export default Blog
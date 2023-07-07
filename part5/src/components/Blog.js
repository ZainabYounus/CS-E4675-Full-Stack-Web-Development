// const Blog = ({blog}) => (
//   <div>
//     {blog.title} {blog.author}
//   </div>  
// )

// export default Blog

import { useState } from "react"
import "../styling/blog.css"

const Blog = ({blog}) => {
  const [details, setDetails] = useState(false)

  const toggleDetails = () => {
    setDetails(!details)
  }

  return (
  <div className="blog">
    <div className="blog-title">{blog.title}</div>
    {
      details
      ?
      <div>
        {blog.author}<br/>
        {blog.url}<br/>
        {blog.likes}<button onClick={() => {console.log("you liked this")}}>like</button><br/>
        {blog.user.username}<br/>
        <button className="toggle-details" onClick={toggleDetails}>hide</button>
      </div>
      :
      <button className="toggle-details" onClick={toggleDetails}>show</button>
    }
  </div>)}

export default Blog
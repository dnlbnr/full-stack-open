function BlogListEntry({ blog }) {
  const blogStyle = {
    border: '1px solid black',
    padding: '4px',
    margin: '2px',
  }

  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}
    </div>
  )
}

export default BlogListEntry

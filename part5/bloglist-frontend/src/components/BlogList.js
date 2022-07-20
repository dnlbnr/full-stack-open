import Blog from './Blog';

function BlogList({ user, blogs, likeBlog }) {
  return (
    <div>
      <h2>
        blogs for
        {' '}
        {user.username}
      </h2>

      {blogs.map((blog) => <Blog key={blog.id} blog={blog} likeBlog={likeBlog} />)}
    </div>
  );
}

export default BlogList;

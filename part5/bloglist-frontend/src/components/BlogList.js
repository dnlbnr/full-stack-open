import Blog from './Blog';
import {
  userType, blogsType, likeBlogType, deleteBlogType,
} from '../utils/propTypes';

function BlogList({
  user, blogs, likeBlog, deleteBlog,
}) {
  return (
    <div>
      <h2>
        blogs for
        {' '}
        {user.username}
      </h2>

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={likeBlog}
          deleteBlog={deleteBlog}
        />
      ))}
    </div>
  );
}

BlogList.propTypes = {
  user: userType.isRequired,
  blogs: blogsType.isRequired,
  likeBlog: likeBlogType.isRequired,
  deleteBlog: deleteBlogType.isRequired,
};

export default BlogList;

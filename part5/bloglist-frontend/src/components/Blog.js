import { useState } from 'react';
import { blogType, likeBlogType, deleteBlogType } from '../utils/propTypes';

function Blog({ blog, likeBlog, deleteBlog }) {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [liked, setLiked] = useState(false);

  const blogStyle = {
    border: '1px solid black',
    padding: '4px',
    margin: '2px',
  };

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible);
  };

  const handleLike = async () => {
    setLiked(true);
    await likeBlog(blog);
  };

  const handleDelete = () => {
    deleteBlog(blog);
  };

  return (
    <div style={blogStyle}>
      {blog.title}
      {' '}
      {blog.author}
      {' '}
      <button type="button" onClick={toggleDetails}>{detailsVisible ? 'Hide details' : 'Show details'}</button>
      { detailsVisible && (
      <div>
        {blog.url}
        {' '}
        <br />
        {blog.likes}
        {' '}
        {!liked && <button type="button" onClick={handleLike}>{liked ? 'Unlike' : 'Like'}</button>}
        <br />
        <button type="button" onClick={handleDelete}>Delete Blog</button>
      </div>
      )}
    </div>
  );
}

Blog.propTypes = {
  blog: blogType.isRequired,
  likeBlog: likeBlogType.isRequired,
  deleteBlog: deleteBlogType.isRequired,
};

export default Blog;

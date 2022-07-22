import { useState } from 'react';
import { blogType, likeBlogType, deleteBlogType } from '../utils/propTypes';

function Blog({ blog, likeBlog, deleteBlog }) {
  const [detailsVisible, setDetailsVisible] = useState(false);
  // const [liked, setLiked] = useState(false);

  const blogStyle = {
    border: '1px solid black',
    padding: '4px',
    margin: '2px',
  };

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible);
  };

  const handleLike = async () => {
    await likeBlog(blog);
    // setLiked(true);
  };

  const handleDelete = () => {
    deleteBlog(blog);
  };

  return (
    <div style={blogStyle} className="blog">
      {blog.title}
      {' '}
      {blog.author}
      {' '}
      <button className="toggleDetailsButton" type="button" onClick={toggleDetails}>{detailsVisible ? 'Hide details' : 'Show details'}</button>
      { detailsVisible && (
      <div className="blogDetails">
        {blog.url}
        {' '}
        <br />
        <span className="likes">{blog.likes}</span>
        {' '}
        {/* {!liked &&
          <button className="likeButton" type="button" onClick={handleLike}>Like</button> */}
        <button className="likeButton" type="button" onClick={handleLike}>Like</button>
        <br />
        <button className="deleteButton" type="button" onClick={handleDelete}>Delete Blog</button>
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

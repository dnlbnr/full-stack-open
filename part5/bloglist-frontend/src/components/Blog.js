import { useState } from 'react';

function Blog({ blog, likeBlog }) {
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
      </div>
      )}
    </div>
  );
}

export default Blog;

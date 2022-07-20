import PropTypes from 'prop-types';

const blogType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
});

const blogsType = PropTypes.arrayOf(blogType);

const userType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
});

const likeBlogType = PropTypes.func;

const deleteBlogType = PropTypes.func;

export {
  userType, blogType, blogsType, likeBlogType, deleteBlogType,
};

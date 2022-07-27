import PropTypes from 'prop-types';

const userType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
});

const blogType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
});

const blogsType = PropTypes.arrayOf(blogType);
const likeBlogType = PropTypes.func;
const deleteBlogType = PropTypes.func;
const createNewBlogType = PropTypes.func;
const textType = PropTypes.string;

const onSubmitType = PropTypes.func;

const childrenType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node]);

export {
  userType,
  blogType,
  blogsType,
  likeBlogType,
  deleteBlogType,
  createNewBlogType,
  onSubmitType,
  textType,
  childrenType,
};

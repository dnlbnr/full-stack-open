import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Blog from './Blog';

const blog = {
  title: 'Test Blog',
  author: 'Test Author',
  url: 'Test.de',
  likes: 5,
};
const likeBlog = jest.fn();
const deleteBlog = jest.fn();

let container;
let user;

beforeEach(() => {
  container = render(<Blog blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} />).container;
  user = userEvent.setup();
});

test('By default, only title and author are displayed', () => {
  const titleAndAuthor = screen.findByText(`${blog.title} ${blog.author}`);
  const blogDetails = container.querySelector('.blogDetails');

  expect(titleAndAuthor).toBeDefined();
  expect(blogDetails).toBe(null);
});

test('When the show details button is clicked, url and likes are visible', async () => {
  const button = container.querySelector('.toggleDetailsButton');
  await user.click(button);

  const blogDetails = container.querySelector('.blogDetails');

  expect(button).toBeDefined();
  expect(blogDetails).toBeVisible();
  expect(blogDetails).toHaveTextContent(blog.url);
  expect(blogDetails).toHaveTextContent(blog.likes);
});

test('When like button is clicked, the event handler is called', async () => {
  const toggleButton = container.querySelector('.toggleDetailsButton');
  await user.click(toggleButton);

  const likeButton = container.querySelector('.likeButton');
  await user.click(likeButton);

  expect(likeBlog.mock.calls).toHaveLength(1);
});

test('When like button is clicked, the button disappears', async () => {
  const toggleButton = container.querySelector('.toggleDetailsButton');
  await user.click(toggleButton);

  const likeButton = container.querySelector('.likeButton');
  await user.click(likeButton);
  const afterLike = container.querySelector('.likeButton');

  expect(afterLike).toBe(null);
});

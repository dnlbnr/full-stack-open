import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import NewBlog from './NewBlog';

const createNewBlog = jest.fn();

let container;
let user;

beforeEach(() => {
  container = render(<NewBlog createNewBlog={createNewBlog} />).container;
  user = userEvent.setup();
});

test('On submit, the submit handler is called with the correct arguments', async () => {
  const titleInput = container.querySelector('input[name="title"]');
  const authorInput = container.querySelector('input[name="author"]');
  const urlInput = container.querySelector('input[name="url"]');
  const submitButton = container.querySelector('button[type="submit"]');
  const formValues = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'test.de',
  };

  await user.type(titleInput, formValues.title);
  await user.type(authorInput, formValues.author);
  await user.type(urlInput, formValues.url);
  await user.click(submitButton);

  expect(createNewBlog.mock.calls).toHaveLength(1);
  expect(createNewBlog.mock.calls[0][0]).toMatchObject(formValues);
});

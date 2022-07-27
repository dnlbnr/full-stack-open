import { useState } from 'react'
import useBlogs from '../hooks/useBlogs'

const initialValues = {
  title: '',
  author: '',
  url: '',
}

function NewBlog() {
  const [formValues, setFormValues] = useState(initialValues)
  const { addBlog } = useBlogs()

  const handleChange = ({ target }) => {
    const { name, value } = target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    addBlog(formValues)
    setFormValues(initialValues)
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <div>
        <form onSubmit={handleSubmit}>
          Title:{' '}
          <input
            type="text"
            name="title"
            value={formValues.title}
            onChange={handleChange}
          />
          <br />
          Author:{' '}
          <input
            type="text"
            name="author"
            value={formValues.author}
            onChange={handleChange}
          />
          <br />
          URL:{' '}
          <input
            type="text"
            name="url"
            value={formValues.url}
            onChange={handleChange}
          />
          <br />
          <button className="primary" type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
  )
}

export default NewBlog

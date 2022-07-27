import { useState } from 'react'

const NewBlogComment = ({ comment }) => {
  const [inputValue, setInputValue] = useState('')

  const handleChange = ({ target }) => {
    setInputValue(target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    comment(inputValue)
    setInputValue('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="Comment"
          value={inputValue}
          onChange={handleChange}
        />{' '}
        <button type="submit">Comment</button>
      </form>
    </div>
  )
}

export default NewBlogComment

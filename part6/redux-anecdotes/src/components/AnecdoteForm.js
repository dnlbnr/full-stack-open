import { useState } from 'react'
import { connect } from 'react-redux'
import { add } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const [inputValue, setInputValue] = useState('')

  const handleChange = ({ target }) => {
    setInputValue(target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.add(inputValue)
    setInputValue('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" name="anecdote" value={inputValue} onChange={handleChange} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default connect(null, { add })(AnecdoteForm)

import { connect } from 'react-redux'
import { set } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = ({ target }) => {
    const { value } = target
    props.set(value.toLowerCase())
  }
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default connect(null, { set })(Filter)

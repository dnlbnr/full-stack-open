import { forwardRef, useState, useImperativeHandle } from 'react'
import { textType, childrenType } from '../utils/propTypes'

const Collapsible = forwardRef((props, ref) => {
  const { text } = props
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => ({ toggleVisible }))

  return (
    <div>
      <div>
        <button
          className={`toggleButton ${visible ? '' : 'primary'}`}
          type="button"
          onClick={toggleVisible}
        >
          {visible ? `collapse ${text}` : text}
        </button>
      </div>
      <div>{visible && props.children}</div>
    </div>
  )
})

Collapsible.propTypes = {
  text: textType.isRequired,
  children: childrenType.isRequired,
}

export default Collapsible

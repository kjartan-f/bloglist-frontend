import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [show, setShow] = useState(false)

  const toggleShow = () => {
    setShow(!show)
  }

  useImperativeHandle(ref, () => {
    return { toggleShow }
  })

  if (show) {
    return (
      <div>
        {props.children}
        <button onClick={toggleShow}>Cancel</button>
      </div>
    )
  } else {
    return (
      <div>
        <button onClick={toggleShow}>{props.text}</button>
      </div>
    )
  }

})

Togglable.propTypes = {
  text: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable
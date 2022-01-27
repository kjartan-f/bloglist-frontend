import React from 'react'

const ToggleButton = ({ state, toggle }) => {
  return state? <button onClick={toggle}>Hide</button> : <button onClick={toggle}>Show</button>
}

export default ToggleButton
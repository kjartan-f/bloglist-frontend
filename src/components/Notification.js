import React from 'react'
import { Alert } from 'react-bootstrap'


const Notification = ({ messages }) => {

  return (
    <div className="container">
      { messages.map((n) => <Alert variant={n.type}  key={n.id} >{n.notification}</Alert>) }
    </div>
  )

}

export default Notification


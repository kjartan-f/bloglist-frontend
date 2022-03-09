
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const UserList = () => {
  const users = useSelector(state => state.users)
  console.log('USERS',users)

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead><tr><td>Name</td><td>Blogs created</td></tr></thead>
        <tbody>
          {users.map(user => <tr key={user.id}><td><Link to={`/user/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td></tr>)}
        </tbody>
      </table>
    </>
  )
}

export default UserList
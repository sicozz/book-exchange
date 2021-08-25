import React from 'react'
import User from './user'

const Users = ({ users }) => {
  return (<section>
    {users.map((user, index) => {
      return (<User key={user.user_name} user={user} />)
    })}
  </section>
  )
}

export default Users

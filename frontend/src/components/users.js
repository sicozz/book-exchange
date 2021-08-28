import React from 'react'
import User from './user'

const Users = ({ userId, users }) => {
  return (<section>
    {users.map((user, index) => {
      return (<User key={user.user_name} userId={userId} user={user} />)
    })}
  </section>
  )
}

export default Users

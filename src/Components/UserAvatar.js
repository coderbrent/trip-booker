import React from 'react'

const UserAvatar = ({ user }) => {
  return (
    <>
    <figure className="image is-32x32">
    { user ?
      <>
        <img
          className="is-rounded"
          src={user.picture ? user.picture : 'User Fallback Image' }
        /> 
        <p>Logged in as: <strong>{ user.email } </strong></p>
      </> : '...loading' }
      </figure>
    </>
  )
}

export default UserAvatar;
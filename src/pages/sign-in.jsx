import React from 'react'
import Auth from '../components/auth'
import ShowTitle from '../components/show-title'

const SignIn = ({ setToken }) => {
  return (
    <div className='items-center'>
      <ShowTitle title="Sign In" />
      <Auth path='sign-in' title="Sign In to your account" setToken={setToken} />
    </div>
  )
}

export default SignIn

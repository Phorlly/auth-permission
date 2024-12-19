import React from 'react'
import ShowTitle from '../components/show-title'

const Home = ({ user }) => {

  return (
    <div className='title mt-12'>
      <ShowTitle title='Home' />
      {user?.name && <h1>My name is: {user?.name}</h1>}
      <p className=' font-normal mt-4'>Welcome to the Home Page.</p>
    </div>
  )
}

export default Home
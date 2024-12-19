import React from 'react'
import Auth from '../components/auth'
import ShowTitle from '../components/show-title'

const SignUp = ({ setToken }) => {
    return (
        <div className='items-center'>
            <ShowTitle title='Sign Up' />
            <Auth path='sign-up' title="Sign Up a new accout" setToken={setToken} />
        </div>
    )
}

export default SignUp
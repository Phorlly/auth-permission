import React from 'react'

const SelectOption = ({ children, label, value, onChange, error, user }) => {

    return (
        <div>
            <label htmlFor={value} className='pb-2'>{label}</label>
            <select name={value} value={value} onChange={onChange} className='w-full p-1 rounded-md'>
                <option value="" disabled>---Select one role---</option>
                {user?.type === 'user' && (
                    <>
                        <option value="guest">Guest</option>
                        <option value="user">User</option>
                    </>
                )}
                {user?.type === 'admin' && (
                    <>
                        <option value="guest">Guest</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </>
                )}
                {children}
            </select>
            <p className='error mt-2'>{error}</p>
        </div>
    )
}

export default SelectOption
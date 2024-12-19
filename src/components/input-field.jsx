import React from 'react'

const InputFiel = ({ value, label, placeholder, onChange, type = 'text', error = '' }) => {

    return (
        <div className='my-4 flex flex-col'>
            <label htmlFor={value} className='pb-2'>{label}</label>
            <input className='p-1'
                type={type}
                placeholder={placeholder}
                name={value}
                value={value}
                onChange={onChange}
            />
            <p className='error mt-2'>{error}</p>
        </div>
    )
}

export default InputFiel;

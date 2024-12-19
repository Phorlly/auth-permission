import React from 'react'

const TextArea = ({ value, label, placeholder, onChange, error = '' }) => {

    return (
        <div className='my-4 flex flex-col'>
            <label htmlFor={value} className='pb-2'>{label}</label>
            <textarea className='p-2'
                placeholder={placeholder}
                name={value}
                value={value}
                onChange={onChange}
            />
            <p className='error mt-2'>{error}</p>
        </div>
    )
}

export default TextArea;
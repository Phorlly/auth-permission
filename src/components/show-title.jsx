import React, { useEffect } from 'react'

const ShowTitle = ({ title }) => {
    useEffect(() => {
        document.title = title + ' Page'
    });

    return <></>
}

export default ShowTitle
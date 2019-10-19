import React from 'react'
import UpdateItem from '../components/UpdateItem'

const sell = ({query}) => {
    return (
        <div>
            <UpdateItem id={query.id}/>
        </div>
    )
}

export default sell

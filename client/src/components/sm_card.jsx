import React from 'react'
import { Link } from 'react-router-dom'

function S_card({title, client, developer, link}) {
  return (
    <Link to=''>   
      <div className="max-w-sm m-5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
          <p className="mb-3 font-small text-sm text-gray-700 dark:text-gray-400">{client && (<>Client: {client}</>)}{developer && (<>Developer: {developer}</>)}</p>
      </div>
    </Link>
  )
}

export default S_card
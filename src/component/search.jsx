import React from 'react'

const search = ({ searchTerm,setSearchTerm}) => {
  return (
    <div className="search">
        <div>
            <img src="search.svg" alt="search" />

            <input
             type="text"
             placeholder="search through thousand of movies"
             value={searchTerm}
             onChange={(event)=> setSerchTerm(event.target.value)} />
        </div>
    </div>
  )
}

export default search
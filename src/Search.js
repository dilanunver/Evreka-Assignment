import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'



const Search = ({ onSearch }) => {
  const [searchItem, setSearchItem] = useState('');

  const searchOnEnter = (event) => {
    if (event.keyCode === 13) {
      onSearch(event.target.value)
    }
  }
  return (
    <div>
      <input
        type="text"
        onKeyDown={searchOnEnter}
        placeholder='search...'
        onChange={e => { setSearchItem(e.target.value) }}
      />
      <button className='btn' onClick={() => onSearch(searchItem)}>
        <FaSearch></FaSearch></button>
    </div>
  )
}
export default Search
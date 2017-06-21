import React from 'react'

import {
  PER_PAGE
} from '../../constants/refs'

const ListPagination = props => {
  if(props.unitsCount <= PER_PAGE){
    return null
  }

  const range = []
  for(let i = 0; i < Math.ceil(props.unitsCount / PER_PAGE); i++){
    range.push(i)
  }

  return (
    <nav>
      <div className='pagination'>
        {
          range.map(v => {
            const isCurrent = v === props.currentPage
            const handleClick = ev => {
              ev.preventDefault()
              props.onSetPage(v)
            }
            return (
              <li
                className={isCurrent ? 'page-item active' : 'page-item'}
                key={v.toString()}
                onClick={handleClick}>
                <a className='page-link'>
                  {v + 1}
                </a>
              </li>
            )
          })
        }
      </div>
    </nav>
  )
}

export default ListPagination

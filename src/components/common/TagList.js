import React from 'react'

const TagList = ({ unit, removeTag, payload }) => {
  if(unit.endTime === null && unit.expireAt === null){
    return null
  }

  const statusList = unit.hasOwnProperty('endTime') ? ['done', 'ongoing', 'ongoing-taken'] : ['personal', 'public', 'openPublic']
  const typeList = unit.hasOwnProperty('endTime') ? ['delivering', 'production', 'shopping'] : ['delivering', 'giveOrLend', 'know']

  return (
    <ul className='tag-list'>
      {
        unit.tagList.map(tag => {

          // Skipped if no payload
          const handleClick = payload ? ev => {
            ev.preventDefault()
            return payload[1](tag, payload[0](tag))
          } : null

          if(statusList.indexOf(tag) !== -1){
            return (
              <li className='tag-default tag-pill tag-info' key={tag}>
                {tag}
              </li>
            )
          }else if(typeList.indexOf(tag) !== -1){
            return (
              <li
                className='tag-default tag-pill tag-success' key={tag}
                onClick={handleClick}>
                { // Skipped if no removeTag
                  removeTag ?
                  <i className='ion-close-round' onClick={removeTag(tag)}></i>
                  : null
                }
                {tag}
              </li>
            )
          }
          return (
            <li
              className='tag-default tag-pill tag-outline' key={tag}
              onClick={handleClick}>
              { // Skipped if no removeTag
                removeTag ?
                <i className='ion-close-round' onClick={removeTag(tag)}></i>
                : null
              }
              {tag}
            </li>
          )
        })
      }
    </ul>
  )
}

export default TagList

import React from 'react'

import TagList from '../common/TagList'
import agent from '../../agent'

const Tags = props => {
  if(!props.tags){
    return (
      <div>Loading Tags...</div>
    )
  }

  const tags = props.tags

  let payload, unit
  if(props.tagType === 'request'){
    payload = [
      tag => agent.Requests.byTag(tag),
      props.onClickTag
    ]
    unit = {
      endTime: '',
      tagList: tags
    }
  }else{
    payload = [
      tag => agent.Gifts.byTag(tag),
      props.onClickTag
    ]
    unit = {
      expireAt: '',
      tagList: tags
    }
  }

  return (
    <TagList unit={unit} payload={payload}/>
  )
}

export default Tags

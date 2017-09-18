import React from 'react'

import agent from '../../agent'

export const CollectionTab = props => {
  const handleCollect = ev => {
    ev.preventDefault()
    props.onTabClick('collect', agent.Requests.collect())
  }
  return (
    <li className='nav-item'>
      <a
        className={props.tab === 'collect' ? 'nav-link active' : 'nav-link'}
        onClick={handleCollect}>
        <i className='ion-earth'></i>&nbsp;Your Collection
      </a>
    </li>
  )
}

export const GlobalFeedTab = props => {
  const handleAll = ev => {
    ev.preventDefault()
    props.onTabClick('all', agent.Requests.all())
  }
  return (
    <li className='nav-item'>
      <a
        className={props.tab === 'all' ? 'nav-link active' : 'nav-link'}
        onClick={handleAll}>
        <i className='ion-planet'></i>&nbsp;Global Feed
      </a>
    </li>
  )
}

export const FurtherCollectTab = props => {
  const handleFurtherCollect = ev => {
    ev.preventDefault()
    props.onTabClick('furtherCollect', agent.Requests.furtherCollect())
  }
  return (
    <li className='nav-item'>
      <a
        className={props.tab === 'furtherCollect' ? 'nav-link active' : 'nav-link'}
        onClick={handleFurtherCollect}>
        <i className='ion-paper-airplane'></i>&nbsp;Further Collect
      </a>
    </li>
  )
}

export const TagTab = props => {
  if(!props.tag){
    return null
  }

  return (
    <li className='nav-item'>
      <a className='nav-link active'>
        <i className='ion-pound'></i>&nbsp;{props.tag}
      </a>
    </li>
  )
}

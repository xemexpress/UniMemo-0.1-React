import React from 'react'
import { Link } from 'react-router'

import RequestActions from '../Request/RequestActions'
import GiftActions from '../Gift/GiftActions'

const UnitMeta = props => {
  const unit = props.unit
  const unitHolder = unit.requestId ? unit.poster : unit.provider

  return (
    <div className='article-meta'>
      <Link to={`@${unitHolder.username}`}>
        <img src={unitHolder.proPic} alt={unitHolder.username} />
      </Link>

      <div className='info'>
        <Link to={`@${unitHolder.username}`} className='author'>
          {unitHolder.username}
        </Link>
        <span className='date'>
          {new Date(unit.createdAt).toDateString()}
        </span>
      </div>

      {
        props.preview ? null
        : unit.requestId ?
        <RequestActions request={unit} />
        :
        <GiftActions gift={unit} />
      }

    </div>
  )
}

export default UnitMeta

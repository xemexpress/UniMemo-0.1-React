import React from 'react'
import { Link } from 'react-router'

import UnitMeta from '../UnitMeta'
import TagList from '../TagList'

const GiftPreview = props => {
  const gift = props.gift

  return (
    <div className='article-preview'>
      <UnitMeta unit={gift} preview={true} />

      <Link to={`gift/${gift.giftId}`} className='preview-link'>
        <h1>{gift.text}</h1>

        <p>Before:&nbsp;{new Date(gift.expireAt).toDateString()}</p>

        <span>Read more...</span>

        <TagList unit={gift} />
      </Link>
    </div>
  )
}

export default GiftPreview

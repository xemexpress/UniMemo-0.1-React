import React from 'react'
import { Link } from 'react-router'

import UnitMeta from '../UnitMeta'
import TagList from '../TagList'

const GiftPreview = props => {
  const gift = props.gift

  // Need to offset the time by -8 hrs, as Hong Kong (GMT+8).
  return (
    <div className='article-preview'>
      <UnitMeta unit={gift} preview={true} />

      <Link to={`gift/${gift.giftId}`} className='preview-link'>
        <h1>{gift.text}</h1>

        <p>Before:&nbsp;{new Date(new Date(gift.expireAt).getTime() - 3600000 * 8).toString().slice(0,21)}</p>

        <span>Read more...</span>

        <TagList unit={gift} />
      </Link>
    </div>
  )
}

export default GiftPreview

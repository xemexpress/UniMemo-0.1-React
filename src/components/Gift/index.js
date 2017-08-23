import React from 'react'
import { connect } from 'react-redux'

import UnitMeta from '../common/UnitMeta'
import TagList from '../common/TagList'
import ReceiverList from './ReceiverList'
import agent from '../../agent'

import {
  GIFT_PAGE_LOADED,
  GIFT_PAGE_UNLOADED
} from '../../constants'

const mapStateToProps = state => ({
  ...state.gift,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({
    type: GIFT_PAGE_LOADED,
    payload
  }),
  onUnload: () => dispatch({
    type: GIFT_PAGE_UNLOADED
  })
})

class Gift extends React.Component {
  componentWillMount(){
    this.props.onLoad(agent.Gifts.get(this.props.params.giftId))
  }

  componentWillUnmount(){
    this.props.onUnload()
  }

  render(){
    const gift = this.props.gift

    if(!gift){
      return null
    }

    const text = `
      <div>
        ${
          gift.provider.username === this.props.currentUser.username ?
          'People could use it before: '
          : 'You may use it before: '
        }
        <strong>${new Date(gift.expireAt).toDateString()}</strong>
      </div>
    `

    const markup = {
      __html: text
    }

    return (
      <div className='article-page'>
        <div className='banner'>
          <div className='container'>
            <h1>{gift.text}</h1>

            <UnitMeta unit={gift} />

            <TagList unit={gift} />

          </div>
        </div>

        <div className='container page'>
          <div className='row article-content'>
            <div className='col-xs-12'>
              <ReceiverList gift={gift} currentUser={this.props.currentUser} />

              <div dangerouslySetInnerHTML={markup}></div>
              <hr />

              {
                gift.image ?
                  <div className='offset-lg-3 col-lg-6'>
                    <img className='img-fluid' src={gift.image} alt={`Provided by ${gift.provider.username}`} />
                  </div>
                : null
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gift)

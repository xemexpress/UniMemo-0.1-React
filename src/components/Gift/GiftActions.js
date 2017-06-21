import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import agent from '../../agent'

import {
  DELETE_GIFT,
  UPDATE_GIFT,
  SWITCH_ACCESS_GIFT
} from '../../constants/actionTypes'

const mapStateToProps = state => ({
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onDel: giftId => dispatch({
    type: DELETE_GIFT,
    payload: agent.Gifts.del(giftId)
  }),
  onUpdate: gift => dispatch({
    type: UPDATE_GIFT,
    payload: agent.Gifts.update(gift)
  }),
  onSwitch: giftId => dispatch({
    type: SWITCH_ACCESS_GIFT,
    payload: agent.Gifts.switch(giftId)
  })
})

class GiftActions extends React.Component {
  constructor(){
    super()

    this.handleDel = gift => ev => {
      ev.preventDefault()
      this.props.onDel(gift.giftId)
    }

    this.handleReceive = gift => ev => {
      ev.preventDefault()
      this.props.onUpdate(gift)
    }

    this.handleSwitch = gift => ev => {
      ev.preventDefault()
      this.props.onSwitch(gift.giftId)
    }
  }

  render(){
    const gift = this.props.gift

    const isProvider = this.props.currentUser.username === gift.provider.username

    const isReceiver = this.props.currentUser.username === gift.receiver.username

    if(isProvider){
      return (
        <span>
          <Link
            to={`giftEditor/${gift.giftId}`}
            className='btn btn-sm btn-outline-secondary'>
            <i className='ion-edit'></i>&nbsp;Edit Gift
          </Link>
          &nbsp;&nbsp;&nbsp;
          <button
            className='btn btn-sm btn-outline-info'
            onClick={this.handleSwitch(gift)}>
            {
              gift.tagList.indexOf('personal') !== -1 ?
              <i>Switch to public. (Allowing receiver to let it go public)</i>
              : <i>Switch back to personal</i>
            }
          </button>
          &nbsp;&nbsp;&nbsp;
          <button
            className='btn btn-sm btn-outline-danger'
            onClick={this.handleDel(gift)}>
            <i className='ion-trash-a'></i>&nbsp;Delete Gift
          </button>
        </span>
      )
    }else{
      return (
        <span>
          <button
            className='btn btn-sm btn-outline-info'
            onClick={this.handleReceive(gift)}>
            {
              isReceiver ? <span><i className='ion-log-in'></i>&nbsp;Return. Thanks!</span>
              : <span><i className='ion-log-out'></i>&nbsp;Receive</span>
            }
          </button>
          &nbsp;&nbsp;&nbsp;
          {
            !isReceiver ? null : gift.tagList.indexOf('personal') !== -1 ?
            <i>This Gift can't be switched to public</i>
            :
            <button
              className='btn btn-sm btn-outline-danger'
              onClick={this.handleSwitch(gift)}>
              {
                gift.tagList.indexOf('public') !== -1 ?
                <i>Switch to openPublic</i>
                : <i>Switch back to public</i>
              }
            </button>
          }
        </span>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GiftActions)

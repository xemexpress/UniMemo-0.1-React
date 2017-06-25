import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import UnitMeta from '../UnitMeta'
import TagList from '../TagList'
import agent from '../../../agent'

import {
  WISH_REQUEST,
  UNWISH_REQUEST
} from '../../../constants/actionTypes'

const mapDispatchToProps = dispatch => ({
  wish: requestId => dispatch({
    type: WISH_REQUEST,
    payload: agent.Requests.wish(requestId)
  }),
  unwish: requestId => dispatch({
    type: UNWISH_REQUEST,
    payload: agent.Requests.unwish(requestId)
  })
})

class RequestPreview extends React.Component {
  constructor(){
    super()

    this.handleClick = ev => {
      ev.preventDefault()
      if(this.props.request.wished){
        this.props.unwish(this.props.request.requestId)
      }else{
        this.props.wish(this.props.request.requestId)
      }
    }
  }

  render(){
    const request = this.props.request

    const wishButtonClass = request.wished ?
      'btn btn-sm btn-primary' : 'btn btn-sm btn-outline-primary'

    return (
      <div className='article-preview'>
        <div className='article-meta'>
          <UnitMeta unit={request} preview={true} />

          <div className='pull-xs-right go-top'>
            <button
              className={wishButtonClass}
              onClick={this.handleClick}>
              <i className='ion-help-buoy'></i> {request.wishesCount}
            </button>
          </div>
        </div>

        <Link to={`request/${request.requestId}`} className='preview-link'>
          <h1>{request.text}</h1>

          <p>
            Start Time:&nbsp;{request.startTime ? new Date(request.startTime).toDateString() : 'Before End Time :)'}
            <br />
            Start Place:&nbsp;{request.startPlace ? request.startPlace : 'Not determined yet :)'}
            <br /><br />
            End Time:&nbsp;{new Date(request.endTime).toDateString()}
            <br />
            End Place:&nbsp;{request.endPlace}
          </p>

          <span>Read more...</span>

          <TagList unit={request} />
        </Link>
      </div>
    )
  }
}

export default connect(()=>({}), mapDispatchToProps)(RequestPreview)
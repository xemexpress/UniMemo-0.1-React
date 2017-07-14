import React from 'react'
import { connect } from 'react-redux'

import UnitMeta from '../common/UnitMeta'
import GoogleMap from '../common/Maps/GoogleMap'
import TagList from '../common/TagList'
import CommentContainer from '../common/CommentContainer'
import HelperList from './HelperList'
import agent from '../../agent'

import {
  REQUEST_PAGE_LOADED,
  REQUEST_PAGE_UNLOADED,
  HELPER_LOADED,
  CONFIRM_HELPER
} from '../../constants/actionTypes'

const mapStateToProps = state => ({
  ...state.request,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({
    type: REQUEST_PAGE_LOADED,
    payload
  }),
  onHelperLoad: requestId => dispatch({
    type: HELPER_LOADED,
    payload: agent.Requests.listHelpers(requestId)
  }),
  onHelperConfirm: (requestId, username) => dispatch({
    type: CONFIRM_HELPER,
    payload: agent.Requests.confirmHelper(requestId, username)
  }),
  onUnload: () => dispatch({
    type: REQUEST_PAGE_UNLOADED
  })
})

class Request extends React.Component {
  componentWillMount(){
    this.props.onLoad(Promise.all([
      agent.Requests.get(this.props.params.requestId),
      agent.Comments.forRequest(this.props.params.requestId)
    ]))
  }

  componentWillUnmount(){
    this.props.onUnload()
  }

  render(){
    const request = this.props.request

    if(!request){
      return null
    }

    const text = `
      <div>
        Start Time:&nbsp;
          <strong>${request.startTime ? new Date(request.startTime).toDateString() : 'Before End Time :)'}</strong>
        <br />
        Start Place:&nbsp;
          <strong>${request.startPlace ? request.startPlace : 'Not determined yet :)'}</strong>
        <br />
        <br />
        End Time:&nbsp;
          <strong>${new Date(request.endTime).toDateString()}</strong>
        <br />
        End Place:&nbsp;
          <strong>${request.endPlace}</strong>
      </div>
    `

    // const text = `
    //     Start Time: __${request.startTime ? new Date(request.startTime).toDateString() : 'Before End Time :)'}__
    //     Start Place: __${request.startPlace ? request.startPlace : 'Not determined yet :)'}__
    //
    //     End Time: __${new Date(request.endTime).toDateString()}__
    //     End Place: __${request.endPlace}__
    // `

    const markup = {
      __html: text
    }

    return (
      <div className='article-page'>
        <div className='banner'>
          <div className='container'>
            <h1>{request.text}</h1>

            <UnitMeta unit={request} />

            <TagList unit={request} />
          </div>
        </div>

        <div className='container page'>
          <div className='row article-content'>
            <div className='col-xs-12'>

              {
                this.props.currentUser ?
                <HelperList
                  onHelperLoad={this.props.onHelperLoad}
                  onHelperConfirm={this.props.onHelperConfirm}
                  posterName={request.poster.username}
                  currentUserName={this.props.currentUser.username}
                  request={request}
                  helpers={this.props.helpers} />
                : null
              }

              <hr />

              <div className='row'>
                <div className='col-md-5 col-xs-12'>
                  <div dangerouslySetInnerHTML={markup}></div>
                </div>

                <div className='col-md-7 col-xs-12'>
                  <GoogleMap startPlace={request.startPlace} endPlace={request.endPlace} />
                </div>
              </div>

              <hr />

              {
                request.image ?
                  <div className='offset-lg-3 col-lg-6'>
                    <img className='img-fluid' src={request.image} alt={`Provided by ${request.poster.username}`} />
                  </div>
                : null
              }

            </div>
          </div>

          <hr />

          <div className='row'>
            <CommentContainer
              commentErrors={this.props.commentErrors}
              updateErrors={this.props.updateErrors}
              comments={this.props.comments || []}
              requestId={this.props.params.requestId}
              isPoster={this.props.currentUser.username === request.poster.username}
              currentUser={this.props.currentUser} />
          </div>

        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Request)

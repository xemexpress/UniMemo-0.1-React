import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import UnitsList from './common/UnitsList'
import agent from '../agent'

import {
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
  FOLLOW_USER,
  UNFOLLOW_USER,
  SET_PAGE,
  SWITCH_TAKINGS
} from '../constants'

const EditProfileSettings = props => {
  if(props.isUser){
    return (
      <Link
        className='btn btn-sm btn-outline-secondary action-btn'
        to='settings'>
        <i className='ion-gear-a'></i>&nbsp;Edit Profile Settings
      </Link>
    )
  }
  return null
}

const FollowUserButton = props => {
  if(!props.isUser){
    return null
  }

  const handleFollow = ev => {
    ev.preventDefault()
    if(props.user.favoring){
      props.unfavor(props.user.username)
    }else{
      props.favor(props.user.username)
    }
  }

  return (
    <button
      className={props.user.favoring ? 'btn btn-sm action-btn btn-secondary' : 'btn btn-sm action-btn btn-outline-secondary'}
      onClick={handleFollow}>
      <i className='ion-android-hand'></i>&nbsp;
      {
        props.user.favoring ? 'Unfavor' : 'Favor'
      }
    </button>
  )
}

const mapStateToProps = state => ({
  ...state.contentList,
  profile: state.profile,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({
    type: PROFILE_PAGE_LOADED,
    payload
  }),
  onUnload: () => dispatch({
    type: PROFILE_PAGE_UNLOADED
  }),
  onFavor: username => dispatch({
    type: FOLLOW_USER,
    payload: agent.Profile.favor(username)
  }),
  onUnfavor: username => dispatch({
    type: UNFOLLOW_USER,
    payload: agent.Profile.unfavor(username)
  }),
  onSwitchOngoing: () => dispatch({
    type: SWITCH_TAKINGS,
    payload: agent.Requests.taking()
  }),
  onSwitchTaken: username => dispatch({
    type: SWITCH_TAKINGS,
    payload: agent.Requests.helpedBy(username)
  }),
  onSetPage: (p, payload) => dispatch({
    type: SET_PAGE,
    page: p,
    payload
  })
})

class Profile extends React.Component {
  constructor(){
    super()
    this.state = {
      content: ''
    }
  }

  componentWillMount(){
    this.props.onLoad(Promise.all([
      agent.Profile.get(this.props.params.username),
      agent.Requests.postedBy(this.props.params.username)
    ]))
  }

  componentWillUnmount(){
    this.props.onUnload()
  }

  renderTabs(canEdit){
    return (
      <ul className='nav nav-pills outline-active'>
        {
          canEdit ?
          <li className='nav-item'>
            <Link
              className='nav-link'
              to={`@${this.props.profile.username}/taken`}>
              <i className='ion-ios-analytics-outline'></i>&nbsp;Req. Taken
            </Link>
          </li>
          : null
        }

        <li className='nav-item'>
          <Link
            className='nav-link active'
            to={`@${this.props.profile.username}`}>
            <i className='ion-ios-pulse-strong'></i>&nbsp;Requests Sent
          </Link>
        </li>

        <li className='nav-item'>
          <Link
            className='nav-link'
            to={`@${this.props.profile.username}/wishes`}>
            <i className='ion-help-buoy'></i>&nbsp;Wished Req.
          </Link>
        </li>
      </ul>
    )
  }

  onSetPage(page){
    this.props.onSetPage(
      page,
      agent.Requests.postedBy(this.props.profile.username, page)
    )
  }

  render(){
    const profile = this.props.profile

    if(!profile){
      return null
    }

    const onSetPage = page => this.onSetPage(page)

    const canEdit = this.props.currentUser &&
      this.props.currentUser.username === this.props.profile.username
    const canFollow = this.props.currentUser &&
      this.props.currentUser.username !== this.props.profile.username

    return (
      <div className='profile-page'>
        <div className='user-info'>
          <div className='container'>
            <div className='row'>
              <div className='col-xs-12 col-md-10 offset-md-1'>

                <img
                  className='user-img'
                  src={profile.proPic}
                  alt={profile.username} />

                <h4>
                  {profile.username}
                </h4>

                <p>
                  {profile.bio}
                </p>

                <EditProfileSettings isUser={canEdit} />

                <FollowUserButton
                  isUser={canFollow}
                  user={profile}
                  favor={this.props.onFavor}
                  unfavor={this.props.onUnfavor} />

              </div>
            </div>
          </div>
        </div>

        <div className='container'>
          <div className='row'>
            <div className='col-xs-12 col-md-10 offset-md-1'>
              <div className='articles-toggle'>
                {this.renderTabs(canEdit)}
              </div>

              <UnitsList
                requests={this.props.requests}
                requestsCount={this.props.requestsCount}
                currentPage={this.props.currentPage}
                onSetPage={onSetPage} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
export { Profile, mapStateToProps, mapDispatchToProps }

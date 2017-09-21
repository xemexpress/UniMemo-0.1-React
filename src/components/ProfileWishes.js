import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import agent from '../agent'

import { Profile, mapStateToProps, mapDispatchToProps} from './Profile'

class ProfileWishes extends Profile {
  componentWillMount(){
    this.props.onLoad(Promise.all([
      agent.Profile.get(this.props.params.username),
      agent.Requests.wishedBy(this.props.params.username)
    ]))
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
              <i className='ion-android-checkbox-outline'></i>&nbsp;&nbsp;
              <i className='ion-android-time'></i>&nbsp;&nbsp;Req. Taken
            </Link>
          </li>
          : null
        }

        <li className='nav-item'>
          <Link
            className='nav-link'
            to={`@${this.props.profile.username}`}>
            <i className='ion-ios-pulse-strong'></i>&nbsp;Req. Sent
          </Link>
        </li>

        <li className='nav-item'>
          <Link
            className='nav-link active'
            to={`@${this.props.profile.username}/wishes`}>
            <i className='ion-help-buoy'></i>&nbsp;Wished Requests
          </Link>
        </li>
      </ul>
    )
  }

  onSetPage(page){
    this.props.onSetPage(
      page,
      agent.Requests.wishedBy(this.props.profile.username, page)
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileWishes)

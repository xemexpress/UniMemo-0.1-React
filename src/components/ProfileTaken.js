import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import agent from '../agent'

import { Profile, mapStateToProps, mapDispatchToProps} from './Profile'

class ProfileTaken extends Profile {
  componentWillMount(){
    this.props.onLoad(Promise.all([
      agent.Profile.get(this.props.params.username),
      agent.Requests.helpedBy(this.props.params.username)
    ]))

    this.setState({
      content: 'myTakens'
    })
  }

  renderTabs(canEdit){
    const ongoings = ev => {
      ev.preventDefault()
      this.setState({
        content: 'myOngoings'
      })
      this.props.onSwitchOngoing()
    }

    const takens = username => ev => {
      ev.preventDefault()
      this.setState({
        content: 'myTakens'
      })
      this.props.onSwitchTaken(username)
    }

    return (
      <ul className='nav nav-pills outline-active'>
        {
          canEdit && ['myTakens', 'myOngoings'].indexOf(this.state.content) !== -1 ?
          <span>
            <li className='nav-item'>
              <Link
                className={this.state.content === 'myTakens' ? 'nav-link active' : 'nav-link'}
                onClick={takens(this.props.profile.username)}>
                <i className='ion-android-checkbox-outline'></i>&nbsp;Confirmed
              </Link>
            </li>
            <li className='nav-item'>
              <span
                className={this.state.content === 'myOngoings' ? 'nav-link active' : 'nav-link'}
                onClick={ongoings}>
                <i className='ion-android-time'></i>&nbsp;Wait
              </span>
            </li>
          </span>
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
            className='nav-link'
            to={`@${this.props.profile.username}/wishes`}>
            <i className='ion-help-buoy'></i>&nbsp;Wished Req.
          </Link>
        </li>
      </ul>
    )
  }

  onSetPage(page){
    if(this.state.content === 'myTakens'){
      this.props.onSetPage(
        page,
        agent.Requests.helpedBy(this.props.profile.username, page)
      )
    }else if(this.state.content === 'myOngoings'){
      this.props.onSetPage(
        page,
        agent.Requests.taking()
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTaken)

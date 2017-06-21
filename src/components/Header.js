import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import {
  REQUEST_EDITOR_UNLOADED
} from '../constants/actionTypes'

const LoggedOutView = props => {
  if(!props.currentUser){
    return (
      <ul className='nav navbar-nav pull-xs-right'>
        <li className='nav-item'>
          <Link to='login' className='nav-link'>
            Sign in
          </Link>
        </li>

        <li className='nav-item'>
          <Link to='register' className='nav-link'>
            Sign up
          </Link>
        </li>
      </ul>
    )
  }
  return null
}

const LoggedInView = props => {
  if(props.currentUser){
    return (
      <ul className='nav navbar-nav pull-xs-right'>

        <li className='nav-item'>
          <Link to='/' className='nav-link'>
            Home
          </Link>
        </li>

        <li className='nav-item'>
          <Link to='requestEditor' className='nav-link' onClick={props.onEmptyEditor}>
            <i className='ion-compose'></i>&nbsp;New Request
          </Link>
        </li>

        <li className='nav-item'>
          <Link to='giftEditor' className='nav-link'>
            <i className='ion-android-happy'></i>&nbsp;New Gift
          </Link>
        </li>

        <li className='nav-item'>
          <Link to='settings' className='nav-link'>
            <i className='ion-gear-a'></i>&nbsp;Settings
          </Link>
        </li>

        <li className='nav-item'>
          <Link to={`@${props.currentUser.username}/taken`} className='nav-link'>
            <img
              className='user-pic'
              src={props.currentUser.proPic || 'https://photouploads.com/images/350646.png'}
              alt={props.currentUser.username} />
            {props.currentUser.username}
          </Link>
        </li>

      </ul>
    )
  }
  return null
}

const mapDispatchToProps = dispatch => ({
  onEmptyEditor: () => dispatch({
    type: REQUEST_EDITOR_UNLOADED
  })
})

const Header = props => {
  return (
    <nav className='navbar navbar-sticky-top navbar-light'>
      <div className='container'>

        <Link to='/' className='navbar-brand'>
          {props.appName}
        </Link>

        <LoggedOutView currentUser={props.currentUser} />
        <LoggedInView
          currentUser={props.currentUser}
          onEmptyEditor={props.onEmptyEditor} />

      </div>
    </nav>
  )
}

export default connect(()=>({}), mapDispatchToProps)(Header)

import React from 'react'
import { Link } from 'react-router'

const LoggedOutView = props => {
  if(!props.currentUser){
    return (
      <ul className='nav navbar-nav pull-xs-right'>
        <li className='nav-item'>
          <span className='nav-link' style={{ 'pointer-events': 'none', 'font-size': '80%' }}>
            (請使用無痕瀏覽)
          </span>
        </li>
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

class LoggedInView extends React.Component {
  constructor(){
    super()
    this.state = {
      expanded: false
    }

    this.handleExpand = ev => {
      ev.preventDefault()
      if(this.state.expanded){
        this.setState({ expanded: false })
      }else{
        this.setState({ expanded: true })
      }

      setTimeout(()=>{
        this.setState({ expanded: false })
      }, 10000)
    }
  }

  componentDidMount(){
    document.addEventListener('wheel', ev => {
      if(this.state.expanded){
        this.setState({ expanded: false })
      }
    })
  }

  render(){
    if(this.props.currentUser){
      return (
        <ul id='myTopNav' className={this.state.expanded ? 'nav navbar-nav pull-xs-right topnav expanded' : 'nav navbar-nav pull-xs-right topnav'}>
          <li className='nav-item'>
            <Link to='/' className='nav-link'>
              Home
            </Link>
          </li>

          <li className='nav-item'>
            <Link to='requestEditor' className='nav-link'>
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
            <Link to={`@${this.props.currentUser.username}/taken`} className='nav-link'>
              <img
                className='user-pic'
                src={this.props.currentUser.proPic}
                alt={this.props.currentUser.username} />
              {this.props.currentUser.username}
            </Link>
          </li>

          <li className='nav-item nav-link icon' onClick={this.handleExpand}>
            {
              this.state.expanded ?
              <i className='ion-close-round'></i>
              // <span>&#9747;</span>  // Cross
              :
              <i className='ion-navicon-round'></i>
              // <span>&#9776;</span>  // Burger Bar
            }
          </li>

        </ul>
      )
    }
    return null
  }
}

const Header = props => {
  return (
    <nav className='navbar navbar-sticky-top navbar-light'>
      <div className='container'>

        <Link to='/' className='navbar-brand'>
          {props.appName}
        </Link>

        <LoggedOutView currentUser={props.currentUser} />
        <LoggedInView currentUser={props.currentUser} />

      </div>
    </nav>
  )
}

export default Header

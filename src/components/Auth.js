import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import ListErrors from './common/ListErrors'
import agent from '../agent'

import {
  UPDATE_FIELD_AUTH,
  REGISTER,
  LOGIN,
  AUTH_PAGE_UNLOADED
} from '../constants'

const mapStateToProps = state => ({
  ...state.auth
})

const mapDispatchToProps = dispatch => ({
  onUpdateField: (key, value) => dispatch({
    type: UPDATE_FIELD_AUTH,
    key,
    value
  }),
  onRegSubmit: (username, email, password) => dispatch({
    type: REGISTER,
    payload: agent.Auth.register(username, email, password)
  }),
  onLogSubmit: (email, password) => dispatch({
    type: LOGIN,
    payload: agent.Auth.login(email, password)
  }),
  onUnload: () => dispatch({
    type: AUTH_PAGE_UNLOADED
  })
})

class Auth extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      error: ''
    }

    const updateFieldEvent = key => ev => this.props.onUpdateField(key, ev.target.value)
    this.changeUsername = updateFieldEvent('username')
    this.changeEmail = updateFieldEvent('email')
    this.changePassword = updateFieldEvent('password')
    this.changeConfirm = updateFieldEvent('confirm')
    
    this.submitForm = (username, email, password) => ev => {
      ev.preventDefault()

      if(this.props.route.path === 'register'){
        // Register
        if(this.props.confirm === this.props.password){
          this.setState({ error: '' })
          this.props.onRegSubmit(username, email, password)
        }else{
          this.setState({ error: 'Please confirm your password again:)' })
        }
      }else{
        // Log in
        this.props.onLogSubmit(email, password)
      }
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.props.route.path !== nextProps.route.path){
      this.setState({ error: '' })
      this.props.onUnload()
    }
  }

  componentWillUnmount(){
    this.props.onUnload()
  }

  render(){
    const username = this.props.username
    const email = this.props.email
    const password = this.props.password
    const confirm = this.props.confirm
    
    return (
      <div className='auth-page'>
        <div className='container page'>
          <div className='row'>
            <div className='col-md-6 offset-md-3 col-xs-12'>

              <h1 className='text-xs-center'>
                {
                  this.props.route.path === 'register' ?
                  'Sign Up'
                  : 'Sign In'
                }
              </h1>

              <p className='text-xs-center'>
                {
                  this.props.route.path === 'register' ?
                  <Link to='login'>Have an account?</Link>
                  : <Link to='register'>Need an account?</Link>
                }
              </p>

            {
              this.state.error ?
              <ul className='error-messages'><li>{this.state.error}</li></ul>
              : <ListErrors errors={this.props.errors} />
            }

              <form onSubmit={this.props.route.path === 'register' ?
                this.submitForm(username, email, password)
                : this.submitForm(null, email, password)}>
                <fieldset>
                  {
                    this.props.route.path === 'register' ?
                    <fieldset className='form-group'>
                      <input
                        className='form-control form-control-lg'
                        type='text'
                        placeholder='Username'
                        value={username}
                        onChange={this.changeUsername} />
                    </fieldset>
                    : null
                  }

                  <fieldset className='form-group'>
                    <input
                      className='form-control form-control-lg'
                      type='email'
                      placeholder='Email'
                      value={email}
                      onChange={this.changeEmail} />
                  </fieldset>

                  <fieldset className='form-group'>
                    <input
                      className='form-control form-control-lg'
                      type='password'
                      placeholder='Password'
                      value={password}
                      onChange={this.changePassword} />
                  </fieldset>

                  {
                    this.props.route.path === 'register' ?
                    <fieldset className='form-group'>
                      <input
                        className='form-control form-control-lg'
                        type='password'
                        placeholder='Confirm Password'
                        value={confirm}
                        onChange={this.changeConfirm} />
                    </fieldset>
                    : null
                  }

                  <button
                    className='btn btn-lg btn-primary pull-xs-right'
                    type='submit'
                    disabled={this.props.inProgress}>
                    {
                      this.props.route.path === 'register' ?
                      'Sign up'
                      : 'Sign in'
                    }
                  </button>

                </fieldset>
              </form>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)

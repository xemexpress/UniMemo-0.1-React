import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import ListErrors from './common/ListErrors'
import agent from '../agent'

import {
  UPDATE_FIELD_AUTH,
  REGISTER,
  REGISTER_PAGE_UNLOADED
} from '../constants/actionTypes'

const mapStateToProps = state => ({
  ...state.auth
})

const mapDispatchToProps = dispatch => ({
  onChangeUsername: value => dispatch({
    type: UPDATE_FIELD_AUTH,
    key: 'username',
    value
  }),
  onChangeEmail: value => dispatch({
    type: UPDATE_FIELD_AUTH,
    key: 'email',
    value
  }),
  onChangePassword: value => dispatch({
    type: UPDATE_FIELD_AUTH,
    key: 'password',
    value
  }),
  onChangeConfirm: value => dispatch({
    type: UPDATE_FIELD_AUTH,
    key: 'confirm',
    value
  }),
  onSubmit: (username, email, password) => dispatch({
    type: REGISTER,
    payload: agent.Auth.register(username, email, password)
  }),
  onUnload: () => dispatch({
    type: REGISTER_PAGE_UNLOADED
  })
})

class Register extends React.Component {
  constructor(){
    super()
    this.state = {
      error: ''
    }

    this.changeUsername = ev => this.props.onChangeUsername(ev.target.value)
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value)
    this.changePassword = ev => this.props.onChangePassword(ev.target.value)
    this.changeConfirm = ev => this.props.onChangeConfirm(ev.target.value)
    this.submitForm = (username, email, password) => ev => {
      ev.preventDefault()
      if(this.props.confirm === this.props.password){
        this.setState({ error: '' })
        this.props.onSubmit(username, email, password)
      }else{
        this.setState({ error: 'Please confirm your password again:)' })
      }
    }
  }

  componentWillUnmount(){
    this.props.onUnload()
  }

  render(){
    const username = this.props.username
    const email = this.props.email
    const password = this.props.password
    const confirm = this.state.confirm

    return (
      <div className='auth-page'>
        <div className='container page'>
          <div className='row'>
            <div className='col-md-6 offset-md-3 col-xs-12'>

              <h1 className='text-xs-center'>
                Sign up
              </h1>

              <p className='text-xs-center'>
                <Link to='login'>
                  Have an account?
                </Link>
              </p>

              <ListErrors errors={this.props.errors} />
            {
              this.state.error ?
              <ul className='error-messages'><li>{this.state.error}</li></ul>
              : null
            }

              <form onSubmit={this.submitForm(username, email, password)}>
                <fieldset>

                  <fieldset className='form-group'>
                    <input
                      className='form-control form-control-lg'
                      type='text'
                      placeholder='Username'
                      value={username}
                      onChange={this.changeUsername} />
                  </fieldset>

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

                  <fieldset className='form-group'>
                    <input
                      className='form-control form-control-lg'
                      type='password'
                      placeholder='Confirm Password'
                      value={confirm}
                      onChange={this.changeConfirm} />
                  </fieldset>

                  <button
                    className='btn btn-lg btn-primary pull-xs-right'
                    type='submit'
                    disabled={this.props.inProgress}>
                    Sign up
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

export default connect(mapStateToProps, mapDispatchToProps)(Register)

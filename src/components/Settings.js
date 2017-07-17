import React from 'react'
import { connect } from 'react-redux'

import ListErrors from './common/ListErrors'
import ImageUpload from './common/ImageUpload'
import agent from '../agent'

import {
  SAVE_SETTINGS,
  LOGOUT
} from '../constants/actionTypes'

class SettingsForm extends React.Component {
  constructor(){
    super()

    this.state = {
      proPic: '',
      username: '',
      bio: '',
      password: '',
      mobileNum: ''
    }

    this.updateState = field => ev => this.setState({ [field]: ev.target.value })

    this.uploadImage = url => this.setState({ proPic: url })

    this.submitForm = ev => {
      ev.preventDefault()

      const user = this.state
      if(!user.password){
        delete user.password
      }

      this.props.onSubmitForm(user)
    }
  }

  componentWillMount(){
    this.setState({
      proPic: this.props.currentUser.proPic.endsWith('v1500289994/c6zgp0zjykx6t4uxva19.jpg') ? '' : this.props.currentUser.proPic,
      username: this.props.currentUser.username,
      bio: this.props.currentUser.bio || '',
      mobileNum: this.props.currentUser.mobileNum || ''
    })
  }

  // In case you want to stay without redirectTo '/' after successful updates.
  // componentWillReceiveProps(nextProps){
  //   if(nextProps.currentUser){
  //     this.setState({
  //       proPic: nextProps.currentUser.proPic.endsWith('v1500289994/c6zgp0zjykx6t4uxva19.jpg') ? '' : nextProps.currentUser.proPic,
  //       username: nextProps.currentUser.username,
  //       bio: nextProps.currentUser.bio || '',
  //       password: '',
  //       mobileNum: nextProps.currentUser.mobileNum || ''
  //     })
  //   }
  // }

  render(){
    return (
      <form onSubmit={this.submitForm}>
        <fieldset>
          <strong>Username:</strong>
          <fieldset className='form-group'>
            <input
              className='form-control form-control-lg'
              type='text'
              placeholder='username'
              value={this.state.username}
              onChange={this.updateState('username')} />
          </fieldset>

          <strong>Password:</strong>
          <fieldset className='form-group'>
            <input
              className='form-control form-control-lg'
              type='password'
              placeholder='New Password'
              value={this.state.password}
              onChange={this.updateState('password')} />
          </fieldset>

          <strong>Bio:</strong>
          <fieldset className='form-group'>
            <textarea
              className='form-control form-control-lg'
              rows='8'
              placeholder='Short bio about you'
              value={this.state.bio}
              onChange={this.updateState('bio')} />
          </fieldset>

          <strong>Mobile No.:</strong>
          <fieldset className='form-group'>
            <input
              className='form-control form-control-lg'
              type='tel'
              placeholder='Mobile Number'
              value={this.state.mobileNum}
              onChange={this.updateState('mobileNum')} />
          </fieldset>

          <i>Update your Profile Pic:</i>
          <ImageUpload
            image={this.state.proPic}
            changeImage={this.uploadImage} /><br />

          <button
            className='btn btn-lg btn-primary pull-xs-right'
            type='submit'
            disabled={this.props.inProgress}>
            Update Settings
          </button>
        </fieldset>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  ...state.settings,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onSubmitForm: user => dispatch({
    type: SAVE_SETTINGS,
    payload: agent.Auth.save(user)
  }),
  onClickLogout: () => dispatch({
    type: LOGOUT
  })
})

class Settings extends React.Component {
  render(){
    const currentUser = this.props.currentUser
    if(currentUser){
      return (
        <div className='settings-page'>
          <div className='container page'>
            <div className='row'>
              <div className='col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-xs-12'>

                  <div className='text-xs-center'>
                    <h1>Your Settings</h1>

                    <i className='ion-star'></i> {currentUser.yellowStars}&nbsp;&nbsp;

                    Mem {currentUser.mem}<br /><br />
                    <div className='row'>
                      <div className='offset-sm-4 col-sm-4 offset-xs-3 col-xs-6'>
                        <img
                          className='img-fluid'
                          src={currentUser.proPic}
                          alt={`${currentUser.username}'s proPic`} />
                      </div>
                    </div>
                  </div>

                  <hr />

                  <ListErrors errors={this.props.errors} />

                  <SettingsForm
                    currentUser={currentUser}
                    onSubmitForm={this.props.onSubmitForm} />

                  <hr />

                  <button
                    className='btn btn-outline-danger'
                    onClick={this.props.onClickLogout}>
                    Or click here to logout.
                  </button>

              </div>
            </div>
          </div>
        </div>
      )
    }
    return null
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)

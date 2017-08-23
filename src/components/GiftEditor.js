import React from 'react'
import { connect } from 'react-redux'

import ListErrors from './common/ListErrors'
import TagList from './common/TagList'
import ImageUpload from './common/ImageUpload'
import agent from '../agent'

import {
  GIFT_EDITOR_LOADED,
  GIFT_EDITOR_UNLOADED,
  UPDATE_FIELD_GIFT,
  ADD_TAG_GIFT,
  REMOVE_TAG_GIFT,
  SUBMIT_GIFT
} from '../constants'

const mapStateToProps = state => ({
  ...state.giftEditor
})

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({
    type: GIFT_EDITOR_LOADED,
    payload
  }),
  onUnload: () => dispatch({
    type: GIFT_EDITOR_UNLOADED
  }),
  onUpdateField: (key, value) => dispatch({
    type: UPDATE_FIELD_GIFT,
    key,
    value
  }),
  onAddTag: () => dispatch({
    type: ADD_TAG_GIFT
  }),
  onRemoveTag: tag => dispatch({
    type: REMOVE_TAG_GIFT,
    tag
  }),
  onSubmit: payload => dispatch({
    type: SUBMIT_GIFT,
    payload
  })
})

class GiftEditor extends React.Component {
  constructor(){
    super()

    this.state = {
      checked: false
    }

    this.expand = () => this.setState({
      checked: !this.state.checked
    })

    const updateFieldEvent = key => ev => this.props.onUpdateField(key, ev.target.value)
    this.changeText = ev => updateFieldEvent('text')
    this.changeReceiver = ev => updateFieldEvent('receiver')
    this.changeExpireAt = ev => updateFieldEvent('expireAt')
    this.changeAccess = ev => updateFieldEvent('access')
    this.changeTagInput = ev => updateFieldEvent('tagInput')
    this.changeImage = url => this.props.onUpdateField('image', url)

    this.watchForEnter = ev => {
      if(ev.keyCode === 13 && ['personal', 'public', 'openpublic', ''].indexOf(this.props.tagInput.toLowerCase()) === -1){
        ev.preventDefault()
        this.props.onAddTag()
      }
    }

    this.removeTag = tag => ev => {
      ev.preventDefault()
      this.props.onRemoveTag(tag)
    }

    this.submitForm = ev => {
      ev.preventDefault()

      let gift
      if(this.props.receiver){
        gift = {
          tag_list: [this.props.access].concat(this.props.tagList),
          text: this.props.text,
          image: this.props.image,
          expire_at: this.props.expireAt,
          receiver: { username: this.props.receiver }
        }
      }else{
        gift = {
          tag_list: [this.props.access].concat(this.props.tagList),
          text: this.props.text,
          image: this.props.image,
          expire_at: this.props.expireAt
        }
      }

      const giftId = this.props.giftId
      const payload = giftId ?
        agent.Gifts.update(Object.assign(gift, { giftId })):
        agent.Gifts.create(gift)

      this.props.onSubmit(payload)
    }
  }

  componentWillMount(){
    if(this.props.params.giftId){
      this.props.onLoad(agent.Gifts.get(this.props.params.giftId))
      this.setState({ checked: true })
    }
  }

  componentWillReceiverProps(nextProps){
    if(this.props.params.giftId !== nextProps.params.giftId){
      this.props.onUnload()
      this.setState({ checked: false })
      if(nextProps.params.giftId){
        this.setState({ checked: true })
        this.props.onLoad(agent.Gifts.get(this.props.params.giftId))
      }
    }
  }

  componentWillUnmount(){
    this.props.onUnload()
  }

  render(){
    return (
      <div className='editor-page'>
        <div className='container page'>
          <div className='row'>
            <div className='col-md-10 offset-md-1 col-xs-12'>

              <ListErrors errors={this.props.error} />

              <form>
                <fieldset>
                  <fieldset className='form-group'>
                    <textarea
                      className='form-control form-control-lg'
                      rows='5'
                      placeholder='What could this gift offer'
                      value={this.props.text}
                      onChange={this.changeText} />
                  </fieldset>

                  <label htmlFor='toggle'>
                    <i>Optional:</i> Set its receiver
                  </label>
                  &nbsp;&nbsp;
                  <input
                    id='toggle'
                    type='checkbox'
                    checked={this.state.checked}
                    onChange={this.expand} />

                  <div id='expand'>
                    <div>
                      <i>Notes:</i>
                      <p>- If it's your username, it hasn't been sent yet, </p>
                      <p>- Please ensure the username is <strong>spelt right</strong>.</p>
                    </div>
                    <fieldset className='form-group'>
                      <strong>Receiver:</strong>
                      <input
                        className='form-control form-control-lg'
                        type='text'
                        value={this.props.receiver}
                        onChange={this.changeReceiver} />
                    </fieldset>
                  </div>


                  <fieldset className='form-group'>
                    <strong>Available before:</strong>
                    <input
                      className='form-control form-control-lg'
                      type='datetime-local'
                      value={this.props.expireAt}
                      onChange={this.changeExpireAt} />
                  </fieldset>

                  <strong>Tags:</strong>
                  <div className='row'>
                    <div className='col-md-3 col-xs-12'>
                      <fieldset className='form-control form-control-label radio'>
                        <label>
                          <input
                            type='radio'
                            value='personal'
                            checked={this.props.access === 'personal'}
                            onChange={this.changeAccess} /> personal
                        </label><br />
                        <label>
                          <input
                            type='radio'
                            value='public'
                            checked={this.props.access === 'public'}
                            onChange={this.changeAccess} /> public
                        </label><br />
                      </fieldset>
                      <div className='tag-list'>
                        <span className='tag-default tag-pill tag-info'>
                          {this.props.access}
                        </span>
                      </div>
                    </div>

                    <div className='col-md-9 col-xs-12'>
                      <fieldset className='form-group'>
                        <input
                          className='form-control form-control-lg'
                          rows='2'
                          placeholder='Enter tags. Suggest one from &#39;giveOrLend&#39;, &#39;delivering&#39; & &#39;know&#39;(knowledge)'
                          // except status tags, e.g. personal, public, openPublic
                          value={this.props.tagInput}
                          onChange={this.changeTagInput}
                          onKeyUp={this.watchForEnter} />

                        <TagList unit={this.props} removeTag={this.removeTag} />
                      </fieldset>
                    </div>
                  </div>

                  <strong>Image:</strong>
                  <div className='row'>
                    <div className='col-xs-12'>
                      <ImageUpload
                        image={this.props.image}
                        changeImage={this.changeImage} />
                    </div>
                  </div>

                  <button
                    className='btn btn-lg pull-xs-right btn-primary'
                    type='button'
                    onClick={this.submitForm}
                    disabled={this.props.inProgress}>
                    { this.props.giftId ? 'Update' : 'Post' } Gift
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

export default connect(mapStateToProps, mapDispatchToProps)(GiftEditor)

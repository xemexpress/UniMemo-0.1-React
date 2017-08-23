import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import ListErrors from '../ListErrors'
import agent from '../../../agent'

import {
  UPDATE_COMMENT,
  DELETE_COMMENT
} from '../../../constants'

const CommentActions = props => {
  if(props.show){
    return (
      <span className='mod-options'>
        {/* Delete Button */}
        <i className='ion-trash-a' onClick={props.del}></i>&nbsp;

        {/* Update-Submit Button */}
        {
          props.canEdit ?
          <button
            className='btn btn-sm btn-primary'
            onClick={props.updateComment}>
            Update Comment
          </button>
          :
          <span className='mod-options'>
            <i className='ion-edit' onClick={props.enableEdit}></i>
          </span>
        }
      </span>
    )
  }
  return null
}

const mapDispatchToProps = dispatch => ({
  onDel: (payload, commentId) => dispatch({
    type: DELETE_COMMENT,
    payload,
    commentId
  }),
  onUpdate: payload => dispatch({
    type: UPDATE_COMMENT,
    payload
  })
})

class Comment extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      canEdit: false,
      body: props.comment.body
    }

    this.enableEdit = ev => {
      ev.preventDefault()
      this.setState({
        canEdit: true
      })
    }

    this.setBody = ev => this.setState({
      body: ev.target.value
    })

    this.updateComment = ev => {
      ev.preventDefault()
      const payload = agent.Comments.update(
        this.props.requestId,
        this.props.comment.id,
        { body: this.state.body }
      )
      this.props.onUpdate(payload)
      this.setState({
        canEdit: false
      })
    }

    this.del = ev => {
      ev.preventDefault()
      const payload = agent.Comments.delete(this.props.requestId, this.props.comment.id)
      this.props.onDel(payload, this.props.comment.id)
    }
  }

  render(){
    const comment = this.props.comment
    const show = this.props.currentUser.username === comment.author.username

    return (
      <div className='card'>
        <div className='card-block'>
          <div className='card-text'>
            <ListErrors errors={this.props.errors} />
            {
              this.state.canEdit ?
              <textarea
                className='form-control'
                placeholder='Update Comment...'
                rows='3'
                value={this.state.body}
                onChange={this.setBody} />
              : comment.body
            }
          </div>
        </div>

        <div className='card-footer'>
          <Link
            className='comment-author'
            to={`@${comment.author.username}`}>
            <img
              className='comment-author-img'
              src={comment.author.proPic}
              alt={comment.author.username} />
          </Link>&nbsp;

          <Link
            className='comment-author'
            to={`@${comment.author.username}`}>
            {comment.author.username}
          </Link>&nbsp;

          <span className='date-posted'>
            {new Date(comment.createdAt).toDateString()}
          </span>

          <CommentActions
            show={show}
            canEdit={this.state.canEdit}
            del={this.del}
            enableEdit={this.enableEdit}
            updateComment={this.updateComment} />
        </div>

      </div>
    )
  }
}

export default connect(()=>({}), mapDispatchToProps)(Comment)

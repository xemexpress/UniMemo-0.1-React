import React from 'react'

import CommentList from './CommentList'
import CommentInput from './CommentInput'

class CommentContainer extends React.Component {
  constructor(){
    super()
    this.state = {
      hidden: true
    }

    this.showComments = ev => {
      ev.preventDefault()
      this.setState({ hidden: !this.state.hidden})
    }
  }

  render(){
    return (
      <div className='col-xs-12 col-md-8 offset-md-2'>
        <CommentInput
          errors={this.props.commentErrors}
          requestId={this.props.requestId}
          currentUser={this.props.currentUser} />

        {
          !this.state.hidden ?
          <CommentList
            errors={this.props.updateErrors}
            comments={this.props.comments}
            requestId={this.props.requestId}
            currentUser={this.props.currentUser} />
          : this.props.comments.length === 0 ?
          <div className='card text-xs-center article-preview'>
            <a className='text-success'>No responses...yet</a>
          </div>
          :
          <div className='card text-xs-center article-preview'>
            <a className='text-success' onClick={this.showComments}>Show all responses</a>
          </div>

        }
      </div>
    )
  }
}

export default CommentContainer

import React from 'react'

class HelperList extends React.Component {
  constructor(props){
    super(props)

    this.onHelperConfirm = helper => ev => {
      ev.preventDefault()
      this.props.onHelperConfirm(this.props.request.requestId, helper.username)
    }

  }

  componentWillMount(){
    if(this.props.posterName === this.props.currentUserName){
      this.props.onHelperLoad(this.props.request.requestId)
    }
  }

  render(){
    const helpers = this.props.helpers
    const request = this.props.request

    if(!helpers){
      return null
    }

    if(request.helper.username === this.props.currentUserName){

      if(helpers.length === 0){
        return (
          <div className='article-meta'>
            No helpers are here... yet
          </div>
        )
      }

      return (
        <div className='article-meta'>
          Helpers:&nbsp;
          {
            helpers.map(helper => {
              return (
                <div className='helper' key={helper.username}>
                  <img src={helper.proPic} alt={helper.username} />&nbsp;
                  {helper.username}
                  <button
                    className='btn btn-sm pull-xs-right btn-primary confirmButton'
                    type='button'
                    onClick={this.onHelperConfirm(helper)}>
                    Confirm
                  </button>
                </div>
              )
            })
          }
        </div>
      )
    }else{
      return (
        <div className='article-meta'>
          Helper confirmed:&nbsp;&nbsp;&nbsp;
          <img src={request.helper.proPic} alt={request.helper.username} />&nbsp;
          {request.helper.username}&nbsp;&nbsp;
        </div>
      )
    }
  }
}

export default HelperList

import React from 'react'

const ReceiverList = props => {
  const receiver = props.gift.receiver
  return (
    <div className='article-meta'>
      Receiver:&nbsp;
      {
        receiver.username === props.gift.provider.username ?
        <i>No one take it from the provider... yet:)</i>
        :
        <div>
          <img className='user-img' src={receiver.proPic} alt={receiver.username} />&nbsp;&nbsp;
          {receiver.username}
          {
            receiver.username === props.currentUser.username ?
            '. You\'re the receiver'
            : null
          }
        </div>
      }
    </div>
  )
}

export default ReceiverList

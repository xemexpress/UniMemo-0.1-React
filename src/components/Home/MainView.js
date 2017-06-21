import React from 'react'
import { connect } from 'react-redux'

import { CollectionTab, GlobalFeedTab, TagTab } from './RequestTabs'
import { ProvideTab, ReceiveTab } from './GiftTabs'
import UnitsList from '../common/UnitsList'
import agent from '../../agent'

import {
  CHANGE_TAB,
  TOGGLE_TYPES,
  SET_PAGE
} from '../../constants/actionTypes'

const mapStateToProps = state => ({
  ...state.contentList,
  currentUser: state.common.currentUser
})

const mapDispatchToProps = dispatch => ({
  onTabClick: (tab, payload) => dispatch({
    type: CHANGE_TAB,
    tab,
    payload
  }),
  onToggle: payload => dispatch({
    type: TOGGLE_TYPES,
    payload
  }),
  onSetPage: (page, payload) => dispatch({
    type: SET_PAGE,
    page,
    payload
  })
})

class MainView extends React.Component {
  constructor(){
    super()

    this.state = {
      loadRequest: true
    }

    this.handleToggle = () => {
      if(this.state.loadRequest){
        this.props.onToggle(agent.Tags.getGifts())
        this.props.onTabClick(
          'provide-sent',
          agent.Gifts.providedBy(this.props.currentUser.username, 'sent')
        )
      }else{
        this.props.onToggle(agent.Tags.getRequests())
        this.props.onTabClick(
          'collect',
          agent.Requests.collect()
        )
      }
      this.setState({loadRequest: !this.state.loadRequest})
    }
  }

  onSetPage(page){
    const tab = this.props.tab, tag = this.props.tag

    let payload
    if(this.state.loadRequest){
      payload = tab === 'all' ? agent.Requests.all(page) :
        tag ? agent.Requests.byTag(tag, page) :
        agent.Requests.collect(page)
    }else{
      payload = tab.startsWith('provide') ? agent.Gifts.providedBy(this.props.currentUser.username, tab.slice(8) ,page) :
        tag ? agent.Gifts.byTag(tag, page) :
        agent.Gifts.receivedBy(this.props.currentUser.username, tab.slice(8) ,page)
    }

    this.props.onSetPage(page, payload)
  }

  render(){
    const onSetPage = page => this.onSetPage(page)
    const currentUser = this.props.currentUser

    return (
      <div className='col-md-9'>

        <div className='feed-toggle'>
          <ul className='nav nav-pills outline-active'>

            {
              this.state.loadRequest ?
              <span>
                <CollectionTab
                  currentUser={currentUser}
                  tab={this.props.tab}
                  onTabClick={this.props.onTabClick} />

                <GlobalFeedTab
                  tab={this.props.tab}
                  onTabClick={this.props.onTabClick} />
              </span>
              :
              <span>
                <ProvideTab
                  currentUser={currentUser}
                  tab={this.props.tab}
                  onTabClick={this.props.onTabClick} />
                <ReceiveTab
                  currentUser={currentUser}
                  tab={this.props.tab}
                  onTabClick={this.props.onTabClick} />
              </span>
            }

            <TagTab tag={this.props.tag} />

            {
              currentUser ?
              <label className="switch pull-xs-right">
                <input type="checkbox" onChange={this.handleToggle} checked={this.state.loadRequest}/>
                <div className="slider round"></div>
              </label>
              : null
            }

          </ul>
        </div>

        <UnitsList
          requests={this.props.requests}
          requestsCount={this.props.requestsCount}
          gifts={this.props.gifts}
          giftsCount={this.props.giftsCount}
          currentPage={this.props.currentPage}
          onSetPage={onSetPage} />

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView)

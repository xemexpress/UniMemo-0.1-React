import React from 'react'
import { connect } from 'react-redux'

import Banner from './Banner'
import MainView from './MainView'
import Tags from './Tags'
import agent from '../../agent'

import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER
} from '../../constants/actionTypes'

const mapStateToProps = state => ({
  ...state.home,
  token: state.common.token
})

const mapDispatchToProps = dispatch => ({
  onLoad: (tab, payload) => dispatch({
    type: HOME_PAGE_LOADED,
    payload,
    tab
  }),
  onUnload: () => dispatch({
    type: HOME_PAGE_UNLOADED
  }),
  onClickTag: (tag, payload) => dispatch({
    type: APPLY_TAG_FILTER,
    tag,
    payload
  })
})

class Home extends React.Component {
  componentWillMount(){
    if(this.props.token){
      const tab = this.props.token ? 'collect' : 'all'
      const requestsPromise = this.props.token ?
        agent.Requests.collect() : agent.Requests.all()

      this.props.onLoad(tab, Promise.all([agent.Tags.getRequests(), requestsPromise]))
    }
  }

  componentWillUnmount(){
    this.props.onUnload()
  }

  render(){
    if(this.props.token){
      return (
        <div className='home-page'>

          <Banner />

          <div className='container page'>
            <div className='row'>
              <MainView />

              <div className='col-sm-3'>
                <div className='sidebar'>
                  <p>Popular Tags</p>

                  <Tags
                    tagType={this.props.tagType}
                    tags={this.props.tags}
                    onClickTag={this.props.onClickTag} />
                </div>
              </div>
            </div>
          </div>

        </div>
      )
    }
    return (
      <div className='home-page'>
        <Banner />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

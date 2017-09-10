import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

class Statement extends React.Component {
  componentDidUpdate(){
    ReactDOM.findDOMNode(this).scrollIntoView()
  }

  render(){
    return (
      <p className={this.props.page}>{this.props.statement}</p>
    )
  }
}

const mapStateToProps = state => ({
  appName: state.common.appName,
  statement: state.common.statement,
  currentPage: state.contentList.currentPage,
  token: state.common.token
})

const Banner = props => {
  const bannerClasses = props.token ? 'banner' : 'banner full-screen'
  const containerClasses = props.token ? 'container' : 'container center'
  return (
    <div className={bannerClasses}>
      <div className={containerClasses}>
        <h1 className='logo-font'>
          {props.appName}
        </h1>
        <Statement statement={props.statement} page={props.currentPage}/>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, ()=>({}))(Banner)

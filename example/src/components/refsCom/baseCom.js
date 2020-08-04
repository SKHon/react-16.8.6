import React from 'react'

export default class BaseCom extends React.Component {
  render() {
    //console.log(this.props)
    return <div ref={this.props.forwardRef}>my is baseCom </div>
  }
}
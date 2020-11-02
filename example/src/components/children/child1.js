import React from 'react'

export default class Child1 extends React.Component {

  render() {
    console.log(this.props.children)
    return (
      <div>我是Child1</div>
    )
  }

}
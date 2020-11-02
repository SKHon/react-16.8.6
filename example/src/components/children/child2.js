import React from 'react'

export default class Child2 extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      content: '我是Child2'
    }
  }

  changeContent =() => {
    this.setState({
      content: '改变之后的Child2 第一次'
    })
    this.setState({
      content: '改变之后的Child2 第二次'
    })
    this.setState({
      content: '改变之后的Child2 第三次'
    })
  }

  render() {
    
    return (
      <div>{this.state.content} <button onClick={this.changeContent}>改变child2内容</button></div>
    )
  }

}
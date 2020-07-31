import React from 'react'
import { unstable_batchedUpdates as batchedUpdates } from 'react-dom'

export default class BatchedUpdateCom extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      number: 0
    }
  }

  handler = () => {
    // 情况1: 直接调用
    //this.change()

    // 情况2: 放在setTimeout里调用
    // setTimeout(() => {
    //   this.change()
    // }, 0)

    // 情况3: 在setTimeout里，用batchedUpdates调用
    setTimeout(() => {
      batchedUpdates(() => this.change())
    }, 0)
  }

  change = () => {
    const num = this.state.number
    this.setState({
      number: num + 1
    })
    console.log(this.state.number)

    this.setState({
      number: num + 2
    })
    console.log(this.state.number)

    this.setState({
      number: num + 3
    })
    console.log(this.state.number)
  }

  render() {
    return <button onClick={this.handler}> {this.state.number} </button>
  }
}
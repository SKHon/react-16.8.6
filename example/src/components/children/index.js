import React from 'react'
import Father from './father'
import Child1 from './child1'
import Child2 from './child2'
export default class ChildrenCom extends React.Component {

  render() {
    return <Father name='ljh'>
      <Child1 >
         <div>my is child1 01</div>
         <div>my is child1 02</div>
      </Child1>
      <Child2 />
      <div >111</div>
    </Father>
  }

}
import React from 'react'
import FancyButton from './fancyButton'
import HOC from './hoc'
const myRef = React.createRef()
export default class LazyCom extends React.Component {
 
  componentDidMount = () => {
    console.log('myRef.current:',myRef.current)
  }
  render() {
    return (
      <div>
        {/* <FancyButton ref={myRef}>this is btn</FancyButton> */}
        <HOC label='hoc' ref={myRef}/>
      </div>
    )
  }
}

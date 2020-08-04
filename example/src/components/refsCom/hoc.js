import React from 'react'
import BaseCom from './baseCom'
let ref = React.createRef()
let myHOC = (WrappedComponent) => React.forwardRef((props, ref) => <WrappedComponent {...props} forwardRef={ref}/>)
  // class MyButton extends React.Component {
    
  //   render() {
  //     console.log('hoc props:', this.props)
  //     return (
  //       // <WrappedComponent {...this.props} name='ljh' ref={this.props.forwardRef}/>
  //       React.forwardRef((props, ref) => <WrappedComponent {...props} name='ljh' forwardRef={ref}/>)
  //     )
  //     // return (
  //     //   React.forwardRef((props, ref) => <WrappedComponent {...props} forwardRef={ref}/>)
  //     // )
  //   }
  // }

  

  
export default myHOC(BaseCom)
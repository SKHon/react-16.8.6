import React from 'react'
const ref = React.createRef()
// export default class FancyButton extends React.Component {

//   constructor(props) {
//     super(props);
//     this.btnRef = React.createRef();
//   }

//   componentDidMount = () => {
//     console.log(this.btnRef.current)
//   }
//   render() {
//     return (
//       <button ref={this.btnRef}  className="FancyButton">
//         {this.props.children}
//       </button>
//     );
//   }
// }

const FancyButton = React.forwardRef((props, ref) => (
  <div>
    <button ref={ref}>
      {props.children} 
    </button>
    
  </div>
  
))
export default FancyButton
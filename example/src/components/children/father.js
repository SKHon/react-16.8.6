import React from 'react'

// export default class Father extends React.Component {

//   render() {
//     console.log(this)
//     let count = React.Children.count(this.props.children)
//     console.log(count)
//     return <>
//       {this.props.children}
//     </>
//   }

// }
export default function Father(props) {
  // React.Children.forEach(props.children, (node, context) => console.log(node, context) )
  
    return <>
    {React.Children.map(props.children, c => [[c,c]])}
      {/* {props.children} */}
    </>
}
import React from 'react'

export default class FragmentCom extends React.Component {
 
  render() {
    console.log(this.props)
    return (
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    )
  }
}

FragmentCom.defaultProps = {
  name: 'ljh2'
}



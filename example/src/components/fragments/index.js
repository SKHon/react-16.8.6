import React from 'react'
import Columns from './fragment'
export default class FragmentCom extends React.Component {
 
  render() {
    return (
      <table border="1">
        <tbody>
          <tr >
            <Columns />
          </tr>
        </tbody>
    </table>
    )
  }
}




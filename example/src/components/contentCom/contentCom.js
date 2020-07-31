import React from '@/react'
import { AppConsumer , AppContext} from '../App'

export default class ContentCom extends React.Component {
 
  
  render() {
    //console.log(AppConsumer)
    return (
      <div>
       <AppConsumer>
         {(value) => <Children name={value}/> }
       </AppConsumer>
       <Children2 />
       </div>
    )
  }
}

function Children (props) {
  console.log(props)
  return <div>Children</div>
}

class Children2 extends React.Component {
  render() {
    console.log(this.context)
    return <div> Children2 </div>
  }
}
Children2.contextType = AppContext
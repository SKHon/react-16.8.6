import React, {useContext} from 'react'
const MyContext = React.createContext()
export default function Example() {
  
  return <div>
    <MyContext.Provider value='ljh'>
      <Com1 />
    </MyContext.Provider>
  </div>
}

function Com1(props) {
  return <Com2 />
}

function Com2(props) {
  const value = useContext(MyContext)
  console.log(value)
  return <div>com2</div>

}
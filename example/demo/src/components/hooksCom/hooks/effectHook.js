import React, {useState, useEffect} from 'react'

export default function Example() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log(count)
  })
  return <div>
    <p>const is {count}</p>
    <button onClick={() => setCount(count+1)}>改变count</button>
  </div>
}
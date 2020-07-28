import React, {useState} from 'react'

export default function Example() {
  const [count] = useState(0)
  return <div>
    <p>const is {count}</p>
  </div>
}
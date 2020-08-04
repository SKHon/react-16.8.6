import React, {Suspense} from 'react'
// import LazyButton from './lazyButton'
const LazyButton = React.lazy(() => import('./lazyButton'))
export default class LazyCom extends React.Component {
 
  render() {
    return (
      <div>
        <p>this is wrapper</p>
        <Suspense fallback={<div>Loading...</div>}>
          <LazyButton />
        </Suspense>
      </div>
    )
  }
}
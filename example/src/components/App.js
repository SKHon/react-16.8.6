



import React, { Component , Suspense} from 'react';
import HooksCom from './hooksCom'
import BatchedUpdataCom from './batchedUpdate'
import LazyCom from './lazyComponent'
class App extends Component {
  
  
  render() {
   
    return (
      <div>
        {/* <BatchedUpdataCom />  */}
          {/* <HooksCom /> */}
          <LazyCom />
      </div>
    );
  }
}

export default App;

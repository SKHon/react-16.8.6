



import React, { Component , Suspense} from 'react';
import HooksCom from './hooksCom'
import BatchedUpdataCom from './batchedUpdate'
import LazyCom from './lazyComponent'
import RefsCom from './refsCom'
import FragmentCom from './fragments'
class App extends Component {
  render() {
    return (
      <div>
        {/* <BatchedUpdataCom />  */}
          {/* <HooksCom /> */}
          {/* <LazyCom /> */}
          {/* <RefsCom /> */}
          <FragmentCom />
      </div>
    );
  }
}

export default App;

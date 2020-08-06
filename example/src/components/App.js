



import React, { Component , Suspense} from 'react';
import HooksCom from './hooksCom'
import BatchedUpdataCom from './batchedUpdate'
import LazyCom from './lazyComponent'
import RefsCom from './refsCom'
import FragmentCom from './fragments'
import ChrildrenCom from './children'
class App extends Component {
  render() {
    return (
      <div>
        {/* <BatchedUpdataCom />  */}
          {/* <HooksCom /> */}
          {/* <LazyCom /> */}
          {/* <RefsCom /> */}
          {/* <FragmentCom /> */}
          <ChrildrenCom />
      </div>
    );
  }
}

export default App;

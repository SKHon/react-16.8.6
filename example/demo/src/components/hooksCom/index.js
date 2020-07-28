
import React from 'react'
import StateHookCom from './hooks/stateHook'
import EffctHookCom from './hooks/effectHook'
import ContextHookCom from './hooks/contextHook'
export default function HooksCom () {
  console.log('---')
  return (
    <div>
      ---
      <StateHookCom />
      ---
      <EffctHookCom />
      ---
      <ContextHookCom />
    </div>
  )
}
import React from 'react'
import counterReducer from './reducer'
import { configureStore } from '@reduxjs/toolkit'
import ReactDOM from 'react-dom/client'

const store = configureStore({
  reducer: counterReducer
})

function App() {

  return (
    <div>
      <button onClick={e => store.dispatch({ type: 'GOOD' })}>good</button>
      <button onClick={e => store.dispatch({ type: 'OK' })}>ok</button>
      <button onClick={e => store.dispatch({ type: 'BAD' })}>bad</button>
      <button onClick={e => store.dispatch({ type: 'ZERO' })}>reset stats</button>
      <ol style={{'listStyle': 'none'}}>
        <li>
          Good: {store.getState().good}
        </li>
        <li>
          Ok: {store.getState().ok}
        </li>
        <li>
          Bad: {store.getState().bad}
        </li>
      </ol>
      
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
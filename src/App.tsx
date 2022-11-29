import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Router from './router'

function App() {

  return (
    <BrowserRouter>
      <Router />
  </BrowserRouter>
  )
}

export default App

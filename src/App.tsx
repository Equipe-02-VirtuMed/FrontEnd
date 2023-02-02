import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Router from './router'
import { UserProvider } from './context/UserContext'

function App() {

  return (
    <UserProvider>
    <BrowserRouter>
        <Router />
  </BrowserRouter>
  </UserProvider>
  )
}

export default App

import React from 'react'
import { Route, Switch } from 'react-router-dom'

// components
import Home from './Home'
import About from './About'
import Error from './Error'
import Navbar from './Navbar'


export default function App() {  
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/about' component={About} />
        <Route component={Error} />
      </Switch>
    </div>
  )
}
import React from 'react'
import { BrowserRouter,Route,Switch } from 'react-router-dom'
import CourseIndex from './components/common/Course/CourseIndex'
import Home from './components/common/Home'
import Nav from './components/common/Nav'
import Register from './components/auth/Register'

function App() {

  return (
    <>
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/courses" component={CourseIndex} />
          <Route path="/register" component={Register} />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App

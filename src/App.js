import React from 'react'
import { BrowserRouter,Route,Switch } from 'react-router-dom'
import CourseIndex from './components/common/Course/CourseIndex'
import Home from './components/common/Home'
import Nav from './components/common/Nav'

function App() {

  return (
    <>
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/courses" component={CourseIndex} />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App

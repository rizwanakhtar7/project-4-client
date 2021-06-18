import React from 'react'
import { BrowserRouter,Route,Switch } from 'react-router-dom'
import CourseIndex from './components/common/Course/CourseIndex'
import CourseShow from './components/common/Course/CourseShow'
import Home from './components/common/Home'
import LessonShow from './components/common/Lesson/LessonShow'
import Nav from './components/common/Nav'
import Quiz from './components/common/Quiz'
import Register from './components/auth/Register'

function App() {

  return (
    <>
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/courses/:courseId" component={CourseShow} />
          <Route path="/courses" component={CourseIndex} />
          <Route path="/lessons/1" component={LessonShow} />
          <Route path="/quiz" component={Quiz} />
          <Route path="/register" component={Register} />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App

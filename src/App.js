import React from 'react'
import { BrowserRouter,Route,Switch } from 'react-router-dom'
import CourseIndex from './components/common/Course/CourseIndex'
import CourseShow from './components/common/Course/CourseShow'
import CourseNew from './components/common/Course/CourseNew'
import Home from './components/common/Home'
import LessonShow from './components/common/Lesson/LessonShow'
import Nav from './components/common/Nav'
import Dashboard from './components/common/Dashboard'
import Quiz from './components/common/Quiz'
import Register from './components/auth/Register'
import ImageUpload from './components/common/ImageUpload'

function App() {

  return (
    <>
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/courses/new" component={CourseNew} />
          <Route path="/courses/:courseId/lessons/:lessonId" component={LessonShow} />
          <Route path="/courses/:courseId" component={CourseShow} />
          <Route path="/courses" component={CourseIndex} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/quiz" component={Quiz} />
          <Route path="/register" component={Register} />
          <Route path="/upload" component={ImageUpload} />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App

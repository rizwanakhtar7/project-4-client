import React from 'react'

import { Link, useParams } from 'react-router-dom'
import { getSingleCourse } from '../../../lib/api'

function LessonCard({ id, title }) {
  const { courseId,lessonId } = useParams()
  const [course, setCourse] = React.useState(null)

  React.useEffect(() => {
    const getSingleCourseData = async () => {
      try {
        const res = await getSingleCourse(courseId)
        setCourse(res.data)
      } catch (e) {
        console.log(e)
      }
    }
    getSingleCourseData()
  }, [courseId,lessonId])

  course && console.log(course.lessons)

  return (
    <>
      <h1>Lessons on this Course:</h1>
      {course && course.lessons.map(lesson => (
        <div key={lesson.id}>
          <h2>{title}</h2>
          <p>LESSON DETAIL </p>
          <Link to={`/courses/${courseId}/lessons/${lesson.id}`} ><h3>View Lesson</h3></Link>
          <hr />
        </div>
      ))}
    </>
  )
}

export default LessonCard
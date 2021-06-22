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


  return (
    <>
        <div key={id}>
          <h2>{title}</h2>
          <p>LESSON DETAIL </p>
          <Link to={`/courses/${courseId}/lessons/${id}`} ><h3>View Lesson</h3></Link>
          <hr />
        </div>
    </>
  )
}

export default LessonCard
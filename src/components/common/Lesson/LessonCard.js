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

  course && console.log(course)

  return (
    <>
      <h1>Lessons on this Course:</h1>
      <div>
        <h4>
          {course && course.lessons.map(lesson => (
            <>

                <div key={lesson.id}>
                    <h3>{title}</h3>
                    <p>LESSON DETAIL </p>
                    <Link to={`/courses/${courseId}/lessons/${lesson.id}`} ><h3>View Lesson</h3></Link>

                </div>
                <hr />

            </>
          ))}
        </h4>
       
      </div>
    </>
   
   
  )
}

export default LessonCard
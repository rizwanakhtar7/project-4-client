import React from 'react'

import { useParams } from 'react-router-dom'
import { getSingleCourse } from '../../../lib/api'
import LessonCard from '../Lesson/LessonCard'

function CourseShow() {
  const { courseId } = useParams()
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
  }, [courseId])

  course && console.log(course.lessons)

  return (
    <>
        <h4>
          {course && course.lessons.map(lesson => <LessonCard key={lesson.id} {...lesson} /> )}
        </h4>
  
    </>
  )
}

export default CourseShow
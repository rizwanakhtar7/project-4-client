import React from 'react'
import axios from 'axios'
import CourseCard from './CourseCard'

function CourseIndex() {
  const [courses, setCourses] = React.useState([])


  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/courses') 
        setCourses(data)
        console.log(data)
      } catch(e) {
        console.log(e)
      }
     
    }
    getData()
  },[])

  return (
    <div className="course-container">
      <div>
        <div className="container-for-courses">
          {courses.map(course => <CourseCard key={course._id} {...course} /> )}
        </div>
      </div>
    </div>
  )
}

export default CourseIndex

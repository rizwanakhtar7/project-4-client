import React from 'react'
import axios from 'axios'
import CourseCard from './CourseCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function CourseIndex() {
  const [courses, setCourses] = React.useState([])
  const [averageStars, setAverageStars] = React.useState([])


  const handleSearch = async (e) => {
    try {
      const { data } = await axios.get(`/api/courses/?search=${e.target.value}`) 
      setCourses(data)
      // console.log(data)

    } catch(e) {
      console.log(e)
    }
  }

  //TESTING AVERAGE STAR RATING 
  React.useEffect(() => {
    const getUserRatings = async () => {
      try {
        const res = await axios.get(`/api/courses/2/ratings/`)
        setAverageStars(res.data)
        console.log(res)
      } catch (e) {
        console.log(e)
      }
    }
    getUserRatings()
  },[])


  React.useEffect(() => {
    const getData = async (e) => {
      try {
        const { data } = await axios.get(`/api/courses/`) 
        setCourses(data)
        console.log(data)
      } catch(e) {
        console.log(e)
      }
     
    }
    getData()
  },[])

  return (
    <>
      <div className="margin-top-spacer">

      </div>
      <div>
        <FontAwesomeIcon icon={faSearch} />
        <input onChange={handleSearch} placeholder="Search.." />
      </div>

      <div className="main-container">
        <div className="course-container">
          {courses.map(course => <CourseCard key={course._id} {...course} /> )}
        </div>
      </div>
      
       
    </>
  )
}

export default CourseIndex

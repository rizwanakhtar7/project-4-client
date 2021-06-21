import React from 'react'
import axios from 'axios'
import CourseCard from './CourseCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faSearch } from '@fortawesome/free-solid-svg-icons'
import { isAuthenticated } from '../../../lib/auth'
import { Link } from 'react-router-dom'

function CourseIndex() {
  const [courses, setCourses] = React.useState([])
  const [averageStars, setAverageStars] = React.useState([])
  const isLoggedIn = isAuthenticated()
  // const [selectedSubjects, setSelectedSubjects] = React.useState([])


  //function to filter down by subject categories when user clicks on button
  // const filteredSubjects = courses?.filter(course => {
  //   if (!selectedSubjects.length) {
  //     return true
  //   }
  
  //   return selectedSubjects.every(selectedSubject => course.subject.map(s => s).includes(selectedSubject) )
    
  // })
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
  // React.useEffect(() => {
  //   const getUserRatings = async () => {
  //     try {
  //       const res = await axios.get(`/api/courses/2/ratings/`)
  //       setAverageStars(res.data)
  //       console.log(res)
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   }
  //   getUserRatings()
  // },[])
  // console.log(courses.subject.map(subject => subject))
  courses.map(course => console.log(course.subject))

  React.useEffect(() => {
    const getData = async (e) => {
      try {
        const { data } = await axios.get(`/api/courses/`) 
        setCourses(data)
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
      <div>
       
      </div>

      <div className="main-container">
        <div className="course-container">
          {courses.map(course => <CourseCard key={course._id} {...course} /> )}
        </div>
        { isLoggedIn && (
        <>
        <Link to ={`/courses/new`} >
          <div className="add-course-section">
            <FontAwesomeIcon className="fa-items-plusicon" icon={faPlusCircle} /> 
            <span>Add Courses</span>
          </div>
        </Link>
         
        </>
        )} 
      </div>
      
       
    </>
  )
}

export default CourseIndex

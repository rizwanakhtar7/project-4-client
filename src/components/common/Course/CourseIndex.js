import React from 'react'
import axios from 'axios'
import CourseCard from './CourseCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faSearch } from '@fortawesome/free-solid-svg-icons'
import { isAuthenticated } from '../../../lib/auth'
import { Link } from 'react-router-dom'
import { createCourse } from '../../../lib/api'
import Spinner from '../Spinner'
import Error from '../Error'

function CourseIndex() {
  const [courses, setCourses] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const [averageStars, setAverageStars] = React.useState([])
  const isLoggedIn = isAuthenticated()
  const [selectedSubjects, setSelectedSubjects] = React.useState([])
  const subjects = ['Computing', 'Math', 'Science', 'English']
  const isLoading = !courses && !isError


  // Search bar -- Remove if not required
  // const [search, setSearch] = React.useState('')

  // const handleSearch = (e) => {
  //   setSearch(e.target.value)
  // }

  // const filteredResult = courses && courses.filter(course => {
  //   return (
  //     course.name.toLowerCase().includes(search.toLowerCase()) || 
  //     course.description.toLowerCase().includes(search.toLowerCase())
  //   )
  // })


  const handleClick = e => {
    if (selectedSubjects.includes(e.target.value)) {
      return setSelectedSubjects(selectedSubjects.filter(subject => subject !== e.target.value))
    }
    setSelectedSubjects([...selectedSubjects, e.target.value])

  }


  // function to filter down by subject categories when user clicks on button
  const filteredResult = courses?.filter(course => {
    if (!selectedSubjects.length) {
      return true
    }
    return selectedSubjects.every(selectedSubject => course.subject.includes(selectedSubject))

  })


  // TESTING AVERAGE STAR RATING 
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

  React.useEffect(() => {
    const getData = async (e) => {
      try {
        const { data } = await axios.get(`/api/courses/`)
        setCourses(data)
      } catch (err) {
        setIsError(true)
      }

    }
    setTimeout(getData, 1300)
  }, [])

  return (

  <>
  <div className="margin-top-spacer">

  </div>
      {/* <div>
        <FontAwesomeIcon icon={faSearch} />
        <input onChange={handleSearch} placeholder="Search.." />
      </div>  */}


  <div>
    {subjects.map((subject) => (
      <button
        className="subjects-btn"
        key={subject}
        value={subject}
        onClick={handleClick}
        className={`subject-btn ${selectedSubjects.includes(subject) ? 'btn-active' : ''}`}
      >
        {subject}

      </button>
    ))}
  </div>

  <div className="main-container">
    {isError && <Error />}
    {isLoading && <Spinner />}
    {courses && (
      <>

        <div className="course-container">

          {filteredResult.map(course => <CourseCard key={course._id} {...course} />)}

        </div>
      {isLoggedIn && (
        <>
          <Link to={`/courses/new`} >
            <div className="add-course-section">
              <FontAwesomeIcon className="fa-items-plusicon" icon={faPlusCircle} />
              <span>Add Courses</span>
            </div>
          </Link>
  
        </>
  
      )}
        </>

    )}


  </div>
  </>
  )
}

export default CourseIndex

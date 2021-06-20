import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Star from './Star'
import ReactStars from 'react-rating-stars-component'

const createArrayOfStars = length => [...Array(length)]



function CourseCard({ id, name, courseImage, subject, description, lessons,feedback, totalStars = 5  }) {
  const [starsSelected, setStarsSelected] = useState(0)
  const [ratingValue, setRatingValue] = useState(
    feedback?.map(rating => rating.rating)
  )
  
  // 8 3 
  const SumOfRatingsForCourse = ratingValue.reduce((totalRating, currentRating) => totalRating + parseInt(currentRating), 0) 
  const feedbackRatingArrLength = ratingValue.length === 0 ? 1 : ratingValue.length
  const averageRatingForCourse = Math.round((SumOfRatingsForCourse / feedbackRatingArrLength) * 2) / 2
  console.log(`average for this course: ${averageRatingForCourse}`)
  
  // console.log(feedback?.map(rating => rating.rating))
  // console.log(`feedback ${feedback}`)
  // console.log(`ratings: ${ratingValue} for ${id} course`)
  // console.log(`Average: ${ratingValue}`)

  return (
    <>

      <div className="individual-course-container" key={id}>
        <h2>{name}</h2>
        <h3>Course Rating : </h3>
        <ReactStars count={5} value={averageRatingForCourse} size={28} isHalf={true} edit={false} onChange={averageRatingForCourse}/>
        {/* {createArrayOfStars(totalStars).map((eachStar, i) => (<Star key={eachStar} selected={averageRatingForCourse > i} onSelect={() => setStarsSelected(i + 1)} />))} / 5.0 */}
        <figure>
          <img className="course-card-images" src={courseImage} alt={name}/>
        </figure>
        <div className="overflow-text line-clamp">
          {description}
        </div>
        <Link to ={`/courses/${id}`}><h3>Lessons</h3></Link>

        <h4>
        {lessons && lessons.slice(0,3).map(lesson => (
            <li key={lesson._id}>{lesson.title}</li>
        ))}
        </h4>

        <button>Register to unlock all lessons!</button>
        <h1>AVERAGE:{averageRatingForCourse}</h1>
      </div>
    </>
  )
}

export default CourseCard
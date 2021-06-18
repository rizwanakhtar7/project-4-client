import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Star from './Star'

const createArrayOfStars = length => [...Array(length)]


function CourseCard({ id, name, courseImage, subject, description, lessons, totalStars = 5  }) {
  const [starsSelected, setStarsSelected] = useState(0)

  return (
    <>

      <div className="individual-course-container" key={id}>
        <h2>{name}</h2>
        <h3>Course Rating : </h3>
        {createArrayOfStars(totalStars).map((eachStar, i) => (<Star key={eachStar} selected={starsSelected > i} onSelect={() => setStarsSelected(i + 1)}/>))}
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
      </div>
    </>
  )
}

export default CourseCard
import React from 'react'

function CourseCard({ _id, name, courseImage, subject, description }) {

  return (
    <>
      <div className="individual-course-container" key={_id}>
        <h2>{name}</h2>
        <figure>
          <img src={courseImage} alt={name}/>
        </figure>
        <h4>{subject}</h4>
        <div className="overflow-text line-clamp">
          {description}
        </div>
      </div>
    </>
  )
}

export default CourseCard
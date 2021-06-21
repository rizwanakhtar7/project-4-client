import { createCourse } from '../../../lib/api'
import { useForm } from '../../../hooks/useForm'

import ImageUpload from '../ImageUpload'

function CourseNew() {

  const { formData, handleChange } = useForm({
    title: '',
    description: '',
    name: '',
    subject: '',
  })

  const handleImageUpload = file => {
    handleChange({ target: { name: 'courseImage', value: file } })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      alert(`Submitting ${JSON.stringify(formData, null, 2)}`)
      await createCourse(formData)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <h1>Add A New Course Page</h1>
      <div className="container">
        <form className="container" onSubmit={handleSubmit}>
          <label htmlFor="title">Course Title:</label><br />
          <input type="text" id="title" name="title" placeholder="Course Title" value={formData.title} onChange={handleChange} /><br />

          <label htmlFor="description">Course Description:</label><br />
          <input type="text" id="description" name="description" placeholder="Course Description" value={formData.description} onChange={handleChange} /><br />
          
          <label htmlFor="courseImage">Course Image:</label><br />
          <div>
            <ImageUpload onUpload={handleImageUpload} />
          </div>
          <br />

          <label htmlFor="name">Course Name:</label><br />
          <input type="text" id="name" name="name" placeholder="Course Name" value={formData.courseName} onChange={handleChange} /><br />

          <label htmlFor="subject">Course Subject:</label><br />
          <input type="text" id="subject" name="subject" placeholder="Course Subject" value={formData.courseSubject} onChange={handleChange} /><br /><br />

          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  )

}

export default CourseNew
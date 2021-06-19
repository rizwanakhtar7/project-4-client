import { useHistory } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { registerUser } from '../../lib/api'
import ImageUpload from '../common/ImageUpload'

function Register(){
  const history = useHistory()
  // useForm returns an object. Destructure with an object
  const { formData, handleChange } = useForm({
    fullName: '',
    email: '',
    username: '',
    role: '',
    password: '',
    passwordConfirmation: '',
  })

  const handleImageUpload = file => {
    handleChange({ target: { name: 'profileImage', value: file } })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await registerUser(formData)
      history.push('/')
    } catch (err) {
      console.log(err.response)
    }
  }

  console.log('formData', formData)

  return (
    <>
    <h1>Welcome to the Register page</h1>
    <form onSubmit={handleSubmit}>
    <fieldset>
      <legend>Register</legend>
      <label htmlFor="fullName">Full Name:</label><br />
      <input type="text" id="fullName" name="fullName" placeholder="Full Name" onChange={handleChange} /><br />
      <label htmlFor="email">Email:</label><br />
      <input type="email" id="email" name="email" placeholder="email@domain.com" onChange={handleChange} /><br />
      {/* <label>Bio:</label><br />
      <input /><br /> */}
      <label htmlFor="username">Username:</label><br />
      <input type="text" id="username" name="username" placeholder="Username" onChange={handleChange} /><br />
      {/* <label htmlFor="role">Role:</label><br />
      <select name="role" onChange={handleChange}>
        <option value="LRN" selected>Learner</option>
        <option value="INS">Instructor</option>
      </select> */}

      <label htmlFor="role">Role:</label><br />
      <input type="radio" id="learner" name="role" value="LRN" onChange={handleChange} />
      <label htmlFor="learner">Learner</label><br />
      <input type="radio" id="instructor" name="role" value="INS" onChange={handleChange} />
      <label htmlFor="instructor">Instructor</label><br />
      <label htmlFor="password">Password:</label><br />
      <input type="password" id="password" name="password" placeholder="password" onChange={handleChange} /><br />
      <label htmlFor="password-confirmation">Password Confirmation:</label><br />
      <input type="password" id="passwordConfirmation" name="passwordConfirmation" placeholder="password confirmation" onChange={handleChange} /><br /><br />
      <div>
        <ImageUpload onUpload={handleImageUpload} />
      </div>
      <input type="submit" value="Submit" />
    </fieldset>
  </form>
  </>
  )
}

export default Register
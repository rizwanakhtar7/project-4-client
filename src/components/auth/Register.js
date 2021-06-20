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
    role: 'LRN',
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
      console.log(err)
    }
  }

  return (
    <>
    <h1>Welcome to the Register page</h1>
    <div className="container">
      <form className="container" onSubmit={handleSubmit}>
        <label htmlFor="fullName">Full Name:</label><br />
        <input type="text" id="fullName" name="fullName" placeholder="Full Name" onChange={handleChange} /><br />
        <label htmlFor="email">Email:</label><br />
        <input type="email" id="email" name="email" placeholder="email@domain.com" onChange={handleChange} /><br />
        {/* <label>Bio:</label><br />
        <input /><br /> */}
        <label htmlFor="username">Username:</label><br />
        <input type="text" id="username" name="username" placeholder="Username" onChange={handleChange} /><br />
        <label htmlFor="role">Account Type:</label><br />
        <div className="account-elements">
          <label htmlFor="learner">Learner</label><br />
          <input type="radio" id="learner" name="role" value="LRN" checked={formData.role === 'LRN'} onChange={handleChange} />
          <label htmlFor="instructor">Instructor</label>
          <input type="radio" id="instructor" name="role" value="INS" onChange={handleChange} />
        </div>
        <br />
        <label htmlFor="password">Password:</label><br />
        <input type="password" id="password" name="password" placeholder="password" onChange={handleChange} /><br />
        <label htmlFor="password-confirmation">Password Confirmation:</label><br />
        <input type="password" id="passwordConfirmation" name="passwordConfirmation" placeholder="password confirmation" onChange={handleChange} /><br /><br />
        <div>
          <ImageUpload onUpload={handleImageUpload} />
        </div>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  </>
  )
}

export default Register
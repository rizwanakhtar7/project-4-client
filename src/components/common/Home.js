import Hero from "./Hero"
import React from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { loginUser } from '../../lib/api'
import { setToken } from '../../lib/auth'


function Home(){
  const history = useHistory()
 // useForm returns an object. Destructure with an object
  const { formData, handleChange } = useForm({
    email: '',
    password: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await loginUser(formData)
      setToken(res.data.token)
      history.push('/courses')
    } catch (err) {
      console.log(err)
    }

  }

  return (
    <>
    <Hero />
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Login</legend>
        <label htmlFor="email">Email:</label><br />
        <input type="email" id="email" name="email" placeholder="email@domain.com" onChange={handleChange}/><br />
        <label htmlFor="password">Password:</label><br />
        <input type="password" id="password" name="password" placeholder="password" onChange={handleChange} /><br /><br />
        <input type="submit" value="Submit" />
      </fieldset>
    </form>
    </>
  )
}

export default Home
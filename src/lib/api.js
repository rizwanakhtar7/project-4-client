import axios from "axios"

export function registerUser(formData) {
  return axios.post('api/auth/register/', formData)
}

export function loginUser(formData) {
  return axios.post('api/auth/login/', formData)
}
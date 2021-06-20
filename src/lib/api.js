import axios from 'axios'
import { getToken } from './auth'

const baseUrl = '/api'

function headers() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }, 
  }
}

export function getSingleCourse(courseId) {
  return axios.get(`${baseUrl}/courses/${courseId}`)
}

export function getSingleLesson(courseId,lessonId) {
  return axios.get(`${baseUrl}/courses/${courseId}/lessons/${lessonId}`)
}

export function registerUser(formData) {
  return axios.post('api/auth/register/', formData)
}

export function loginUser(formData) {
  return axios.post('api/auth/login/', formData)
}


export function addNewComment(id, formData) {
  return axios.post(`${baseUrl}/courses/${id}/comments/`, formData, headers())
}

export function deleteComment(id, commentId) {
  return axios.delete(`${baseUrl}/courses/${id}/comments/${commentId}`,  headers())
}


export function editComment(id, commentId) {
  return axios.put(`${baseUrl}/courses/${id}/comments/${commentId}`,  headers())
}
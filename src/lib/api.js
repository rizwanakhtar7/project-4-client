import axios from 'axios'

const baseUrl = '/api'

export function getSingleCourse(courseId) {
  return axios.get(`${baseUrl}/courses/${courseId}`)
}

export function getSingleLesson(lessonId) {
  return axios.get(`${baseUrl}/courses/1/lessons/1`)
}

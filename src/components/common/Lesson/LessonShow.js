import React, { useState } from 'react'
import { useParams } from 'react-router'
// import useFormComment from '../../../hooks/useFormComment'
import { addNewComment, getSingleLesson, deleteComment, editComment } from '../../../lib/api'

function LessonShow() {
  const { courseId, lessonId } = useParams()
  const [lesson, setLesson] = React.useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [scoreShow, setShow] = useState(false)
  const [learnerScore, setLearnerScore] = useState(0)


  //handle form for comment data
  const [commentFormData, setCommentFormData] = React.useState({
    content: '',
  })
  // const { formData, handleChange, setFormData } = useFormComment({
  //   content: '',
  // })

  const handleDelete = async (commentId) => {
    await deleteComment(lessonId, commentId)
  } 

  const handleEdit = async (commentId) => {
    await editComment(lessonId, commentId)
  } 

  const handleAddUserComment = async e => {
    e.preventDefault()

    try {
      const { data } = await addNewComment(lessonId, commentFormData)
      console.log(`data is: ${lessonId}`)
      setCommentFormData({content: '' })
    } catch (e) {
      console.log(e)
    }
  }

  const handleChange = event => {
    const nextFormData = { ...commentFormData, [event.target.name]: event.target.value }
    setCommentFormData(nextFormData)
  }

  const handleAnswerClick = (isCorrect) => {
    if(isCorrect) {
      setLearnerScore(learnerScore + 1)
    }

    const nextQuestionBtn = currentQuestion + 1
    if (nextQuestionBtn < lesson.assessment.questions.length) {
      setCurrentQuestion(nextQuestionBtn)
    } else {
      setShow(true)
    }
  }


  React.useEffect(() => {
    const getSingleLessonData = async () => {
      try {
        const res = await getSingleLesson(courseId,lessonId)
        setLesson(res.data)
      } catch (e) {
        console.log(e)
      }
    }
    getSingleLessonData()
  }, [courseId,lessonId])

  

  return (
    lesson && <div>
     
      <h2>Lesson content</h2>
      <p>{lesson.content}</p>
      <p>{lesson.description}</p>
      <iframe src={lesson.videoLink}
      frameborder='0'
      allow='autoplay; encrypted-media'
      allowfullscreen
      title='video'
      />
      <iframe src="https://trinket.io/embed/python/f239d4fb1a" width="100%" height="356" frameBorder="0" marginWidth="0" marginHeight="0" allowFullScreen></iframe>

      <h2>Quiz</h2>
      <p>{lesson.assessment.name}</p>
      {scoreShow ? (
        <div>You Scored <b>{learnerScore}</b> out of {lesson.assessment.questions.length} </div>
      ) : (
        <div>
          <div>
            <span>Question 1</span>/ {lesson.assessment.questions.length}
          </div>
          <hr></hr>
          <div>
            {lesson.assessment.questions[currentQuestion].question}
          </div>

          <div>
            {lesson.assessment.questions[currentQuestion].answers.map(answer => <button onClick={() => handleAnswerClick( answer.isCorrect )} key={answer.id}>{answer.answer}</button>)}

          </div>
      </div>
     
      )}
     


      <h2>Lesson Summary</h2>
      <hr />
      <h1>Comments Section</h1>
      <p>Add any questions about the lesson / discussion here...</p>
      <form onSubmit={handleAddUserComment}>
        <textarea
          name="content" 
          value={commentFormData?.content}
          onChange={handleChange}
        
        /><br></br>
        <button>SEND</button>
      </form>

      {lesson?.comments.slice(0).reverse().map(comment => {
        return (
          <div key={comment.id}>
            <p>BY --- 
            {comment.user
              ? comment.user :
                'User'
            }
            </p>
            <p>{comment.content}</p>
            <button onClick={() => handleDelete(comment.id)}>DELETE</button>
            |
            <button onClick={() => handleEdit(comment.id)}>EDIT</button>

          </div>
        )
      })}
    <div>
        
    </div>
    </div>
  )
}

export default LessonShow
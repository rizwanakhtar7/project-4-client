import React, { useState } from 'react'
import { useParams } from 'react-router'
// import useFormComment from '../../../hooks/useFormComment'
import { addNewComment, getSingleLesson, deleteComment } from '../../../lib/api'
import parse from 'html-react-parser';
import Error from '../Error';
import Spinner from '../Spinner';



function LessonShow() {
  const [isError, setIsError] = React.useState(false)
  const { courseId, lessonId } = useParams()
  const [lesson, setLesson] = React.useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [scoreShow, setShow] = useState(false)
  const [learnerScore, setLearnerScore] = useState(0)
  const isLoading = !lesson && !isError

  //Function to embed youtube watch video to embed plus adding Iframe
  function youtubeEmbed(youtubeUrlLink) {
    const matchPattern = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = youtubeUrlLink.match(matchPattern);
    return (match && match[2].length === 11)
      ? match[2]
      : null;
  }


  // //make sure video not null
  // const videoIdYoutube = youtubeEmbed(lesson?.videoLink);
  // const fullMarkup = parse(`<iframe width="660" height="415" src="https://www.youtube.com/embed/${videoIdYoutube}" <iframe width="560" height="315" src="https://www.youtube.com/embed/w7ejDZ8SWv8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`)

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

 

  const handleAddUserComment = async e => {
    e.preventDefault()

    try {
      const { data } = await addNewComment(lessonId, commentFormData)
      console.log(`data is: ${lessonId}`)
      setCommentFormData({ content: '' })
    } catch (err) {
      setIsError(true)
    }
  }

  const handleChange = event => {
    const nextFormData = { ...commentFormData, [event.target.name]: event.target.value }
    setCommentFormData(nextFormData)
  }

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
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
        const res = await getSingleLesson(courseId, lessonId)
        setLesson(res.data)
      } catch (e) {
        console.log(e)
      }
    }
    setTimeout(getSingleLessonData, 1000)
  }, [courseId, lessonId])


  console.log(lesson?.videoLink)
  return (
    <div className="main-lesson-container">

      {isError && <Error />}
      {isLoading && <Spinner />}

      {lesson && <div>
        <div className="lesson-banner">
          <div>
            {/* banner for the lesson and description,subject */}
            <h1>{lesson.title}</h1>
          </div>
        </div>
        <div className="lesson-description">
          <h2>Description</h2>
          <hr /><br />
          <p>{lesson.description}</p>

        </div>
        {/* section for video and playground for practice */}
        <div className="container-for-content">

          <div className="video-section">
            {/* embed video from youtube which has been added  */}
            <div className="youtube-vid">
              {/* {fullMarkup} */}
            </div>
            <div className="IDE-section">
              <iframe src="https://trinket.io/embed/python/f239d4fb1a" width="100%" height="356" frameBorder="0" marginWidth="0" marginHeight="0" allowFullScreen></iframe>

            </div>
          </div>

          {/* Quiz/AssessmentSection */}

          <div className="quiz-title-styling">
            <h2>Quiz</h2>
            <hr /><br />
          </div>
          {
            lesson.assessment ?
              (
                <>
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
                        {lesson.assessment.questions[currentQuestion].answers.map(answer => <button onClick={() => handleAnswerClick(answer.isCorrect)} key={answer.id}>{answer.answer}</button>)}

                      </div>
                    </div>

                  )}
                </>
              ) : (
                <div>
                  <p className="no-quiz-section">Quizzes will be posted shortly to test your knowledge for this lesson</p>

                </div>
              )
          }


          <div className="Lesson-summary-styling">
            <h2>Lesson Summary</h2>
            <hr /><br />
          </div>

          <section className="comments-section">
          <div>

            <h1>Comments</h1>
            <p className="discussion-text">Add any questions about the lesson / discussion here...</p>
            <form onSubmit={handleAddUserComment}>
              <textarea
                className="styled-area"
                name="content"
                value={commentFormData?.content}
                onChange={handleChange}
                placeholder="Name"
                onFocus={(e) => e.target.placeholder =""}
                onBlur= {(e) => e.target.placeholder= "Name"}
                rows="4"
              /><br></br>
              <div className="btn-send-section">
                <button className="send-comment">SEND</button>
              </div>
             
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
           

                </div>
              )
            })}
            </div>
          </section>

        </div>
      </div>

      }
    </div>
  )
}

export default LessonShow
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startGetQuestions, startEditLike } from '../../actions/questionAction'
import { startGetStudent } from '../../actions/studentAction'
import StudentForm from './StudentQuesForm'
import '../../Styling/student.css'

function StudentList(props) {
  const dispatch = useDispatch()
  const [answerShow, setAnswerShow] = useState('')

  useEffect(()=>{
    dispatch(startGetStudent()) //get logged student data
    dispatch(startGetQuestions()) // get all questions
  },[dispatch])

  const student = useSelector(state=>state.user)
  const studentId = student._id
  const questions = useSelector((state)=>{
    return state.questions.sort((a,b)=>{
      if(a.likes.length > b.likes.length)
      {
          return -1
      }
      if(a.likes.length < b.likes.length)
      {
          return 1
      }
      return 0
    })
  })

  const studentQues = questions.filter(ele=>ele.studentId._id===studentId)
  const othersQues = questions.filter(ele=>ele.studentId._id!==studentId)

  const editLikes = (Qid) => {
    dispatch(startEditLike( Qid))
  }

  const handleviewAnswer = (id) => {
    setAnswerShow(id)
  }

  return (
    <div className='studentPage'>

      <h2>Student Dashboard</h2> <hr/>
      <div className='displayName'>
        { student && <span> Welcome, {student.username}! </span> }
      </div>
      <StudentForm  studentId={studentId} /> <br/> <hr/>
      <div className='othersQues'>
        <h2> Others Questions  - {othersQues.length} </h2>
        {
          othersQues.map((ele,i)=>{
            return (<div key={ele._id} className="oneQuestion">
                
                  <p>{i+1}.{ele.body}</p>
                  {
                    ele.likes.includes(studentId) ? ( 
                    <>
                      <button className="unlikeBtn" onClick={()=>{editLikes(ele._id)}}>unlike</button> - <b>{ele.likes.length}</b>
                    </>) : ( 
                    <>
                      <button className="likeBtn" onClick={()=>{editLikes(ele._id)}}>like</button> - <b>{ele.likes.length}</b>
                    </>)
                  }
                  {
                    ele.isAnswered ? (answerShow===ele._id ? 
                    <button className='close-answer' onClick={()=>{handleviewAnswer('')}}>close</button> :
                    <button className='view-answer' onClick={()=>{handleviewAnswer(ele._id)}}>View answer</button>):(
                    <span className='not-answered'>Not Answered</span>
                    )
                  }
                  <span className='stuName'> - {ele.studentId.username}</span>
                
                  {
                    answerShow===ele._id && <div className='answer-data'>{ele.answer} </div>
                  }
          </div>)
        })
      }
      </div>
      <div className='myQues'>
        <h2>My Questions - {studentQues.length} </h2>
        {
          studentQues.map((ele,i)=>{
            return (<div key={ele._id} className="oneQuestion">
                <p>{i+1}.{ele.body}</p>
                  <>
                    <button className="mylikeBtn" onClick={()=>{editLikes(ele._id)}} disabled = {studentId===ele.studentId._id} >like</button> - <b>{ele.likes.length}</b>
                  </> 
                  {
                    ele.isAnswered ? (answerShow===ele._id ? 
                    <button className='close-answer' onClick={()=>{handleviewAnswer('')}}>close</button> :
                    <button className='view-answer' onClick={()=>{handleviewAnswer(ele._id)}}>View answer</button>):(
                    <span className='not-answered'>Not Answered</span>
                    )
                  }
                  {
                    answerShow===ele._id && <div className='answer-data' >{ele.answer}</div>
                  }
          </div>)
        })
      }
    </div>
  </div>
  )
}

export default StudentList 
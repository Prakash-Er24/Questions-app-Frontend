import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import {startGetQuestions, startUpdateQuestion} from '../../actions/questionAction'
import { startGetStudents } from "../../actions/studentAction";
import AnswerForm from "./AnswerForm";
import '../../Styling/AdminList.css'
function AdminList(props)
{
    const dispatch = useDispatch()
    const [answer,setAnswer] = useState('')
    
    useEffect(()=>{
        dispatch(startGetStudents())
        dispatch(startGetQuestions())
    },[dispatch])

    const questions=useSelector((state)=>{
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
    
    const students = useSelector((state)=>{
        return state.students
    })

    const answered = questions.filter(ele=>ele.isAnswered)
    const unAnswered = questions.filter(ele=>!ele.isAnswered)
    
    const handleChange = (e,id) => {
        const check = e.target.checked
        dispatch(startUpdateQuestion(id,{isAnswered:check}))
    }
    
    const handleOpen = (id) => {
        setAnswer(id)
    }
    
    const nameList = (likesArr) => {
        const result = students.map(stu=>{
            if(likesArr.includes(stu._id))
            {
                return <div key={stu._id}>{stu.username}</div>
            }
            else
            {
                return null
            }
        })
       return (result.filter(ele=>ele))
    }

    return (<div className="AdminData">
        <h2>Admin Dashboard</h2><hr/>
        <h2>Unanswered - {unAnswered.length}</h2>
        {
            unAnswered.map((ele,i)=>{
                return (<div key={ele._id} className="adminQuestions">
                            <p>{i+1}.{ele.body} </p> 
                           
                            <div className="quesData">
                                <button className="likesBtn">Likes </button><b> {ele.likes.length}</b>
                                <div className="likedData">  
                                    {
                                        nameList(ele.likes)
                                    }
                                </div>     
                            </div>

                            <input 
                                type="checkbox" 
                                checked={ele.isAnswered} 
                                onChange={(event)=>handleChange(event,ele._id)}
                            /> 
                            <label className="unanswered">answered </label>

                            <span className="name"> - {ele.studentId.username}</span><br/><br/>

                            <div style={{display:'inline'}}>
                                <span className="createdAt">createdAt : {ele.createdAt.slice(0,10)} / {ele.createdAt.slice(11,16)}</span>
                                {
                                    answer===ele._id ? <button className="closeBtn" onClick = {()=>{handleOpen('')}}>Close</button>:
                                    <button className="answerBtn" onClick = {()=>{handleOpen(ele._id)}}>Answer</button>
                                }
                                <span className="updatedAt">last update : {ele.updatedAt.slice(0,10)} / {ele.updatedAt.slice(11,16)}</span>
                            </div>
                            {
                                answer===ele._id && <AnswerForm id={ele._id} answerData = {ele.answer} />
                            }
                </div>)
            })
        }
        <hr/>
        
        <h2>Answered - {answered.length}</h2>
        {
            answered.map((ele,i)=>{
                return (<div key={ele._id} className="adminQuestions">
                        <p>{i+1}.{ele.body} </p>
                        
                        <div className="quesData">
                           <button className="likesBtn">Likes</button> <b> {ele.likes.length}</b>
                            <div className="likedData">
                                {
                                    nameList(ele.likes)
                                }
                            </div>
                        </div>
                                            
                        <input  type="checkbox" 
                                checked={ele.isAnswered} 
                                onChange={(event)=>{handleChange(event,ele._id)}}  
                        />
                        <label className="answered">answered</label>

                        <span className="name"> - {ele.studentId.username}</span><br/><br/>

                        <div style={{display:'inline'}}>
                            <span className="createdAt">createdAt : {ele.createdAt.slice(0,10)} / {ele.createdAt.slice(11,16)}</span>
                            {
                                answer===ele._id ? <button className="closeBtn" onClick = {()=>{handleOpen('')}}>close</button>:
                                <button className="answerBtn" onClick = {()=>{handleOpen(ele._id)}}>Answer</button>
                            }
                            <span className="updatedAt">last update : {ele.updatedAt.slice(0,10)} / {ele.updatedAt.slice(11,16)}</span>
                        </div>
                            {
                                answer===ele._id && <AnswerForm id={ele._id} answerData = {ele.answer} />
                            }
                        </div>
                )
            })
        }
    </div>)
}

export default AdminList
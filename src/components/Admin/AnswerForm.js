import React from 'react'
import {useDispatch} from 'react-redux'
import {useFormik} from 'formik'
import { startUpdateQuestion } from '../../actions/questionAction'
import '../../Styling/AdminList.css'

function AnswerForm(props) {
    const {answerData,id} = props
    const dispatch = useDispatch() 

    const formik = useFormik({
        initialValues:{
            answer:answerData||''
        },
        onSubmit:function(values){
            dispatch(startUpdateQuestion(id,values))
        }
    })
    
  return (
    <div className='answer-form'>
        <form onSubmit={formik.handleSubmit}> 
            <textarea placeholder="Answer"
                      value={formik.values.answer}
                      name='answer'
                      onChange={formik.handleChange}
                      className="answerTextarea"
                      
            ></textarea><br/>
            <input type="submit" value="save"/>
        </form>
    </div>
  )
}

export default AnswerForm
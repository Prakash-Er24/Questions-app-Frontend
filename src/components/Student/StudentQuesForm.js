import React from 'react'
import {useDispatch} from 'react-redux'
import {useFormik} from 'formik'
import * as Yup from 'yup';
import {startPostQuestion} from '../../actions/questionAction'
import '../../Styling/student.css'

function StudentForm(props) {
    const dispatch = useDispatch() 

    const formik = useFormik({
        initialValues:{
            body:''
        },
        validationSchema :Yup.object({
            body : Yup.string().required('Required field')
        }),
        onSubmit:function(values,{resetForm}){
            dispatch(startPostQuestion(values,resetForm))
        }
    })
  return (
    <div className='studentForm'>
        <form onSubmit={formik.handleSubmit}> 
            <textarea placeholder="What's the question on your mind!!!"
                      value={formik.values.body}
                      name='body'
                      onChange={formik.handleChange}
                     
            ></textarea><br/>
            <span style={{color:'red',marginTop:'9px'}}>
            {
               formik.touched.body &&  formik.errors.body && (<span>{formik.errors.body} </span>)
            }
                
            </span>
            <br/>
            <input type="submit" value="submit"/>
        </form>
    </div>
  )
}

export default StudentForm
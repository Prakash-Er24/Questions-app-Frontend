import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {startStudentRegister} from '../../actions/studentAction'
import '../../Styling/login.css'

function StudentRegister(props)
{
    const formik =  useFormik({
        initialValues:{
            username:'',
            email:'',
            password:''
        },
        validationSchema : Yup.object({
            username:Yup.string().required(),
            email:Yup.string().required().email(),
            password:Yup.string().required().min(8)
        }),
        onSubmit:function(values){
            const redirect = ()=>{
                props.history.push('/student/login')
            }
           startStudentRegister(values,redirect)
        }
    })
    return (<div className='login'>
        <h2 >Student Register</h2 >
     
        <form onSubmit = {formik.handleSubmit}>
            <input type="text" name="username" value={formik.values.username} onChange={formik.handleChange} placeholder="Name"/><br/>
            {
                formik.touched.username && formik.errors.username && <span>{formik.errors.username}</span>
            }<br/>
            <input type="text" name="email" value={formik.values.email} onChange={formik.handleChange} placeholder="Email"/><br/>
            {
                formik.touched.email && formik.errors.email && <span>{formik.errors.email}</span>
            }<br/>
            <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} placeholder="Password"/><br/>
            {
                formik.touched.password && formik.errors.password && <span>{formik.errors.password}</span>
            }<br/>
            <br/>
            <input type="submit" value="Register" />
        </form>
    </div>)
}

export default StudentRegister
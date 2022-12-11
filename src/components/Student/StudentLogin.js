import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { startStudentLogin } from '../../actions/studentAction'
import '../../Styling/login.css'

function StudentLogin(props) {
    const {navBar} =props

    const formik =  useFormik({
        initialValues:{
            email:'',
            password:''
        },
        validationSchema : Yup.object({
            email:Yup.string().required().email(),
            password:Yup.string().required().min(8)
        }),
        onSubmit:function(values){
            const redirect = () => {
                props.history.push('/student/dashboard')
                navBar()
            }
            startStudentLogin(values,redirect)
        }
    })
    return (<div className='login'>
        <h2 >Student Login</h2 >
     
        <form onSubmit = {formik.handleSubmit}>

            <input type="text" name="email" value={formik.values.email} onChange={formik.handleChange} placeholder="Email"/><br/>
            {
                formik.touched.email && formik.errors.email && <span>{formik.errors.email}</span>
            }<br/>
            <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} placeholder="Password"/><br/>
            {
                formik.touched.password && formik.errors.password && <span>{formik.errors.password}</span>
            }<br/>
            <br/>
            <input type="submit" value="login" />
        </form>
        </div>)
}

export default StudentLogin
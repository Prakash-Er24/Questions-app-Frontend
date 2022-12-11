import axios from 'axios'
import swal from 'sweetalert'

export const startStudentRegister = (data,redirect) => {
    axios.post('http://localhost:3033/api/student/register',data)
        .then((response)=>{
            const result = response.data
            if(result.hasOwnProperty('notice'))
            {
                swal({title:result.notice,icon:'warning'})
            }
            else if(result.hasOwnProperty('errors'))
            {
                swal({text:result.message, icon:'error'})
            }
            else if(result === 'success')
            {
                swal({title:'Successfully registered',icon:'success'})
                redirect()
            }
            else
            {
                swal({title:"Unable to register", icon:'error'})
            }
        })
        .catch((err)=>{
            swal({title:err.message,icon:'error'})
        })
    }

export const startStudentLogin = (data,redirect) => {
    axios.post('http://localhost:3033/api/student/login',data)
        .then((response)=>{
            const result = response.data
            if(result.hasOwnProperty('notice'))
            {
                swal({title:result.notice,icon:'warning'})
            }
            else if(result.hasOwnProperty('errors'))
            {
                swal({title:result.errors.message, icon:'error'})
            }
            else if(result.hasOwnProperty('token'))
            {
                localStorage.setItem('token',result.token)
                swal({title:'Successfully Logged In',icon:'success'})
                redirect()
            }
            else
            {
                swal({title:"Unable to login", icon:'error'})
            }
        })
        .catch((err)=>{
            swal({title:err.message,icon:'error'})
        })
    }

export const startGetStudent = () => {
    return (dispatch)=>{
        axios.get('http://localhost:3033/api/student',{
            headers:{authorization:localStorage.getItem('token')}
        })
            .then((response)=>{
                const result = response.data
                if(result.hasOwnProperty('notice'))
                {
                    swal({title:result.notice,icon:'warning'})
                }
                else if(result.hasOwnProperty('errors'))
                {
                    swal({title:result.errors.message, icon:'error'})
                }
                else{
                    dispatch(userData(response.data))
                }
            })
            .catch((err)=>{
                swal({title:err.message,icon:'error'})
            })
    }
}

const userData  = (data) => {
    return {type:'GET_USER',payload:data}
}

export const startGetStudents = () => {
    return (dispatch)=>{
        axios.get('http://localhost:3033/api/students',{
            headers:{role:localStorage.getItem('token')}
        })
            .then((response)=>{
                const result = response.data
                if(result.hasOwnProperty('notice'))
                {
                    swal({title:result.notice,icon:'warning'})
                }
                else if(result.hasOwnProperty('errors'))
                {
                    swal({title:result.errors.message, icon:'error'})
                }
                else{
                    dispatch(studentsData(response.data))
                }
            })
            .catch((err)=>{
                swal({title:err.message,icon:'error'})
            })
    }
}

const studentsData  = (data) => {
    return {type:'GET_STUDENTS',payload:data}
}



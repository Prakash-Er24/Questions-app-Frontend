import axios from 'axios'
import swal from 'sweetalert'

export const startadminlogin = (data, redirect) => {
        axios.post('http://localhost:3033/api/admin',{key:data})
            .then((response)=>{
                const  result = response.data
                if(result.hasOwnProperty('errors'))
                {
                    swal({title:result.error.message , icon:'error'})
                }
                else
                {
                    localStorage.setItem('token','admin')
                    redirect()
                }
            })
            .catch((err)=>{
                swal({title:err.message,icon:'error'})
            })
    }
    
    export const logout = ()=>{
        return {type:'LOGOUT'}
    }
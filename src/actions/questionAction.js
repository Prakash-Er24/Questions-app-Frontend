import axios from 'axios'
import swal from 'sweetalert'

export const startGetQuestions = ()=>{
    return (dispatch)=>{    
        axios.get('http://localhost:3033/api/questions')
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
                    dispatch(setQuestions(response.data))
                }
                })
                    
         
            .catch((err)=>{
                swal({title:err.message,icon:'error'})
            })
}
}

const setQuestions = (data)=>{
    return {
        type:'GET_QUESTIONS',
        payload:data
    }
}

export const startUpdateQuestion = (id,data) => {
    return (dispatch) => {
        axios.put('http://localhost:3033/api/admin/'+id,data,{
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
                    swal({title:'Updated',icon:'success'})
                    dispatch(editQuestion(response.data))
                }
                })
            .catch((err)=>{
                swal({title:err.message,icon:'error'})
            })
    }
}

const editQuestion = (data) => {
    return {type:'ADMIN_EDIT',payload:data}
}

export const startPostQuestion = (data,reset) => {
    return (dispatch)=>{
     axios.post('http://localhost:3033/api/questions',data,{
        headers:{'authorization':localStorage.getItem('token')}
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
                    dispatch(postQuestion(response.data))
                    reset()
                }
     })
     .catch((err)=>{
         swal({title:err.message,icon:'error'})
     })
    }
 }
 
 const postQuestion = (data) => {
     return ({
         type:'ADD_QUESTION',
         payload:data
     })
 }

export const startEditLike = (id) =>{
    return (dispatch) => {
        axios.put(`http://localhost:3033/api/question/${id}`,null,{
            headers:{'authorization':localStorage.getItem('token')}
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
                    dispatch(editLike(response.data))
                }
            })
            .catch((err)=>{
                swal({title:err.message,icon:'error'})
            })
 }
 }

 const editLike =(data) => {
    return {type:'EDIT_LIKE',payload:data}

 } 
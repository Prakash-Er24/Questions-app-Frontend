import React, { useState } from "react";
import { startadminlogin } from "../../actions/adminActions";
import swal from 'sweetalert'
import '../../Styling/login.css'

function Admin(props)
{
    const {navBar}=props
    const [key,setKey ]=useState('')
    const [error,setError]=useState('')
    let err
    const handleChange = (e) => {
        setKey(e.target.value)
        setError('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(key.length===0)
        {
            err = 'Secret key is required'
            setError(err)
        }
        const redirect = ()=>{
            swal({title:'Successfully logged in',icon:'success'})
                .then((value)=>{
                    navBar()
                    props.history.push('/admin/dashboard')
                })
                }
                if(!err)
                {
                    startadminlogin(key,redirect)
                }
    }
    return (<div className="login">
        <h2>Admin login</h2>
        <form onSubmit={handleSubmit}>
            <input type="password" value={key} onChange={handleChange} placeholder="Enter Secret key" /><br/>
            {
                error && <span>{error}</span>
            }
            <br/>
            <input type="submit"  value="login"/>
        </form>
    </div>)
}

export default Admin  
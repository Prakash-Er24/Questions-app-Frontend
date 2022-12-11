import React,{useState} from "react";
import { Link, Redirect, Route , withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import Admin from './Admin/Admin'
import AdminList from "./Admin/AdminList";
import StudentRegister from "./Student/StudentRegister";
import StudentLogin from "./Student/StudentLogin";
import StudentList from "./Student/StudentPage";
import { logout } from "../actions/adminActions";
import '../Styling/navBar.css'

function NavBar(props) {
    const [loggedIn,setLoggedIn] = useState(Boolean(localStorage.getItem('token')))
    const [toggle,setToggle] = useState(false)
    const dispatch = useDispatch()

    const navBar = () => {
      setLoggedIn(!loggedIn)
    }
  
    const handleToggle = (type) => {
      setToggle(type)
    }

    const handleLogout = () => {
      localStorage.removeItem('token')
      dispatch(logout())
      navBar()
      swal({title:'Successfully logged out',icon:'success'})
    }

    return (<div className="homePage">
       <h1>Questions App</h1>
        {
          !loggedIn && !toggle &&
          <div className="navBar">
              <Link className='navlink' to="/admin/login" >Admin</Link>
              <Link className='navlink' to="" onClick={()=>handleToggle(true)} >Student</Link>
          </div>
        }
        {
          !loggedIn && toggle && <div className="navBar">
              <Link to='/student/register' className='navlink'>Register</Link>
              <Link to='/student/login' className='navlink'>Login</Link>
              <Link to='' onClick={()=>handleToggle(false)} className='navlink'>back</Link>
            </div>
        }
        {
          loggedIn && <Link to="" className="logout" onClick={handleLogout}>logout</Link>
        }
        {!loggedIn && <h2>Ask your Questions Here!!!</h2>}
       
        <Route path="/admin/login" exact render={(props)=>{
           return <Admin {...props} navBar={navBar}/> }} />
        <Route path = "/admin/dashboard" exact render={ (props)=>{
            return (
              localStorage.getItem('token')==='admin' ? 
              <AdminList {...props} navBar={navBar} /> : 
              <Redirect to={{pathname:'/admin/login'}} />
            )
        }} />
  
        <Route path = '/student/register' exact render={(props)=>{
          return <StudentRegister {...props} navBar={navBar} />
        }} />
        <Route path = '/student/login' exact render={(props)=>{
          return <StudentLogin {...props} navBar={navBar}/>
        }} />
        <Route path = '/student/dashboard' exact render={(props)=>{
          return (
            ( localStorage.getItem('token')!=='admin') ? 
            <StudentList {...props} navBar={navBar} /> :
            <Redirect to={{pathname:'/student/login'}} />
          )
        }} />
      </div>
    );
}

export default withRouter(NavBar)
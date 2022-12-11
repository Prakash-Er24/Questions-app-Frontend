
const studentReducer = (state = [], action)=>{
    switch(action.type)
    {
        case 'GET_STUDENTS' :{
            return [...action.payload]
        }
        
        case 'LOGOUT' :{
            return []
        }

        default:{
            return state
        }
    }
}

export default studentReducer
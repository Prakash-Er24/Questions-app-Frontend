
const questionReducer = (state = [], action)=>{
    switch(action.type)
    {
        case 'GET_QUESTIONS' :{
            return [...action.payload]
        }

        case 'ADMIN_EDIT' : {
            const result = state.map(ele=>{
                if(ele._id===action.payload._id)
                {
                    return {...action.payload}
                }
                else
                {
                    return {...ele}
                }
            })
            return result
        }

        case 'ADD_QUESTION' :{
            return [{...action.payload},...state]
        }

        case 'EDIT_LIKE' : {
            const result = state.map(ele=>{
                if(action.payload._id===ele._id)
                {
                    return {...ele,...action.payload}
                }
                else
                {
                    return {...ele}
                }
            })
            return result
        }
        
        case 'LOGOUT' :{
            return []
        }
        
        default:{
            return state
        }
    }
}

export default questionReducer
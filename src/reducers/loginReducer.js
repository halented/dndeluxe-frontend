const initialState = {
    userExists: false,
    avatar:'',
    bio: '',
    username: ''
}

const loginReducer = (state = initialState, action) => {
    switch (action.type){
        case "LOGIN":
            return {
                ...state,
                userExists: true
            }
        case "LOGOUT":
            return {...state,
                userExists: false}
        default:
            return state
    }
}

export default loginReducer
const initialState = {
    userExists: false,
    avatar:'',
    bio: '',
    username: ''
}

const loginReducer = (state = initialState, action) => {
    console.log("inside reducer", action)
    switch (action.type){
        case "LOGIN":
            return {
                ...state,
                userExists: true,
                avatar: action.avatar,
                bio: action.bio,
                username: action.username
            }
        case "LOGOUT":
            return {...state,
                userExists: false}
        default:
            return state
    }
}

export default loginReducer
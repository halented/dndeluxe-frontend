const initialState = {
    userExists: false
}

const loginReducer = (state = initialState, action) => {
    switch (action.type){
        case "LOGIN":
            return {...state,
                userExists: true}
        default:
            return state
    }
}

export default loginReducer
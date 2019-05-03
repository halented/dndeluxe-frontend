const initialState = {
    characterDetails: []
}
function characterDetailsReducer(state = initialState, action){
    switch(action.type) {
        case "ADD_DETAILS":
            return {
                ...state,
                characterDetails: action.payload
            }
        default:
            return state
    }
}

export default characterDetailsReducer
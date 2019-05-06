const initialState = {
    spells: []
}

function characterDetailsReducer(state = initialState, action){
    switch(action.type) {
        case "ADDSPELLS":
            return {
                ...state,
                spells: action.payload
            }
        default:
            return state
    }
}

export default characterDetailsReducer
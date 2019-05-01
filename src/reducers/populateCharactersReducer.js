const initialState = {
    characters: []
}

const populateCharactersReducer = (state = initialState, action) => { 
    switch(action.type){
        case "ADDCHAR":
            return {...state, characters: action.payload}
        default:
            return state;
    }
}

export default populateCharactersReducer
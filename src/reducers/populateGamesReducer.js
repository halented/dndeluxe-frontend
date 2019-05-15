const initialState = {
    games: []
}

const populateGamesReducer = (state = initialState, action) => { 
    console.log(action.payload)
    switch(action.type){
        case "ADDGAMES":
            return {...state, games: action.payload}
        default:
            return state;
    }
}

export default populateGamesReducer
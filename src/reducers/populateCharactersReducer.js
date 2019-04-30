const initialState = {
    characters: []
}

const populateCharactersReducer = (state = initialState, action) => { 
    switch(action.type){
        case "ADDCHAR":
            // console.log("payload", action.payload)
            // debugger;
            let temp = []
            temp.push(action.payload)
            return {...state, characters: temp}
        default:
            return state;
    }
}

export default populateCharactersReducer
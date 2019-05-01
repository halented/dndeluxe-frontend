export const login = () => {
    return {
        type: "LOGIN",
    }
}

export const duxLogout = () => {
    return {
        type: "LOGOUT"
    }
}

export const populateGames = () => {
    return dispatch => {
        console.log("inside the games one")
        fetch(`http://localhost:3000/games`, 
        {headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }})
        .then(response=>response.json())
            .then(json=>{
                let temp = []
                debugger;
                json.forEach(game=> {
                    if (parseInt(game.user_id) !== parseInt(localStorage.getItem('userID'))){
                        temp.push(game)
                    }
                })
                dispatch({type: "ADDGAMES", payload: temp})
            })
    }
}

export const populateCharacters = () => {
    return dispatch => {
        console.log("inside populate chars")
        fetch(`http://localhost:3000/users/${localStorage.getItem('userID')}/characters`, 
        {headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }})
        .then(response=>response.json()
            .then(json=>{
                let temp = []
                json.forEach(character=> {
                    if (parseInt(character.user_id) === parseInt(localStorage.getItem('userID'))){
                        temp.push(character)
                    }
                })
                dispatch({type: "ADDCHAR", payload: temp})
            }))
    }
}

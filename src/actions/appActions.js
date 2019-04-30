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

export const populateCharacters = () => {
    return dispatch => {
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
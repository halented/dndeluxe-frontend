

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
        fetch(`https://dndluxe-backend.herokuapp.com/user_games`, 
        {headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }})
        .then(response=>response.json())
            .then(json=>{
                let temp = []
                json.forEach(game=> {
                    if (parseInt(game.user.id) === parseInt(localStorage.getItem('userID'))){
                        temp.push(game)
                    }
                })
                dispatch({type: "ADDGAMES", payload: temp})
            }
            )
    }
}

export const populateCharacters = () => {
    return dispatch => {
        fetch(`https://dndluxe-backend.herokuapp.com/users/${localStorage.getItem('userID')}/characters`, 
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

export const populateSpells = () => {
    return dispatch => {
        fetch('https://cors-anywhere.herokuapp.com/http://www.dnd5eapi.co/api/spells')
        .then(res=>res.json())
        .then(json=> {
            json.results.forEach(spell=> {
                spell.id = json.results.indexOf(spell)
            })
            dispatch({type: 'ADDSPELLS', payload: json.results})
        })
    }
}
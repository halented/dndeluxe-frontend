

export const fetchCharacterDetails = (charID) => { 
    return dispatch => {
        fetch(`http://localhost:3000/users/${localStorage.getItem('userID')}/characters/${charID}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response=> response.json())
        .then(json => {
            dispatch({type: "ADD_DETAILS", payload: json})
        })
    }
}
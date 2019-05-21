import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import { populateCharacters } from '../actions/appActions';
import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import trash from '../trash_icon.png';

class CharacterContainer extends Component {

    componentDidMount(){
        this.props.populateCharacters()
    }

    delete = (charID) => {
        if(window.confirm("Permanently remove this character from your profile? This action cannot be reversed."))
        fetch(`http://dndluxe-backend.herokuapp.com/users/${localStorage.getItem('userID')}/characters/${charID}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response=> response.json())
        .then(json => {
            if(json.success){
                this.success()
            }
            else {
                toaster.notify("network error. please try again")
            }
        })
    }
    success = () => {
        toaster.notify("character removed")
        this.props.populateCharacters()
    }

    render() {
        return (
            <div className='pageBoxes'>
                {this.props.characters[0] ?
                <>
                <h2 className='topGreet'>Your Characters:</h2>
                <ul className='charBox'>
                    {this.props.characters.map(char=> {
                            return (
                            <div className='singleCharBox'>
                                <NavLink to={`character/${char.id}`} className='charName' ><li>{char.name}</li></NavLink>
                                <img className='charListItem' alt="character profile pic" src={char.image}></img>
                                <img src={trash} onClick={()=>this.delete(char.id)} alt='delete button' className='deleteBtn'></img>
                            </div>
                            )
                        })
                    }
                </ul>
                </>
                :
                <div className='empty'>No characters yet. Click the button below to make one!</div>
                }
                <NavLink to='/new-character' id='newCharBtn'>
                <button>Make a new Character! =></button>
                </NavLink>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        characters: state.populateCharactersReducer.characters
    }
}
const mapDispatchToProps = dispatch => {
    return {
        populateCharacters: () => dispatch(populateCharacters())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterContainer);

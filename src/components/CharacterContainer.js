import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux'
import { populateCharacters } from '../actions/appActions'

class CharacterContainer extends Component {

    componentDidMount(){
        this.props.populateCharacters()
    }

    render() {
        return (
            <div className='pageBoxes'>
                {this.props.characters[0] ?
                <>
                <h2 className='topGreet'>Your Characters:</h2>
                <ul id='charBox'>
                    {this.props.characters.map(char=> {
                            return (
                            <>
                                <NavLink to={`character/${char.id}`} className='charName' ><li>{char.name}</li></NavLink>
                                <img  className='charListItem'alt="character profile pic" src={char.image}></img>
                            </>
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

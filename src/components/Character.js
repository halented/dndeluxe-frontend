import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchCharacterDetails } from '../actions/characterActions'

class Character extends Component {
    render() {
        return (
            <div className='pageBoxes'>
                {this.props.char.name}
                <p>{console.log(this.props.alignment)}</p>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        name: state.characterDetailsReducer.name,
        race: state.characterDetailsReducer.race,
        alignment: state.characterDetailsReducer.alignment,
        image: state.characterDetailsReducer.image,
        details: state.characterDetailsReducer.details,
        level: state.characterDetailsReducer.level,
        characterClass: state.characterDetailsReducer.characterClass,
        strength: state.characterDetailsReducer.strength,
        dexterity: state.characterDetailsReducer.dexterity,
        constitution: state.characterDetailsReducer.constitution,
        intelligence: state.characterDetailsReducer.intelligence,
        wisdom: state.characterDetailsReducer.wisdom,
        charisma: state.characterDetailsReducer.charisma,
        initiative: state.characterDetailsReducer.initiative,
        armor_class: state.characterDetailsReducer.armor_class,
        speed: state.characterDetailsReducer.speed,
        hitPoints: state.characterDetailsReducer.hitPoints,
        inspiration: state.characterDetailsReducer.inspiration,
        // characters: state.populateCharactersReducer.characters
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCharacterDetails: (id) => dispatch(fetchCharacterDetails(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Character);

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchCharacterDetails } from '../actions/characterActions'
import { populateCharacters } from '../actions/appActions'

class Character extends Component {

    componentDidMount(){
        this.props.fetchCharacterDetails(this.props.char.id)
        this.props.populateCharacters()
    }

    render() {
        return (
            <div className='pageBoxes'>
                {this.props.characterDetails.race}
                {this.props.characterDetails.alignment}
                {this.props.characterDetails.image}
                {this.props.characterDetails.details}
                {this.props.characterDetails.level}
                {this.props.characterDetails.characterClass}
                {this.props.characterDetails.strength}
                {this.props.characterDetails.dexterity}
                {this.props.characterDetails.constitution}
                {this.props.characterDetails.intelligence}
                {this.props.characterDetails.wisdom}
                {this.props.characterDetails.charisma}
                {this.props.characterDetails.initiative}
                {this.props.characterDetails.armor_class}
                {this.props.characterDetails.speed}
                {this.props.characterDetails.hitPoints}
                <br></br>
                {this.props.characterDetails.inspiration}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        characterDetails: state.characterDetailsReducer.characterDetails
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCharacterDetails: (id) => dispatch(fetchCharacterDetails(id)),
        populateCharacters: () => dispatch(populateCharacters())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Character);

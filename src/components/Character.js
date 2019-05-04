import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCharacterDetails } from '../actions/characterActions';
import { populateCharacters } from '../actions/appActions';

class Character extends Component {

    componentDidMount(){
        this.props.fetchCharacterDetails(this.props.char.id)
        this.props.populateCharacters()
    }

    render() {
        return (
            <div className='characterForm'>
                <h3 className='nameShow bord'>{this.props.characterDetails.name}</h3>
                <img className='imgShow bord' src={this.props.characterDetails.image}></img>
                <p id='descMini'>A Level {this.props.characterDetails.level} {this.props.characterDetails.alignment} {this.props.characterDetails.race} {this.props.characterDetails.character_class}.</p>
                <p className='bord desc'>Description: {this.props.characterDetails.details}</p>
                <ul className='singlets2 bord'>
                    <li className='lineItem'>Initiative: {this.props.characterDetails.initiative}</li>
                    <li className='lineItem'>Speed: {this.props.characterDetails.speed}</li>
                    <li className='lineItem'>A/C: {this.props.characterDetails.armor_class}</li>
                    <li className='lineItem'>H/P: {this.props.characterDetails.hit_points}</li>
                    <li className='lineItem'>Inspired? {this.props.characterDetails.inspiration? `yep!`: `nah.`}</li>
                </ul>
                <ul className='statblock2 bord'>
                    <li className="lbl statItem">
                    Strength: {this.props.characterDetails.strength}</li>
                    <li className="lbl statItem">
                    Dexterity: {this.props.characterDetails.dexterity}</li><li className="lbl statItem">
                    Constitution: {this.props.characterDetails.constitution}</li>
                    <li className="lbl statItem">
                    Intelligence: {this.props.characterDetails.intelligence}</li>
                    <li className="lbl statItem">
                    Wisom: {this.props.characterDetails.wisdom}</li>
                    <li className="lbl statItem">
                    Charisma: {this.props.characterDetails.charisma}</li>
                </ul>
                <NavLink to='/edit-character' id='editCharBtn'>
                <button>Edit Character</button>
                </NavLink>
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

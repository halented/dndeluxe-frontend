import React, { Component } from 'react';
import { connect } from 'react-redux'

class CharacterForm extends Component {
    state = {
        remaining: 27,
        strength: 8,
        dexterity: 8,
        constitution: 8,
        intelligence: 8,
        wisdom: 8,
        charisma: 8
    }

    postChanges = (ev) => {
        ev.preventDefault()
        let charData = this.parseDetails()
        let postData = {character: charData}
        fetch(`http://localhost:3000/users/${localStorage.getItem('userID')}/characters`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(postData)
        })
        .then(response=>response.json())
        .then(json => {
            if (json.id){
                window.location.href='/characters'
            }
            else {
                alert(json.errors)
            }
        })
    }

    parseDetails= () => {
        let data = {}
        data['name'] = document.getElementsByName('name')[0].value
        data['race'] = document.getElementsByName('race')[0].value
        data['alignment'] = document.getElementsByName('alignment')[0].value
        data['image'] = document.getElementsByName('image')[0].value
        data['details'] = document.getElementsByName('details')[0].value
        data['level'] = document.getElementsByName('level')[0].value
        data['character_class'] = document.getElementsByName('characterClass')[0].value
        data['strength'] = document.getElementsByName('strength')[0].value
        data['dexterity'] = document.getElementsByName('dexterity')[0].value
        data['constitution'] = document.getElementsByName('constitution')[0].value
        data['intelligence'] = document.getElementsByName('intelligence')[0].value
        data['wisdom'] = document.getElementsByName('wisdom')[0].value
        data['charisma'] = document.getElementsByName('charisma')[0].value
        data['initiative'] = document.getElementsByName('initiative')[0].value
        data['armor_class'] = document.getElementsByName('armorClass')[0].value
        data['speed'] = document.getElementsByName('speed')[0].value
        data['hit_points'] = document.getElementsByName('hitPoints')[0].value
        data['inspiration'] = document.getElementsByName('inspiration')[0].checked
        data['user_id'] = localStorage.getItem('userID')
        data['game_id'] = "nil"
        return data
    }

    render() {
        return (
            <form className='characterForm' onSubmit={this.postChar}>
                <br/>
                <input placeholder='Character Name' className='nameField' name="name" onChange={console.log("deets:", this.props.characterDetails)} ></input>
                <input name="level" type="number" placeholder='Lvl' className='formBox lvl' max='20' min='1'></input>
                <label className='lbl insp'>Inspired? </label>
                <input id="inspiration" type='checkbox' name='inspiration' value='inspiration'></input>
                <p id='descMini'>A Level {this.props.characterDetails.level} {this.props.characterDetails.alignment} {this.props.characterDetails.race} {this.props.characterDetails.character_class}.</p>
                <button type='submit' id='subBtn'>Save!</button>
                <div className='singlets'>
                    <input type='number' min='-5' max='20' name='initiative' className='formBox' placeholder='Init'></input>
                    <input type='number' min='-5' max='50' name='armorClass' className='formBox' placeholder='AC'></input>
                    <input type='number' min='0' max='100' name='speed' className='formBox' placeholder='Spd'></input>
                    <input type='number' min='-5' max='200' name='hitPoints' className='formBox' placeholder='HP'></input>
                </div>
                <ul className='statblock'>
                    <li className="statItem">
                    <input type='number' min='8' value={this.state.strength} className='statBox'max='20' name='strength' onChange={this.statChanger}></input><label className='lbl'>  Strength</label></li>
                    <li className="statItem">
                    <input type='number' min='8' value={this.state.dexterity} className='statBox'max='20' name='dexterity' onChange={this.statChanger}></input><label className='lbl'>  Dexterity</label></li>
                    <li className="statItem">
                    <input type='number' min='8' value={this.state.constitution} className='statBox'max='20' name='constitution' onChange={this.statChanger}></input><label className='lbl'>  Constitution</label></li>
                    <li className="statItem">
                    <input type='number' min='8' value={this.state.intelligence} className='statBox'max='20' name='intelligence' onChange={this.statChanger}></input><label className='lbl'>  Intelligence</label></li>
                    <li className="statItem">
                    <input type='number' min='8' value={this.state.wisdom} className='statBox'max='20' name='wisdom' onChange={this.statChanger}></input><label className='lbl'>  Wisdom</label></li>
                    <li className="statItem">
                    <input type='number' min='8' value={this.state.charisma} className='statBox'max='20' name='charisma' onChange={this.statChanger}></input><label className='lbl'>  Charisma</label></li>
                </ul>
                <textarea type='textarea' name='details' className='description' placeholder='Additional character details (personality traits, ideals, bonds, notes, items...)'></textarea>
                <input type='text' placeholder='image URL' className='url' name='image'></input>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        characterDetails: state.characterDetailsReducer.characterDetails
    }
}
export default connect(mapStateToProps)(CharacterForm);
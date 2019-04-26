import React, { Component } from 'react';
import sword from '../single.png'

class CharacterForm extends Component {
    state = {
        classes: [],
        races: []
    }

    componentDidMount() {
        fetch('http://www.dnd5eapi.co/api/classes')
        .then(res=>res.json())
        .then(json => {
            this.setState({classes: json.results})
        })
        this.fetchRaces()
    }
    fetchRaces = () => {
        fetch('http://www.dnd5eapi.co/api/races')
        .then(res=>res.json())
        .then(json => {
            this.setState({races: json.results})
        })
    }

    render() {
        return (
            <form className='characterForm'>
                <br/>
                <input placeholder='Character Name' id='nameField' name="name"></input>
                <input name="level" type="number" placeholder='Lvl' className='formBox lvl' max='20' min='1'></input>
                <label className='lbl insp'>Inspired? </label>
                <input id="inspiration" type='checkbox' name='inspiration' value='inspiration'></input>
                <div className='race'>
                    Race:
                    <select name='race'>
                        {this.state.races.map(race=> {
                            return <option key={race.name}>{race.name}</option>
                        })}
                    </select>
                </div>
                <div className='classBox'>
                    Class:
                    <select name='class'>
                    {this.state.classes.map(c=> {
                        return <option key={c.name}>{c.name}</option>
                    })}
                    </select>
                </div>
                <div className='alig'>
                Alignment:
                <select name='alignment'>
                    <option>Chaotic Good</option>
                    <option>Neutral Good</option>
                    <option>Lawful Good</option>
                    <option>Chaotic Neutral</option>
                    <option>True Neutral</option>
                    <option>Lawful Neutral</option>
                    <option>Chaotic Evil</option>
                    <option>Neutral Evil</option>
                    <option>Lawful Evil</option>
                </select>
                </div>
                <div className='sword'>
                <img src={sword} alt='swordd'></img>
                </div>
                <div className='singlets'>
                    <input type='number' min='-5' max='20' name='initiative' className='formBox' placeholder='Init'></input>
                    <input type='number' min='-5' max='20' name='armorClass' className='formBox' placeholder='AC'></input>
                    <input type='number' min='-5' max='20' name='speed' className='formBox' placeholder='Spd'></input>
                    <input type='number' min='-5' max='100' name='hitPoints' className='formBox' placeholder='HP'></input>
                </div>
                <ul className='statblock'>
                    <li>
                    <input type='number' min='-5' className='statBox'max='20' name='strength'></input><label className='lbl'>  Strength</label></li>
                    <li>
                    <input type='number' min='-5' className='statBox'max='20' name='dexterity'></input><label className='lbl'>  Dexterity</label></li>
                    <li>
                    <input type='number' min='-5' className='statBox'max='20' name='constitution'></input><label className='lbl'>  Constitution</label></li>
                    <li>
                    <input type='number' min='-5' className='statBox'max='20' name='intelligence'></input><label className='lbl'>  Intelligence</label></li>
                    <li>
                    <input type='number' min='-5' className='statBox'max='20' name='wisdom'></input><label className='lbl'>  Wisdom</label></li>
                    <li>
                    <input type='number' min='-5' className='statBox'max='20' name='charisma'></input><label className='lbl'>  Charisma</label></li>
                </ul>
                <textarea type='textarea' name='description' id='description' placeholder='Additional character details (personality traits, ideals, bonds, notes, items...)'></textarea>
                <input type='text' placeholder='image URL' className='url' name='image'></input>
            </form>
        );
    }
}

export default CharacterForm;

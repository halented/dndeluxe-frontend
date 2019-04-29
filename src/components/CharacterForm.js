import React, { Component } from 'react';
// import logo from '../logo.png'

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

    postChar = (ev) => {
        ev.preventDefault()
        let charData = this.parseDetails()
        console.log(charData)
        let fakeData = {name: "bob"}
        let postData = {character: charData}
        console.log(postData)
        fetch(`http://localhost:3000/characters`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(postData)
        })
        .then(response=>response.json())
        .then(console.log)
    }

    parseDetails= () => {
        let data = {}
        data['name'] = document.getElementsByName('name')[0].value
        data['race'] = document.getElementsByName('race')[0].value
        data['alignment'] = document.getElementsByName('alignment')[0].value
        data['image'] = document.getElementsByName('image')[0].value
        data['details'] = document.getElementsByName('details')[0].value
        data['level'] = document.getElementsByName('level')[0].value
        data['class'] = document.getElementsByName('class')[0].value
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
        return data
    }

    render() {
        return (
            <form className='characterForm' onSubmit={this.postChar}>
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
                <button type='submit' id='subBtn'>Save!</button>
                <div className='singlets'>
                    <input type='number' min='-5' max='20' name='initiative' className='formBox' placeholder='Init'></input>
                    <input type='number' min='-5' max='20' name='armorClass' className='formBox' placeholder='AC'></input>
                    <input type='number' min='0' max='100' name='speed' className='formBox' placeholder='Spd'></input>
                    <input type='number' min='-5' max='100' name='hitPoints' className='formBox' placeholder='HP'></input>
                </div>
                <ul className='statblock'>
                    <li className="statItem">
                    <input type='number' min='-5' className='statBox'max='20' name='strength'></input><label className='lbl'>  Strength</label></li>
                    <li className="statItem">
                    <input type='number' min='-5' className='statBox'max='20' name='dexterity'></input><label className='lbl'>  Dexterity</label></li>
                    <li className="statItem">
                    <input type='number' min='-5' className='statBox'max='20' name='constitution'></input><label className='lbl'>  Constitution</label></li>
                    <li className="statItem">
                    <input type='number' min='-5' className='statBox'max='20' name='intelligence'></input><label className='lbl'>  Intelligence</label></li>
                    <li className="statItem">
                    <input type='number' min='-5' className='statBox'max='20' name='wisdom'></input><label className='lbl'>  Wisdom</label></li>
                    <li className="statItem">
                    <input type='number' min='-5' className='statBox'max='20' name='charisma'></input><label className='lbl'>  Charisma</label></li>
                </ul>
                <textarea type='textarea' name='details' id='description' placeholder='Additional character details (personality traits, ideals, bonds, notes, items...)'></textarea>
                <input type='text' placeholder='image URL' className='url' name='image'></input>
            </form>
        );
    }
}

export default CharacterForm;

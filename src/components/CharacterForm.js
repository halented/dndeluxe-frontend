import React, { Component } from 'react';
import { connect } from 'react-redux'
import toaster from 'toasted-notes';

class CharacterForm extends Component {
    state = {
        classes: [],
        races: [],
        remaining: 27,
        strength: 8,
        dexterity: 8,
        constitution: 8,
        intelligence: 8,
        wisdom: 8,
        charisma: 8,
        showPoints: false
    }

    componentDidMount() {
        fetch('https://cors-anywhere.herokuapp.com/http://www.dnd5eapi.co/api/classes')
        .then(res=>res.json())
        .then(json => {
            this.setState({classes: json.results})
        })
        this.fetchRaces()
    }
    fetchRaces = () => {
        fetch('https://cors-anywhere.herokuapp.com/http://www.dnd5eapi.co/api/races')
        .then(res=>res.json())
        .then(json => {
            this.setState({races: json.results})
        })
    }

    postChar = (ev) => {
        ev.preventDefault()
        let charData = this.parseDetails()
        let postData = {character: charData}
        fetch(`https://dndluxe-backend.herokuapp.com/users/${localStorage.getItem('userID')}/characters`, {
            method: 'POST',
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
    statChangerStrict = (ev) => {
        let stat;
        switch(ev.target.name){
            case "strength":
                stat = this.state.strength
                break
            case "dexterity":
                stat = this.state.dexterity
                break
            case "constitution":
                stat = this.state.constitution
                break
            case "intelligence":
                stat = this.state.intelligence
                break
                case "wisdom":
                stat = this.state.wisdom
                break
            case "charisma":
                stat = this.state.charisma
                break
            default:
                toaster.notify('no stat detected')
        }

        if(parseInt(ev.target.value) > stat){
            if(parseInt(ev.target.value) >= 14 && this.state.remaining >= 2)
            this.setState({[ev.target.name]: parseInt(ev.target.value), remaining: this.state.remaining-2})
            else if (parseInt(ev.target.value) < 14 && this.state.remaining >= 1){
                this.setState({[ev.target.name]: parseInt(ev.target.value), remaining: this.state.remaining-1})
            }
        }
        
        else if (parseInt(ev.target.value) < stat) {
            if(parseInt(ev.target.value) >= 13){
                this.setState({[ev.target.name]: parseInt(ev.target.value), remaining: this.state.remaining+2})
            }
            else if (parseInt(ev.target.value) < 14){
                this.setState({[ev.target.name]: parseInt(ev.target.value), remaining: this.state.remaining + 1})
            }
        }
    }
    changeShowPoints = () => {
        this.setState({showPoints: !this.state.showPoints})
    }

    render() {
        return (
            <form className='characterForm' onSubmit={this.postChar}>
                <br/>
                <input placeholder='Character Name' className='nameField' name="name" ></input>
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
                    <select name='characterClass'>
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
                    <input type='number' min='-5' max='50' name='armorClass' className='formBox' placeholder='AC'></input>
                    <input type='number' min='0' max='100' name='speed' className='formBox' placeholder='Spd'></input>
                    <input type='number' min='-5' max='200' name='hitPoints' className='formBox' placeholder='HP'></input>
                </div>
                {this.state.showPoints ? 
                <>
                    <ul className='statblock'>
                    <li className="statItem">
                    <input type='number' min='8' value={this.state.strength} className='statBox'max='15' name='strength' onChange={this.statChangerStrict}></input><label className='lbl'>  Strength</label></li>
                    <li className="statItem">
                    <input type='number' min='8' value={this.state.dexterity} className='statBox'max='15' name='dexterity' onChange={this.statChangerStrict}></input><label className='lbl'>  Dexterity</label></li>
                    <li className="statItem">
                    <input type='number' min='8' value={this.state.constitution} className='statBox'max='15' name='constitution' onChange={this.statChangerStrict}></input><label className='lbl'>  Constitution</label></li>
                    <li className="statItem">
                    <input type='number' min='8' value={this.state.intelligence} className='statBox'max='15' name='intelligence' onChange={this.statChangerStrict}></input><label className='lbl'>  Intelligence</label></li>
                    <li className="statItem">
                    <input type='number' min='8' value={this.state.wisdom} className='statBox'max='15' name='wisdom' onChange={this.statChangerStrict}></input><label className='lbl'>  Wisdom</label></li>
                    <li className="statItem">
                    <input type='number' min='8' value={this.state.charisma} className='statBox'max='15' name='charisma' onChange={this.statChangerStrict}></input><label className='lbl'>  Charisma</label></li>
                    </ul>
                    <div id='pointAllocation' onClick={this.changeShowPoints}>Remaining Points: {this.state.remaining}</div>
                </>
                :
                <>
                    <ul className='statblock'>
                    <li className="statItem">
                    <input type='number' min='0' placeholder='8' className='statBox'max='20' name='strength'></input><label className='lbl'>  Strength</label></li>
                    <li className="statItem">
                    <input type='number' min='0' placeholder='8' className='statBox'max='20' name='dexterity'></input><label className='lbl'>  Dexterity</label></li>
                    <li className="statItem">
                    <input type='number' min='0' placeholder='8' className='statBox'max='20' name='constitution'></input><label className='lbl'>  Constitution</label></li>
                    <li className="statItem">
                    <input type='number' min='0' placeholder='8' className='statBox'max='20' name='intelligence'></input><label className='lbl'>  Intelligence</label></li>
                    <li className="statItem">
                    <input type='number' min='0' placeholder='8' className='statBox'max='20' name='wisdom'></input><label className='lbl'>  Wisdom</label></li>
                    <li className="statItem">
                    <input type='number' min='0' placeholder='8' className='statBox'max='20' name='charisma'></input><label className='lbl'>  Charisma</label></li>
                    </ul>
                    <div id='pointAllocation' onClick={this.changeShowPoints}>Use point allocation system</div>
                </>
                }
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
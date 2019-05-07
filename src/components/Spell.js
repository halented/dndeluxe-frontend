import React, { Component } from 'react';
import logo from '../logo.png'

class Spell extends Component {
    state = {
        spell: '',
        expanded: false
    }
    
    componentDidMount(){
        fetch(`https://cors-anywhere.herokuapp.com/${this.props.spell.url}`)
        .then(response=> response.json())
        .then(json=> {
            console.log(json)
            this.setState({spell: json})
        })
    }

    animate = () => {
        let div = document.getElementById('spellDesc')
        if(div.className === 'spellDesc'){
            div.className = "full"
        }
        else {
            div.className = 'spellDesc'
        }
    }
    render() {
        return (
            <div className='singleSpell' id='top'>
                <h1 className='spName'>{this.state.spell.name}</h1>
                <div id="spellDesc" className='spellDesc'onClick={this.animate}>{this.state.spell.desc}</div>
                <ul id='spellDeets'>
                    <li>Spell level: {this.state.spell.level}</li>
                    <li>Casting time: {this.state.spell.casting_time}</li>
                    <li>Duration: {this.state.spell.duration}</li>
                    <li>Range: {this.state.spell.range}</li>
                    <li>Material: {this.state.spell.material}</li>
                    <li>Handbook page: {this.state.spell.page}</li>
                </ul>
                { this.state.spell.higher_level ?
                    <div id='more' className='more'>At a higher level... {this.state.spell.higher_level}</div>
                :
                    <img src={logo} alt="DnDeluxe Logo" className='gameLogo'></img>
                }
            </div>
        );
    }
}

export default Spell;

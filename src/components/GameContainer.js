import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

class GameContainer extends Component {
    state= {
        games: []
    }

    componentDidMount(){
        fetch(`http://localhost:3000/games`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }})
            .then(response=>response.json())
            .then(json=> {
                console.log(json)
                this.setState({games: json})
            })
    }

    render() {
        return (
            <div className='pageBoxes'>
                {this.state.games.length>0 ?
                <ul id='charBox'>
                {this.state.games.map(game=> {
                    return (
                    <li className='oneGame'>{game.group_name}, being held at {game.location}.</li>
                    )
                })}
                </ul>
                :
                <div>No games yet. Click the button below to make one!</div>
                }
                <NavLink to='/new-game' id='newGameBtn'>
                <button >Make a new game! =></button>
                </NavLink>
            </div>
        );
    }
}

export default GameContainer;

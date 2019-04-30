import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

class GameContainer extends Component {
    state= {
        games: []
    }
    render() {
        return (
            <div className='pageBoxes'>
                {this.state.games.length>0 ?
                <ul id='charBox'>
                {this.state.games.map(game=> {
                    return (
                    <>
                    <li>{game.name}</li>
                    <p>being held at {game.location}</p>
                    </>
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

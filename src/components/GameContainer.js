import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux'
import { populateGames } from '../actions/appActions'

class GameContainer extends Component {

    componentDidMount(){
        this.props.populateGames()
    }
    render() {
        return (
            <div className='pageBoxes'>
                {this.props.games.length>0 ?
                <>
                <h2 className='topGreet'>Your Games:</h2>
                <ul className='charBox'>
                {this.props.games.map(gameObj=> {
                    return (
                    <li className='oneGame'>{gameObj.game.group_name}, being held at {gameObj.game.location}.</li>
                    )
                })}
                </ul>
                </>
                :
                <div className='empty'>No games yet. Click the button below to make one!</div>
                }
                <NavLink to='/new-game' id='newCharBtn'>
                <button >Make a new game! =></button>
                </NavLink>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        games: state.populateGamesReducer.games
    }
}
const mapDispatchToProps = dispatch => {
    return {
        populateGames: () => dispatch(populateGames())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);

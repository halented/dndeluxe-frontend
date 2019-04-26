import React, { Component } from 'react';

class Homepage extends Component {
    render() {
        return (
            <div className="pageBoxes">
                <h1 id='greeting'>Welcome, {localStorage.getItem('username')}!</h1>
                <div className="gameBox">
                    render most recently visited Game
                    <br/>
                    <button>View All Games => </button>
                </div>
                <img src="http://pre08.deviantart.net/4fab/th/pre/f/2012/338/c/8/don__t_starve___wilson___vector_by_kyuubi3000-d5n18nd.png" alt='avatar' className='avatar'></img>
                <button id='profieBtn'>View Full Profile =></button>
                <p id='oneLiner'>render most recently visited Character</p>
                <button id='charBtn'>View All Characters =></button>
            </div>
        );
    }
}

export default Homepage;

import React, { Component } from 'react';

class Game extends Component {
    render() {
        return (
            <div className='pageBoxes'>
                <h1 className='topGreetGame'>For this game...</h1>
                <p id='gs1' className='oneGameLink'>Saved location: "{this.props.game.game.location}"</p>
                <p id='gs2' className='oneGameLink'>Name: "{this.props.game.game.group_name}"</p>
                <p id='gs3' className='oneGameLink'>Details: "{this.props.game.game.details}"</p>
                <img src="/static/media/logo.6ce4d46c.png" alt="DnDeluxe Logo" class="profLogo"></img>
            </div>
        );
    }
}

export default Game;

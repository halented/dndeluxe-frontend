import React, { Component } from 'react';
import logo from '../logo.png'
import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import { connect } from 'react-redux'
import { populateCharacters, populateGames } from '../actions/appActions'

class Profile extends Component {
    state = {
        username: localStorage.getItem('username'),
        avatar: localStorage.getItem('avatar'),
        bio: localStorage.getItem('bio') || '',
        showEditForms: false
    }

    componentDidMount() {
        this.props.populateCharacters()
        this.props.populateGames()
    }

    handleClick = () => {
        this.setState({showEditForms: !this.state.showEditForms})
    }

    handleSubmit = (ev) => {
        ev.preventDefault()
        let postData = {user: {"username": this.state.username, "avatar": this.state.avatar, "bio": this.state.bio}}
        console.log(postData)
        fetch(`http://localhost:3000/users/${localStorage.getItem('userID')}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                Accept: "application/json",
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(response=>response.json())
        .then(json=> {
            localStorage.setItem('avatar',json.avatar)
            localStorage.setItem('username',json.username)
            localStorage.setItem('bio', json.bio)
        })
        .then(this.updatePage())
    }

    updatePage = () => {
        this.setState({showEditForms: false})
        toaster.notify("Profile Updated!")
    }

    handleChange = (ev) => {
        this.setState({[ev.target.name]: ev.target.value})
    }

    render() {
        return (
            <div className='pageBoxes'>
                {this.state.showEditForms ? 
                  <>
                    <form onSubmit={this.handleSubmit} id='profileForm'>
                        <h2 className='formGreet'>Time for a Change.</h2>
                        <label>Username: </label>
                        <p><input name='username' value={this.state.username} onChange={this.handleChange}></input></p>
                        <label>Avatar URL:</label>
                        <p><input name='avatar' value={this.state.avatar} onChange={this.handleChange}></input></p>
                        <label>Personal Bio:</label>
                        <p><textarea type='textarea' name='bio' id='bioEdit' value={this.state.bio} onChange={this.handleChange}></textarea></p>
                        <button type='submit'>Save</button>
                        <button onClick={this.handleClick} id='backBtn'>Go back</button>
                    </form>
                    <img src={logo} alt="DnDeluxe Logo" id='profLogo'></img>
                  </>
                 :
                  <>
                    <img id='avatarProfilePage' src={this.state.avatar} alt="A Pic of You!"></img>
                    <h2 id='greet2'>Lookin' good, {this.state.username}!</h2>
                    <h2 id='bioGreet'>Personal Bio:</h2>
                    <p className='bio'>{this.state.bio}</p>
                    <div className='deets'>You have {this.props.characters.length} character(s) currently playing in {this.props.games.length} game(s). Impressive!</div>
                    <button id='editProBtn' onClick={this.handleClick}>Edit profile</button>
                  </>
                }
            </div>
        );
    }
}

const mapPropsToState = (state) => {
    return {
        characters: state.populateCharactersReducer.characters,
        games: state.populateGamesReducer.games,
    }
 }
const mapDispatchToProps = dispatch => {
    return {
        populateCharacters: () => dispatch(populateCharacters()),
        populateGames: () => dispatch(populateGames())
    }
}

export default connect(mapPropsToState, mapDispatchToProps)(Profile);

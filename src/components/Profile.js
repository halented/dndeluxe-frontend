import React, { Component } from 'react';
import logo from '../logo.png'
import toaster from 'toasted-notes';
import { connect } from 'react-redux'

class Profile extends Component {
    state = {
        username: localStorage.getItem('username'),
        avatar: localStorage.getItem('avatar'),
        bio: localStorage.getItem('bio') || '',
        showEditForms: false
    }

    handleClick = () => {
        this.setState({showEditForms: !this.state.showEditForms})
    }

    handleSubmit = (ev) => {
        ev.preventDefault()
        let userData = {}
        userData["username"] = this.state.username
        userData["avatar"] = this.state.avatar
        userData["bio"] = this.state.bio
        let postData = {user: {userData}}
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
            console.log(json)
            // localStorage.setItem('avatar', json.user.avatar)
            // localStorage.setItem('username', json.user.username)
            // localStorage.setItem('bio', json.user.bio)
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
                    <img id='avatarProfilePage' src={localStorage.getItem('avatar')} alt="A Pic of You!"></img>
                    <h2 id='greet2'>Lookin' good, {localStorage.getItem('username')}!</h2>
                    {localStorage.getItem('bio')?
                        <p className='bio'>{localStorage.getItem('bio')}</p>
                        :
                        <p className='bio'>No bio has been provided. Click "Edit profile" to add a bio.</p>
                    }
                    <div className='deets'>You have {this.props.characters.length} character(s) currently playing in {this.props.games.length} game(s). Impressive!</div>
                    <button id='editProBtn' onClick={this.handleClick}>Edit profile</button>
                  </>
                }
            </div>
        );
    }
}

const mapPropsToState = (state) => {
    return{
        characters: state.populateCharactersReducer.characters,
        games: state.populateGamesReducer.games,
 }
 }

export default connect(mapPropsToState)(Profile);

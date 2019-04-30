import React, { Component } from 'react';
import { connect } from 'react-redux'
import {login, populateCharacters} from '../actions/appActions'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            avatar: '',
            showSignUp: false
        }
    }
    

    signUp = (ev)=> {
        ev.preventDefault()
        fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            user: {
            username: this.state.username,
            password: this.state.password,
            avatar: this.state.avatar
            }
        })
        })
        .then(r => r.json())
        .then(json=> {
            localStorage.setItem('token', json.jwt)
            localStorage.setItem('avatar', json.user_info.avatar)
            localStorage.setItem('username', json.user_info.username)
            localStorage.setItem('userID', json.user_info.id)
            localStorage.setItem('bio', json.user_info.bio)
            this.props.login()
        })
    }

    onChange = (ev) => {
        this.setState({[ev.target.name]: ev.target.value})
    }

    showForm = () => {
        this.setState({showSignUp: !this.state.showSignUp})
    }

    loginLocal=(ev)=>{
        console.log("what")
        ev.preventDefault()
        fetch("http://localhost:3000/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({user: {username: this.state.username, password: this.state.password}})
        })
        .then(response=>response.json())
        .then(
            json=>{
                localStorage.setItem('token', json.jwt)
                localStorage.setItem('userID', json.user_info.id)
                localStorage.setItem('avatar',json.user_info.avatar)
                localStorage.setItem('username',json.user_info.username)
                localStorage.setItem('bio', json.user_info.bio)
                this.props.login()
                this.props.populateCharacters()
        })
    }

    render() {
        return (
            <div className="login">
                { this.state.showSignUp ?
                <>
                    <form onSubmit={this.signUp}>
                        Enter a username and password, and a link to your avatar to sign up:
                        <p><input placeholder='username' name='username' className='loginputs' value={this.state.username} onChange={this.onChange}></input></p>
                        <p><input placeholder='password' name='password' className='loginputs' type='password' value={this.state.password} onChange={this.onChange}></input></p>
                        <p><input placeholder='avatar URL' name='avatar' className='loginputs' type='text' value={this.state.avatar} onChange={this.onChange}></input></p>
                        <button>submit</button>
                    </form>
                    <button onClick={this.showForm}>Go Back</button>
                </>
                :
                    <>
                        <form onSubmit={this.loginLocal} id='loginForm'>
                            <p id='a1'>Enter a username and password to login:</p>
                            <p id='a2'><input placeholder='username' 
                                    name='username' 
                                    className='loginputs' 
                                    value={this.state.username} 
                                    onChange={this.onChange}>
                                    </input></p>
                            <p id='a3'><input placeholder='password' 
                                    name='password' 
                                    className='loginputs' 
                                    type='password' 
                                    value={this.state.password} 
                                    onChange={this.onChange}>
                                    </input></p>
                            <button id='a4'>submit</button>
                        </form>
                        <p id='a5'>Or <button onClick={this.showForm} id='signupBtn'>click here</button> to signup!</p>
                    </>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userExists: state.userExists,
        avatar: state.avatar,
        bio: state.bio,
        username: state.username
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
      login: () => dispatch(login()),
      populateCharacters: () => (populateCharacters())
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Login);

import React, { Component } from 'react';
import { connect } from 'react-redux'
import {login, populateCharacters, populateGames} from '../actions/appActions'

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
            localStorage.setItem('bio', 'Click "Edit profile" to add a bio.')
            this.props.login()
            this.props.populateCharacters()
            this.props.populateGames()
        })
    }

    onChange = (ev) => {
        this.setState({[ev.target.name]: ev.target.value})
    }

    showForm = () => {
        this.setState({showSignUp: !this.state.showSignUp})
    }

    loginLocal=(ev)=>{
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
        .then(json=>{
                if(json.user_info){
                localStorage.setItem('token', json.jwt)
                localStorage.setItem('userID', json.user_info.id)
                localStorage.setItem('avatar',json.user_info.avatar)
                localStorage.setItem('username',json.user_info.username)
                localStorage.setItem('bio', json.user_info.bio)
                this.props.login()
                this.props.populateCharacters()
                this.props.populateGames()
            }
                else {
                    alert("No user found! Please sign up :)")
                }
        })
    }

    render() {
        return (
            <div className="login">
                { this.state.showSignUp ?
                <>
                    <form onSubmit={this.signUp} id='loginForm'>
                        <b className='a1'>New user info:</b>
                        <input  placeholder='username' name='username' className='loginputs a2' value={this.state.username} onChange={this.onChange}></input>
                        <input placeholder='password' name='password' className='loginputs a3' type='password' value={this.state.password} onChange={this.onChange}></input>
                        <input placeholder='avatar URL' name='avatar' className='loginputs a4' type='text' value={this.state.avatar} onChange={this.onChange}></input>
                        <button className='btns'>submit</button>
                    </form>
                    <button onClick={this.showForm} className='btns'>go back</button>
                </>
                :
                    <>
                        <form onSubmit={this.loginLocal} id='loginForm'>
                            <p className='a1'>Enter a username and password:</p>
                            <input placeholder='username' 
                                    name='username' 
                                    className='loginputs a2' 
                                    value={this.state.username} 
                                    onChange={this.onChange}>
                                    </input>
                            <input placeholder='password' 
                                    name='password' 
                                    className=' loginputs a3' 
                                    type='password' 
                                    value={this.state.password} 
                                    onChange={this.onChange}>
                                    </input>
                            <button className='a4'>submit</button>
                        </form>
                        <p className='a5'>Or <button onClick={this.showForm} id='signupBtn'>click here</button> to signup!</p>
                    </>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userExists: state.loginReducer.userExists
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
      login: () => dispatch(login()),
      populateCharacters: () => dispatch(populateCharacters()),
      populateGames: () => dispatch(populateGames())
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Login);

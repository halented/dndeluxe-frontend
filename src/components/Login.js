import React, { Component } from 'react';
// import { connect } from 'react-redux'
// import logo from '../logo.png'

class Login extends Component {
        state = {
            username: '',
            password: '',
            avatar: '',
            showSignUp: false
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
        .then(json=>{
            localStorage.setItem("token", json.jwt)
        })
    }

    onChange = (ev) => {
        this.setState({[ev.target.name]: ev.target.value})
    }
    showForm = () => {
        this.setState({showSignUp: true})
    }

    render() {
        return (
            <div className="login">
                { this.state.showSignUp ?
                    <form onSubmit={this.signUp}>
                        Enter a username and password, and a link to your avatar to sign up:
                        <p><input placeholder='username' name='username' className='loginputs' value={this.state.username} onChange={this.onChange}></input></p>
                        <p><input placeholder='password' name='password' className='loginputs' type='password' value={this.state.password} onChange={this.onChange}></input></p>
                        <p><input placeholder='avatar URL' name='avatar' className='loginputs' type='text' value={this.state.avatar} onChange={this.onChange}></input></p>
                        <button>submit</button>
                    </form>
                :
                    <div>Enter a username and password to login:
                        <p><input placeholder='username' name='username' className='loginputs' value={this.state.username} onChange={this.onChange}></input></p>
                        <p><input placeholder='password' name='password' className='loginputs' type='password' value={this.state.password} onChange={this.onChange}></input></p>
                        <button>submit</button>
                        <p>Or<button onClick={this.showForm}>click here</button> to signup!</p>
                    </div>
                }
            </div>
        );
    }
}

export default Login;

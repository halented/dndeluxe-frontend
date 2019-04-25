import React, { Component } from 'react';
// import { connect } from 'react-redux'
// import logo from '../logo.png'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }
    

    onSubmit= (ev)=> {
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
            password: this.state.password
            }
        })
        })
        .then(r => r.json())
        .then(console.log)
    }

    onChange = (ev) => {
        this.setState({[ev.target.name]: ev.target.value})
    }

    render() {
        return (
            <div className="login">
                <form onSubmit={this.onSubmit}>
                    Enter a username and password to login:
                    <p><input placeholder='username' name='username' className='loginputs' value={this.state.username} onChange={this.onChange}></input></p>
                    <p><input placeholder='password' name='password' className='loginputs' type='password' value={this.state.password} onChange={this.onChange}></input></p>
                    <button>submit</button>
                </form>
                <br/>
                Or <button onClick={this.newUser}>click here</button> to signup!
            </div>
        );
    }
}

export default Login;

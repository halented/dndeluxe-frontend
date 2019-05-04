import React, { Component } from 'react'
import { connect } from 'react-redux'
import {duxLogout} from '../actions/appActions'
import logo from '../logo.png'

class Logout extends Component {
    out = () => {
        localStorage.clear() 
        this.props.duxLogout()
        .then(window.location.href='/login')
    }
    ok = () => {
        alert("ok")
    }
    render() {
        return(
            <div className="pageBoxes">
                <h1 id='b1'>Truly logout tho?</h1>
                <h3 id='b2' onClick={this.out}>yep.</h3>
                <h3 id='b3' onClick={this.ok}>no!</h3>
                <img src={logo} alt="DnDeluxe Logo" id='profLogo'></img>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
      duxLogout: () => dispatch(duxLogout()),
    }
  }
export default connect(null, mapDispatchToProps)(Logout);
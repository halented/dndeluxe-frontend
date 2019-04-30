import React, { Component } from 'react'
import { connect } from 'react-redux'
import {duxLogout} from '../actions/appActions'

class Logout extends Component {
    out = () => {
        this.props.duxLogout()
    }
    ok = () => {
        alert("ok")
    }
    render() {
    return(
        <div className="pageBoxes">
            <h1>Truly logout tho?</h1>
            <h3 onClick={this.out}>yep.</h3>
            <h3 onClick={this.ok}>no!</h3>
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
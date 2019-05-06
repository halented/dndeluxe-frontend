import React, { Component } from 'react';
import { connect } from 'react-redux'
import { populateSpells } from '../actions/appActions'

class SpellSearch extends Component {
    state ={
        filteredSpells: []
    }
    componentWillReceiveProps(){
        this.setState({filteredSpells: this.props.spells})
        //saves the spells from disappearing when you refresh
    }
    componentDidMount(){
        this.setState({filteredSpells: this.props.spells})
        //saves the spells from disappearing when you click away from the comonent
    }
    filter = (ev) => {
        let tempList = []
        this.props.spells.forEach(spell => {
            if(spell.name.toLowerCase().includes(ev.target.value.toLowerCase())){
                tempList.push(spell)
            }
        })
        this.setState({filteredSpells: tempList})
    }

    render() {
        return (
            <div className='pageBoxes'>
                <div className='searchForm'>
                    <label id='slbl'>Enter spell name or keyword:</label>
                    <input placeholder="spell name or keyword" id='search' onChange={this.filter}></input>
                </div>
                <div className='resultBox'>
                        {this.state.filteredSpells.length > 0 ?
                        <ul className='spellList'>
                            {this.state.filteredSpells.map(spell=> {
                                return <li><a href={`/spell/${spell.id}`}>{spell.name}</a></li>
                            })}
                        </ul>
                    :
                    <ul className='spellList'></ul>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        spells: state.populateSpellsReducer.spells
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        populateSpells: ()=> dispatch(populateSpells())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SpellSearch);

import React, { Component } from 'react';

class SpellSearch extends Component {
    state= {
        spells: []
    }
 
    componentDidMount(){
        fetch('http://www.dnd5eapi.co/api/spells')
        .then(res=>res.json())
        .then(json=> {
            this.setState({spells: json.results})
        })
    }
    searchSubmit = (ev) => {
        ev.preventDefault()
        let term = document.getElementById('search').value
        let urls = []
        this.state.spells.forEach(spell=> {
            if(spell.name.toLowerCase().includes(term)) {
                urls.push(spell.url)
            }
        })
    }

    render() {
        return (
            <div className='pageBoxes'>
            <form className='searchForm' onSubmit={this.searchSubmit}>
                <label id='slbl'>Enter spell name or keyword:</label>
                <input placeholder="spell name or keyword" id='search'></input>
                <button type='submit' id='searchBtn'>submit</button>
            </form>
            <div id='resultBox'>

            </div>
            </div>
        );
    }
}

export default SpellSearch;

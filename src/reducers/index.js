import { combineReducers } from 'redux';
import loginReducer from './loginReducer.js';
import populateCharactersReducer from './populateCharactersReducer';
import populateGamesReducer from './populateGamesReducer';
import characterDetailsReducer from './characterDetailsReducer';
import populateSpellsReducer from './populateSpellsReducer';

export default combineReducers({
        loginReducer,
        populateCharactersReducer,
        populateGamesReducer,
        characterDetailsReducer,
        populateSpellsReducer
})
import { combineReducers } from 'redux'
import loginReducer from './loginReducer.js'
import populateCharactersReducer from './populateCharactersReducer'

export default combineReducers({
        loginReducer,
        populateCharactersReducer
})
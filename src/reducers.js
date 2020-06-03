import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import { ACTIONS } from './actions'

export default combineReducers({
	routing: routerReducer
})

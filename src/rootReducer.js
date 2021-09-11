import {combineReducers} from 'redux'
import {reducer as movieLibReducer} from './MovieLibrary'

const rootReducer = combineReducers({
  movieLib: movieLibReducer
});

export default rootReducer

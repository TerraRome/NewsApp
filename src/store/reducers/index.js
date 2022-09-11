import { combineReducers } from 'redux'

// Imports: Reducers
import auth from './auth'
import news from './news'

// Redux: Root Reducer
const rootReducer = combineReducers({
  auth,
  news,
})
// Exports
export default rootReducer
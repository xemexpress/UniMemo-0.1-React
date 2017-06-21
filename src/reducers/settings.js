import {
  SAVE_SETTINGS,
  ASYNC_START
} from '../constants/actionTypes'

export default (state={}, action) => {
  switch(action.type){
    case SAVE_SETTINGS:
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null
      }
    case ASYNC_START:
      return {
        ...state,
        inProgress: true
      }
    default:
  }
  return state
}

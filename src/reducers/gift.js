import {
  GIFT_PAGE_LOADED,
  GIFT_PAGE_UNLOADED,
  UPDATE_GIFT,
  SWITCH_ACCESS_GIFT
} from '../constants/actionTypes'

export default (state={}, action) => {
  switch(action.type){
    case GIFT_PAGE_LOADED:
      return {
        ...state,
        gift: action.error ? null : action.payload.gift
      }
    case GIFT_PAGE_UNLOADED:
      return {}
    case UPDATE_GIFT:
      return {
        ...state,
        gift: action.error ? null : action.payload.gift
      }
    case SWITCH_ACCESS_GIFT:
      return {
        ...state,
        gift: action.error ? null : action.payload.gift
      }
    default:
  }
  return state
}

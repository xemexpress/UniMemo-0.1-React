import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  TOGGLE_TYPES
} from '../constants/actionTypes'

export default (state = {}, action) => {
  switch(action.type){
    case HOME_PAGE_LOADED:
      return {
        tagType: action.payload[0].request_tags ? 'request' : 'gift',
        tags: action.payload[0].request_tags ? action.payload[0].request_tags : action.payload[0].gift_tags
      }
    case HOME_PAGE_UNLOADED:
      return {}
    case TOGGLE_TYPES:
      return {
        tagType: action.payload.request_tags ? 'request' : 'gift',
        tags: action.payload.request_tags ? action.payload.request_tags : action.payload.gift_tags
      }
    default:
  }
  return state
}

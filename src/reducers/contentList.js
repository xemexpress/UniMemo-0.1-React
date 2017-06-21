import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
  CHANGE_TAB,
  SWITCH_TAKINGS,
  APPLY_TAG_FILTER,
  SET_PAGE,
  WISH_REQUEST,
  UNWISH_REQUEST
} from '../constants/actionTypes'

export default (state={}, action) => {
  switch(action.type){
    case HOME_PAGE_LOADED:
      return {
        ...state,
        tab: action.tab,
        tag: null,
        requests: action.payload[1].requests ? action.payload[1].requests : null,
        requestsCount: action.payload[1].requestsCount ? action.payload[1].requestsCount : null,
        gifts: action.payload[1].gifts ? action.payload[1].gifts : null,
        giftsCount: action.payload[1].giftsCount ? action.payload[1].giftsCount : null,
        currentPage: 0
      }
    case HOME_PAGE_UNLOADED:
      return {}
    case PROFILE_PAGE_LOADED:
      return {
        ...state,
        requests: action.payload[1].requests,
        requestsCount: action.payload[1].requestsCount,
        currentPage: 0
      }
    case SWITCH_TAKINGS:
      return {
        ...state,
        requests: action.payload.requests,
        requestsCount: action.payload.requestsCount,
        currentPage: 0
      }
    case PROFILE_PAGE_UNLOADED:
      return {}
    case CHANGE_TAB:
      if(action.payload.requests){
        return {
          ...state,
          tag: null,
          tab: action.tab,
          requests: action.payload.requests,
          requestsCount: action.payload.requestsCount,
          gifts: null,
          giftsCount: null,
          currentPage: 0
        }
      }else{
        return {
          ...state,
          tag: null,
          tab: action.tab,
          requests: null,
          requestsCount: null,
          gifts: action.payload.gifts,
          giftsCount: action.payload.giftsCount,
          currentPage: 0
        }
      }
    case APPLY_TAG_FILTER:
      if(action.payload.requests){
        return {
          ...state,
          tag: action.tag,
          tab: null,
          requests: action.payload.requests,
          requestsCount: action.payload.requestsCount,
          gifts: null,
          giftsCount: null,
          currentPage: 0
        }
      }else{
        return {
          ...state,
          tag: action.tag,
          tab: null,
          requests: null,
          requestsCount: null,
          gifts: action.payload.gifts,
          giftsCount: action.payload.giftsCount,
          currentPage: 0
        }
      }
    case WISH_REQUEST:
    case UNWISH_REQUEST:
      return {
        ...state,
        requests: state.requests.map(request => {
          if(action.payload.request.requestId === request.requestId){
            return {
              ...request,
              wished: action.payload.request.wished,
              wishesCount: action.payload.request.wishesCount
            }
          }
          return request
        })
      }
    case SET_PAGE:
      return {
        ...state,
        currentPage: action.page,
        requests: action.payload.requests ? action.payload.requests : null,
        requestsCount: action.payload.requestsCount ? action.payload.requestsCount : null,
        gifts: action.payload.gifts ? action.payload.gifts : null,
        giftsCount: action.payload.giftsCount ? action.payload.giftsCount : null,
      }
    default:
  }
  return state
}

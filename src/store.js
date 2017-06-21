import { applyMiddleware, createStore, combineReducers } from 'redux'

import common from './reducers/common'
import auth from './reducers/auth'
import home from './reducers/home'
import settings from './reducers/settings'
import profile from './reducers/profile'
import contentList from './reducers/contentList'
import request from './reducers/request'
import requestEditor from './reducers/requestEditor'
import gift from './reducers/gift'
import giftEditor from './reducers/giftEditor'
import { promiseMiddleware, localStorageMiddleware } from './middleware'

const reducer = combineReducers({
  common,
  auth,
  home,
  profile,
  settings,
  contentList,
  request,
  requestEditor,
  gift,
  giftEditor
})

const middleware = applyMiddleware(promiseMiddleware, localStorageMiddleware)

const store = createStore(reducer, middleware)

export default store

import { APP_UPDATE_NAME, APP_UPDATE_CURRENCY, APP_UPDATE_AUTHOR } from "../constants/appConstants";

function appReducer(state = { appName: '', priceUnit: '' }, action) {
  switch (action.type) {
    case APP_UPDATE_NAME:
      return { ...state, appName: action.payload };
    case APP_UPDATE_CURRENCY:
      return { ...state, currency: action.payload };
    case APP_UPDATE_AUTHOR:
      return {...state, author: action.payload};
    default:
      return state
  }
}

export { appReducer }
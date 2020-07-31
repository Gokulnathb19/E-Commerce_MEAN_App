import { APP_UPDATE_NAME, APP_UPDATE_PRICE_UNIT } from "../constants/appConstants";

function appReducer(state = { appName: '', priceUnit: '' }, action) {
  switch (action.type) {
    case APP_UPDATE_NAME:
      return { ...state, appName: action.payload };
    case APP_UPDATE_PRICE_UNIT:
      return { ...state, priceUnit: action.payload };
    default:
      return state
  }
}

export { appReducer }
import { APP_UPDATE_NAME, APP_UPDATE_PRICE_UNIT } from "../constants/appConstants";

const updateAppName = (data) => (dispatch) => {
  dispatch({ type: APP_UPDATE_NAME, payload: data });
}
const updatePriceUnit = (data) => (dispatch) => {
  dispatch({ type: APP_UPDATE_PRICE_UNIT, payload: data });
}
export { updateAppName, updatePriceUnit }
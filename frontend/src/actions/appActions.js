import { APP_UPDATE_NAME, APP_UPDATE_CURRENCY, APP_UPDATE_AUTHOR } from "../constants/appConstants";

const updateAppName = (data) => (dispatch) => {
  dispatch({ type: APP_UPDATE_NAME, payload: data });
}
const updateCurrency = (data) => (dispatch) => {
  dispatch({ type: APP_UPDATE_CURRENCY, payload: data });
}
const updateAuthor = (data) => (dispatch) => {
  dispatch({ type: APP_UPDATE_AUTHOR, payload: data });
}
export { updateAppName, updateCurrency, updateAuthor }
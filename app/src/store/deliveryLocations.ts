import { Action, Reducer } from "redux";
import { AppThunkAction } from ".";
import * as constants from "./constants";
import * as types from "./types";
import ErrorHandler from "../functions/errorHandler";

const unloadedState: types.locations = {
  locations: []
};

export const actionCreators = {
  loadLocations: (): AppThunkAction<any> => dispatch => {
    fetch("https://cartegraphapi.azurewebsites.us/pghSupply/deliveryLocations", {
      method: "get",
      headers: new Headers({
        Authorization: "Bearer " + process.env.REACT_APP_CART_API
      })
    })
      .then(res => res.json())
      .then(data => {
        dispatch({ type: constants.getLocations, locations: data });
      })
      .catch(err => ErrorHandler(err));
  }
};

export const reducer: Reducer<types.locations> = (
  state: types.locations,
  incomingAction: Action
) => {
  const action = incomingAction as any;
  switch (action.type) {
    case constants.getLocations:
      return { ...state, locations: action.locations };
  }
  return state || unloadedState;
};

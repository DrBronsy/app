import {ActionTypes, Update} from 'actions/router';


export type RouterState = {
  location: string;
  modified: string;
};

export const initialState: RouterState = {
  location: '/',
  modified: ''
};

export const router = (state = initialState, action: Update) => {
  switch (action.type) {
    case ActionTypes.UPDATE:
      return {...state, location: action.location};
    default:
      return state;
  }
};
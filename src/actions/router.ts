export enum ActionTypes {
  UPDATE = '[ROUTER] UPDATE'
}

export interface Update {
  type: ActionTypes.UPDATE;
  location: string;
}

export const updateLocation = (location: string): Update => ({
  type: ActionTypes.UPDATE,
  location
});
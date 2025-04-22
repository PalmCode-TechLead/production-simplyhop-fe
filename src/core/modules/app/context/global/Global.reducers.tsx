import { GlobalActionEnum, GlobalActions, GlobalAlert } from "./Global.types";

// Alert
export const GlobalAlertReducers = (
  state: GlobalAlert,
  action: GlobalActions
) => {
  switch (action.type) {
    case GlobalActionEnum.SetAlertData:
      return action.payload;

    default:
      return state;
  }
};

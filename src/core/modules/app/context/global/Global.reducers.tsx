import {
  GlobalActionEnum,
  GlobalActions,
  GlobalAlert,
  GlobalChat,
} from "./Global.types";

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

// Chat
export const GlobalChatReducers = (
  state: GlobalChat,
  action: GlobalActions
) => {
  switch (action.type) {
    case GlobalActionEnum.SetChatData: {
      return action.payload;
    }

    default:
      return state;
  }
};

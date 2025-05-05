type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

// State Collection Types
export interface GlobalInitialStateType {
  alert: GlobalAlert;
  chat: GlobalChat;
}

// State Collection Types consist of:
export interface GlobalAlert {
  items: {
    id: string;
    variant: "info" | "error" | "warning" | "success";
    message: string;
  }[];
}

export interface GlobalChat {
  count: number;
}

export enum GlobalActionEnum {
  // Alert
  SetAlertData = "SetAlertData",
  // Chat
  SetChatData = "SetChatData",
}

// Action Collection Types
export type GlobalActions = GlobalAlertActions | GlobalChatActions;

// Action Collection Types consist of:
// Alert
type GlobalAlertPayload = {
  [GlobalActionEnum.SetAlertData]: GlobalAlert;
};

export type GlobalAlertActions =
  ActionMap<GlobalAlertPayload>[keyof ActionMap<GlobalAlertPayload>];

// Chat
type GlobalChatPayload = {
  [GlobalActionEnum.SetChatData]: GlobalChat;
};

export type GlobalChatActions =
  ActionMap<GlobalChatPayload>[keyof ActionMap<GlobalChatPayload>];

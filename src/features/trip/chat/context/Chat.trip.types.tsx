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
export interface ChatTripInitialStateType {
  list: ChatTripList;
  conversation: ChatTripConversation;
}

// State Collection Types consist of:
export interface ChatTripList {
  city: {
    items: { id: string; name: string }[];
  };
}

export interface ChatTripConversation {
  message: {
    items: [];
  };
  input: {
    value: string;
  };
}

export enum ChatTripActionEnum {
  // List
  SetListData = "SetListData",
  // Conversation
  SetConversationData = "SetConversationData",
}

// Action Collection Types
export type ChatTripActions = ChatTripListActions | ChatTripConversationActions;

// Action Collection Types consist of:
// List
type ChatTripListPayload = {
  [ChatTripActionEnum.SetListData]: ChatTripList;
};

export type ChatTripListActions =
  ActionMap<ChatTripListPayload>[keyof ActionMap<ChatTripListPayload>];

// Conversation
type ChatTripConversationPayload = {
  [ChatTripActionEnum.SetConversationData]: ChatTripConversation;
};

export type ChatTripConversationActions =
  ActionMap<ChatTripConversationPayload>[keyof ActionMap<ChatTripConversationPayload>];

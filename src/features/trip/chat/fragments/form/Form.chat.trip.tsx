import * as React from "react";
import clsx from "clsx";
import { ChatTripActionEnum, ChatTripContext } from "../../context";
import SVGIcon from "@/core/icons";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { ChatField } from "@/core/components/chatfield";
import { getDictionaries } from "../../i18n";
import { usePostMessagesChat } from "../../react_query/hooks";
import { MoonLoader } from "@/core/components/moon_loader";

export const FormChatTrip = () => {
  const dictionaries = getDictionaries();
  const { state, dispatch } = React.useContext(ChatTripContext);
  const [isEmojiOpen, setIsEmojiOpen] = React.useState<boolean>(false);
  const { mutateAsync: postMessagesChat, isPending: isPendingPostMessageChat } =
    usePostMessagesChat();
  const handleClickEmoji = () => {
    setIsEmojiOpen((prev) => !prev);
  };

  const handleChangeChat = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ChatTripActionEnum.SetRoomData,
      payload: {
        ...state.room,
        chat: {
          ...state.room.chat,
          input: {
            ...state.room.chat.input,
            value: e.currentTarget.value,
          },
        },
      },
    });
  };

  const handleSelectEmoji = (emojiData: EmojiClickData) => {
    dispatch({
      type: ChatTripActionEnum.SetRoomData,
      payload: {
        ...state.room,
        chat: {
          ...state.room.chat,
          input: {
            ...state.room.chat.input,
            value: state.room.chat.input.value + emojiData.emoji,
          },
        },
      },
    });
    setIsEmojiOpen(false);
  };

  const handleClickSend = async () => {
    if (!state.room.chat.input.value.length) return;
    const res = await postMessagesChat();

    if (!res) return;
    dispatch({
      type: ChatTripActionEnum.SetRoomData,
      payload: {
        ...state.room,
        chat: {
          ...state.room.chat,
          input: {
            ...state.room.chat.input,
            value: "",
          },
        },
      },
    });
  };

  const isLoadingSendChat = isPendingPostMessageChat;
  const isDisabledSendChat =
    isPendingPostMessageChat || state.room.booking.status !== "accepted";
  return (
    <div
      className={clsx(
        "grid-cols-[1.5rem_1fr_auto]",
        "grid items-center content-center justify-start justify-items-start gap-[0.625rem]",
        "w-full",
        "px-[1rem] lg:px-[2.5rem] py-[1rem]",
        "border-t border-t-[#DFDFDF]"
      )}
    >
      <div className={clsx("relative")}>
        <button
          onClick={() => {
            if (isDisabledSendChat) return;
            handleClickEmoji();
          }}
        >
          <SVGIcon
            name="Smile"
            className={clsx("w-[1.5rem] h-[1.5rem]", "text-[#BDBDBD]")}
          />
        </button>
        {isEmojiOpen && (
          <EmojiPicker
            className={clsx(
              "!absolute",
              "top-[-480px] lg:left-[-175px] left-[0px]",
              "z-[10]"
            )}
            onEmojiClick={handleSelectEmoji}
          />
        )}
      </div>

      <ChatField
        labelProps={{ ...dictionaries.chat.room.message.labelProps }}
        inputProps={{
          ...dictionaries.chat.room.message.inputProps,
          disabled: state.room.booking.status !== "accepted",
          value: state.room.chat.input.value,
          onChange: handleChangeChat,
          onKeyDown: (e) => {
            if (e.key === "Enter" && !isLoadingSendChat) {
              handleClickSend();
            }
          },
        }}
      />
      <button
        className={clsx(
          "grid grid-flow-col place-content-center place-items-center gap-[0.625rem]",
          "px-[0.75rem] py-[0.625rem]",
          "bg-[#05912A] disabled:bg-[#F6F6F6]",
          "rounded-[0.375rem]",
          "text-[0.875rem] text-[white] disabled:text-[#5B5B5B] font-normal"
        )}
        type="submit"
        disabled={isDisabledSendChat}
        onClick={handleClickSend}
      >
        {dictionaries.chat.room.cta.send.children}
        {isLoadingSendChat ? (
          <MoonLoader size={16} color={"white"} />
        ) : (
          <SVGIcon
            name="SendHorizonal"
            className={clsx(
              "w-[1rem] h-[1rem]",
              isDisabledSendChat ? "text-[#5B5B5B]" : "text-[white]"
            )}
          />
        )}
      </button>
    </div>
  );
};

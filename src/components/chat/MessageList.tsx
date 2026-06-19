import type { Message } from "@/lib/chat/types";
import {
  CHAT_CTA_BUTTON_CLASS,
  CHAT_INPUT_CLASS,
  chatBubbleClass,
} from "@/lib/chatStyles";

export function MessageList({
  messages,
  viewer,
}: {
  messages: Message[];
  viewer: "visitor" | "admin";
}) {
  if (messages.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted">
        No messages yet. Say hello to start the conversation.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {messages.map((message) => {
        const isOwn =
          viewer === "visitor"
            ? message.sender_type === "visitor"
            : message.sender_type === "admin";
        const isDispatch = message.sender_type === "admin";

        return (
          <li
            key={message.id}
            className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
          >
            <div className={chatBubbleClass(isOwn)}>
              {!isOwn && isDispatch ? (
                <p className="mb-1 text-[0.65rem] font-semibold uppercase tracking-wider text-accent">
                  Dispatch
                </p>
              ) : null}
              <p className="whitespace-pre-wrap break-words">{message.body}</p>
              <p
                className={`mt-1.5 text-[0.7rem] ${isOwn ? "text-blue-100" : "text-muted"}`}
              >
                {new Date(message.created_at).toLocaleString(undefined, {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function ChatComposer({
  placeholder,
  disabled,
  onSend,
  embedded = false,
}: {
  placeholder: string;
  disabled?: boolean;
  onSend: (body: string) => Promise<void>;
  /** When true, parent already provides a top border (chat thread footer). */
  embedded?: boolean;
}) {
  return (
    <form
      className={
        embedded
          ? "flex flex-col gap-3 sm:flex-row sm:items-end"
          : "flex flex-col gap-3 border-t border-blue-100/80 pt-4 sm:flex-row sm:items-end"
      }
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const input = form.elements.namedItem("body") as HTMLTextAreaElement;
        const text = input.value.trim();
        if (!text) return;
        await onSend(text);
        input.value = "";
      }}
    >
      <label className="flex-1">
        <span className="sr-only">Message</span>
        <textarea
          name="body"
          rows={3}
          placeholder={placeholder}
          disabled={disabled}
          className={`${CHAT_INPUT_CLASS} min-h-[4.5rem] resize-y`}
        />
      </label>
      <button
        type="submit"
        disabled={disabled}
        className={`${CHAT_CTA_BUTTON_CLASS} shrink-0 sm:min-h-[48px]`}
      >
        Send
      </button>
    </form>
  );
}

export { CHAT_INPUT_CLASS as inputClass };

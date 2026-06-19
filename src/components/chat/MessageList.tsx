import type { Message } from "@/lib/chat/types";

const inputClass =
  "min-h-12 w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-base text-slate-900 outline-none ring-amber-300/40 focus:ring-2";

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

        return (
          <li
            key={message.id}
            className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
          >
            <div
              className={[
                "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm sm:max-w-[75%] sm:text-base",
                isOwn
                  ? "rounded-br-md bg-blue-600 text-white"
                  : "rounded-bl-md border border-blue-100/90 bg-white text-slate-800",
              ].join(" ")}
            >
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
}: {
  placeholder: string;
  disabled?: boolean;
  onSend: (body: string) => Promise<void>;
}) {
  return (
    <form
      className="flex flex-col gap-3 border-t border-blue-100/80 pt-4 sm:flex-row sm:items-end"
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
          className={`${inputClass} min-h-[4.5rem] resize-y`}
        />
      </label>
      <button
        type="submit"
        disabled={disabled}
        className="min-h-[52px] shrink-0 rounded-full bg-cta px-8 py-3.5 text-base font-bold text-cta-foreground shadow-lg shadow-amber-900/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-cta-hover disabled:cursor-not-allowed disabled:opacity-60 sm:min-h-[48px]"
      >
        Send
      </button>
    </form>
  );
}

export { inputClass };

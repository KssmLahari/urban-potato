export type ConversationStatus = "open" | "closed";

export type SenderType = "visitor" | "admin";

export type Conversation = {
  id: string;
  visitor_name: string;
  visitor_email: string;
  status: ConversationStatus;
  created_at: string;
  updated_at: string;
};

export type Message = {
  id: string;
  conversation_id: string;
  sender_type: SenderType;
  body: string;
  created_at: string;
};

export type ConversationWithPreview = Conversation & {
  last_message: string | null;
  last_message_at: string | null;
};

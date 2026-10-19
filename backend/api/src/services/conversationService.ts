import { randomUUID } from 'node:crypto';

export interface ConversationRecord {
  id: string;
  userId: string;
  messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>;
  createdAt: string;
  updatedAt: string;
}

const conversations = new Map<string, ConversationRecord>();

export const createConversation = (userId: string): ConversationRecord => {
  const record: ConversationRecord = {
    id: randomUUID(),
    userId,
    messages: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  conversations.set(record.id, record);
  return record;
};

export const appendMessage = (
  conversationId: string,
  message: { role: 'user' | 'assistant' | 'system'; content: string },
): ConversationRecord | null => {
  const conversation = conversations.get(conversationId);

  if (!conversation) {
    return null;
  }

  conversation.messages.push(message);
  conversation.updatedAt = new Date().toISOString();
  return conversation;
};

export const listConversationHistory = (conversationId: string): ConversationRecord | null => {
  return conversations.get(conversationId) ?? null;
};

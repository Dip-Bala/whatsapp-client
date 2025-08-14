// src/state/atoms.ts
import { atom, atomFamily } from "recoil";

export type NavItemsTypes = "messages" | "channels" | "community" | "status";

export interface User {
  name: string;
  email: string;
  profilePicUrl?: string;
  status?: "online" | "offline";
}

export interface Message {
  _id?: string;
  sender: string;
  receiver: string;
  senderEmail: string;
  receiverEmail: string;
  text: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
}

export interface Chat {
  chatId: string;
  participant: User;
  lastMessage: Message;
  unreadCount: number;
}

export const navAtom = atom<NavItemsTypes>({
  key: "navAtom",
  default: "messages",
});

export const chatsAtom = atom<Chat[]>({
  key: "chatsAtom",
  default: [],
});

export const messagesAtom = atomFamily<Message[], string>({
  key: "messagesAtom",
  default: [],
});

export const userAtom = atom<User | null>({
  key: "userAtom",
  default: null,
});

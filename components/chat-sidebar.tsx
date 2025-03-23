"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, MessageSquare, Trash2 } from "lucide-react"

interface Chat {
  id: string
  title: string
  lastMessage: string
  timestamp: Date
}

interface ChatSidebarProps {
  onChatSelect: (chatId: string) => void
  activeChatId: string | null
}

export function ChatSidebar({ onChatSelect, activeChatId }: ChatSidebarProps) {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      title: "Web Application Architecture",
      lastMessage: "Generate a web application architecture with frontend and backend",
      timestamp: new Date(),
    },
    {
      id: "2",
      title: "Microservices Setup",
      lastMessage: "Create a microservices architecture with API Gateway",
      timestamp: new Date(),
    },
  ])

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: "New Chat",
      lastMessage: "Start a new architecture design",
      timestamp: new Date(),
    }
    setChats((prev) => [newChat, ...prev])
    onChatSelect(newChat.id)
  }

  const deleteChat = (chatId: string) => {
    setChats((prev) => prev.filter((chat) => chat.id !== chatId))
    if (activeChatId === chatId) {
      onChatSelect("")
    }
  }

  return (
    <div className="flex flex-col h-full border-r">
      <div className="p-4 border-b">
        <Button onClick={createNewChat} className="w-full" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-accent ${
                activeChatId === chat.id ? "bg-accent" : ""
              }`}
              onClick={() => onChatSelect(chat.id)}
            >
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{chat.title}</span>
                  <span className="text-xs text-muted-foreground truncate max-w-[150px]">
                    {chat.lastMessage}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation()
                  deleteChat(chat.id)
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
} 
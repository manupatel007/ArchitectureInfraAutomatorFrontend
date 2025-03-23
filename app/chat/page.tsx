"use client"

import { useState } from "react"
import { AzureArchitectureDiagram } from "@/components/azure-architecture-diagram"
import { ChatSidebar } from "@/components/chat-sidebar"
import { Navbar } from "@/components/navbar"

export default function ChatPage() {
  const [activeChatId, setActiveChatId] = useState("default")

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <ChatSidebar
          activeChatId={activeChatId}
          onChatSelect={setActiveChatId}
        />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-6">
            <AzureArchitectureDiagram chatId={activeChatId} />
          </div>
        </main>
      </div>
    </div>
  )
} 
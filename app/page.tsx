"use client"

import { useState } from "react"
import { AzureArchitectureDiagram } from "@/components/azure-architecture-diagram"
import { ChatSidebar } from "@/components/chat-sidebar"

export default function Home() {
  const [activeChatId, setActiveChatId] = useState<string | null>("1")

  return (
    <main className="flex h-screen">
      <div className="w-64 flex-shrink-0">
        <ChatSidebar onChatSelect={setActiveChatId} activeChatId={activeChatId} />
      </div>
      <div className="flex-1 overflow-auto">
        <AzureArchitectureDiagram chatId={activeChatId} />
      </div>
    </main>
  )
}


"use client"

import { Button } from "@/components/ui/button"
import { signOut, getCurrentUser } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import type { User } from "@/lib/auth"

export function Navbar() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
  }, [])

  const handleSignOut = () => {
    signOut()
    router.push("/auth/signin")
  }

  if (!user) return null

  return (
    <nav className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="h-8 w-8 rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user.name}</span>
              <span className="text-xs text-muted-foreground">{user.email}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleSignOut}>
            Sign out
          </Button>
        </div>
      </div>
    </nav>
  )
} 
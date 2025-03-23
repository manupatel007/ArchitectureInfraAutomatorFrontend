"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { signInWithGoogle, signInWithMicrosoft } from "@/lib/auth"
import { useRouter } from "next/navigation"

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signInWithGoogle()
      window.location.href = "/chat"
    } catch (error) {
      console.error("Failed to sign in with Google:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleMicrosoftSignIn = async () => {
    setIsLoading(true)
    try {
      await signInWithMicrosoft()
      window.location.href = "/chat"
    } catch (error) {
      console.error("Failed to sign in with Microsoft:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-xl font-bold">Azure Architecture Designer</div>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Choose your preferred sign-in method to continue
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleMicrosoftSignIn}
                disabled={isLoading}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M11.4 24H0l11.4-11.4L0 0h11.4l11.4 12-11.4 12z"
                    fill="#00A4EF"
                  />
                  <path
                    d="M11.4 24H0l11.4-11.4L0 0h11.4l11.4 12-11.4 12z"
                    fill="#7FBA00"
                  />
                  <path
                    d="M11.4 24H0l11.4-11.4L0 0h11.4l11.4 12-11.4 12z"
                    fill="#F25022"
                  />
                  <path
                    d="M11.4 24H0l11.4-11.4L0 0h11.4l11.4 12-11.4 12z"
                    fill="#FFB900"
                  />
                </svg>
                Continue with Microsoft
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
} 
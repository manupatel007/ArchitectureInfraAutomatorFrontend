"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wand2, Network, Rocket } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-xl font-bold">Azure Architecture Designer</div>
          <Link href="/auth/signin">
            <Button>Sign In</Button>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Design Azure Architectures with AI</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create, visualize, and deploy Azure architectures using natural language. Let AI help you design the perfect cloud infrastructure.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Wand2 className="h-8 w-8 mb-2" />
                <CardTitle>AI-Powered Design</CardTitle>
                <CardDescription>Describe your requirements in plain English</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Simply tell us what you need, and our AI will help you design the perfect Azure architecture.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Network className="h-8 w-8 mb-2" />
                <CardTitle>Interactive Diagrams</CardTitle>
                <CardDescription>Visualize your architecture in real-time</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  See your architecture come to life with interactive diagrams and detailed component information.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Rocket className="h-8 w-8 mb-2" />
                <CardTitle>One-Click Deployment</CardTitle>
                <CardDescription>Deploy directly to Azure</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Generate and deploy ARM templates with a single click, or export them for manual deployment.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-12">
            <Link href="/auth/signin">
              <Button size="lg">Get Started</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}


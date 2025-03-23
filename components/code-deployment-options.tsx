"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code2, Download, Upload, Play } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface CodeDeploymentOptionsProps {
  resources: any[]
  onGenerateCode: (resourceType: string) => Promise<void>
  onDeployCode: (resourceType: string) => Promise<void>
  onDownloadCode: (resourceType: string) => Promise<void>
}

export function CodeDeploymentOptions({
  resources,
  onGenerateCode,
  onDeployCode,
  onDownloadCode,
}: CodeDeploymentOptionsProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDeploying, setIsDeploying] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const functionApps = resources.filter((r) => r.type === "function")
  const webApps = resources.filter((r) => r.type === "appService")

  const handleGenerateCode = async (resourceType: string) => {
    setIsGenerating(true)
    setError(null)
    try {
      await onGenerateCode(resourceType)
    } catch (err) {
      setError("Failed to generate code. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDeployCode = async (resourceType: string) => {
    setIsDeploying(true)
    setError(null)
    try {
      await onDeployCode(resourceType)
    } catch (err) {
      setError("Failed to deploy code. Please try again.")
    } finally {
      setIsDeploying(false)
    }
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Code Generation & Deployment</CardTitle>
        <CardDescription>
          Generate and deploy code for your Azure resources
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Tabs defaultValue="function-apps">
          <TabsList>
            <TabsTrigger value="function-apps">Function Apps</TabsTrigger>
            <TabsTrigger value="web-apps">Web Apps</TabsTrigger>
          </TabsList>
          <TabsContent value="function-apps">
            <div className="space-y-4">
              {functionApps.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{app.name}</h4>
                    <p className="text-sm text-muted-foreground">{app.runtime}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleGenerateCode(app.id)}
                      disabled={isGenerating}
                    >
                      <Code2 className="h-4 w-4 mr-2" />
                      Generate Code
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDownloadCode(app.id)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleDeployCode(app.id)}
                      disabled={isDeploying}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Deploy
                    </Button>
                  </div>
                </div>
              ))}
              {functionApps.length === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  No Function Apps found in your architecture
                </p>
              )}
            </div>
          </TabsContent>
          <TabsContent value="web-apps">
            <div className="space-y-4">
              {webApps.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{app.name}</h4>
                    <p className="text-sm text-muted-foreground">{app.runtime}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleGenerateCode(app.id)}
                      disabled={isGenerating}
                    >
                      <Code2 className="h-4 w-4 mr-2" />
                      Generate Code
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDownloadCode(app.id)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleDeployCode(app.id)}
                      disabled={isDeploying}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Deploy
                    </Button>
                  </div>
                </div>
              ))}
              {webApps.length === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  No Web Apps found in your architecture
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
} 
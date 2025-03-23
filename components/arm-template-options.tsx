"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"

interface ArmTemplateOptionsProps {
  armTemplate: string
  onDeploy: () => Promise<void>
  onExport: () => void
  isDeploying: boolean
}

export function ArmTemplateOptions({ armTemplate, onDeploy, onExport, isDeploying }: ArmTemplateOptionsProps) {
  const [activeTab, setActiveTab] = useState("deploy")

  return (
    <Card>
      <CardHeader>
        <CardTitle>ARM Template</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="deploy">Deploy to Azure</TabsTrigger>
            <TabsTrigger value="export">Export Template</TabsTrigger>
          </TabsList>
          
          <TabsContent value="deploy" className="space-y-4">
            <div className="text-sm text-muted-foreground">
              Deploy this template directly to your Azure subscription using your authenticated account.
            </div>
            <Button 
              onClick={onDeploy} 
              disabled={isDeploying} 
              className="w-full"
            >
              {isDeploying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deploying...
                </>
              ) : (
                "Deploy to Azure"
              )}
            </Button>
          </TabsContent>

          <TabsContent value="export" className="space-y-4">
            <div className="text-sm text-muted-foreground">
              Download the ARM template JSON file to deploy manually or store for later use.
            </div>
            <Button 
              onClick={onExport} 
              variant="outline" 
              className="w-full"
            >
              Download Template
            </Button>
          </TabsContent>
        </Tabs>

        <div className="mt-4">
          <pre className="bg-muted p-4 rounded-md text-xs overflow-auto max-h-[200px]">
            {armTemplate}
          </pre>
        </div>
      </CardContent>
    </Card>
  )
} 
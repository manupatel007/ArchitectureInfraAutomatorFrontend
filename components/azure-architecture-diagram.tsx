"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResourceForm } from "@/components/resource-form"
import { ConnectionForm } from "@/components/connection-form"
import { DiagramView } from "@/components/diagram-view"
import { AiPromptForm } from "@/components/ai-prompt-form"
import type { ResourceNode, Connection } from "@/lib/types"
import { Download } from "lucide-react"

interface AzureArchitectureDiagramProps {
  chatId: string | null
}

export function AzureArchitectureDiagram({ chatId }: AzureArchitectureDiagramProps) {
  const [resources, setResources] = useState<ResourceNode[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const [activeTab, setActiveTab] = useState("ai")
  const [isGeneratingArm, setIsGeneratingArm] = useState(false)
  const [armTemplate, setArmTemplate] = useState<string | null>(null)

  // Reset state when chat changes
  useEffect(() => {
    setResources([])
    setConnections([])
    setArmTemplate(null)
  }, [chatId])

  const addResource = (resource: ResourceNode) => {
    setResources((prev) => [...prev, { ...resource, id: `resource-${prev.length + 1}` }])
  }

  const removeResource = (id: string) => {
    setResources((prev) => prev.filter((resource) => resource.id !== id))
    setConnections((prev) => prev.filter((connection) => connection.source !== id && connection.target !== id))
  }

  const addConnection = (connection: Connection) => {
    setConnections((prev) => [...prev, connection])
  }

  const removeConnection = (id: string) => {
    setConnections((prev) => prev.filter((connection) => connection.id !== id))
  }

  const exportDiagram = () => {
    // This would be implemented to export the diagram as an image
    alert("Export functionality would save the diagram as PNG/SVG")
  }

  const generateArmTemplate = async () => {
    setIsGeneratingArm(true)
    try {
      // In a real implementation, this would call an API to generate the ARM template
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API call

      // Sample ARM template for demonstration
      const template = JSON.stringify(
        {
          $schema: "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
          contentVersion: "1.0.0.0",
          resources: resources.map((resource) => ({
            type: getArmResourceType(resource.type),
            apiVersion: "2021-02-01",
            name: resource.name,
            location: "[resourceGroup().location]",
            properties: {},
          })),
        },
        null,
        2,
      )

      setArmTemplate(template)
    } finally {
      setIsGeneratingArm(false)
    }
  }

  const downloadArmTemplate = () => {
    if (!armTemplate) return

    const blob = new Blob([armTemplate], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "azure-deployment.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!chatId) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Select a chat or create a new one to start designing your architecture</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
      <Card className="lg:col-span-1">
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="ai">AI Generate</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="connections">Connections</TabsTrigger>
            </TabsList>
            <TabsContent value="ai">
              <AiPromptForm onResourcesGenerated={setResources} onConnectionsGenerated={setConnections} />
            </TabsContent>
            <TabsContent value="resources">
              <ResourceForm onAddResource={addResource} resources={resources} onRemoveResource={removeResource} />
            </TabsContent>
            <TabsContent value="connections">
              <ConnectionForm
                resources={resources}
                connections={connections}
                onAddConnection={addConnection}
                onRemoveConnection={removeConnection}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Architecture Diagram</h2>
            <div className="flex gap-2">
              <Button onClick={exportDiagram} variant="outline">
                Export Diagram
              </Button>
              <Button onClick={exportDiagram} variant="outline">
                Export BOM
              </Button>
              <Button
                onClick={generateArmTemplate}
                variant="outline"
                disabled={resources.length === 0 || isGeneratingArm}
              >
                {isGeneratingArm ? "Generating..." : "Generate ARM Template"}
              </Button>
            </div>
          </div>
          <DiagramView resources={resources} connections={connections} />

          {armTemplate && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">ARM Template</h3>
                <Button onClick={downloadArmTemplate} size="sm" variant="outline" className="flex items-center gap-1">
                  <Download className="h-4 w-4" /> Download
                </Button>
              </div>
              <pre className="bg-muted p-4 rounded-md text-xs overflow-auto max-h-[200px]">{armTemplate}</pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function getArmResourceType(resourceType: string): string {
  const typeMap: Record<string, string> = {
    appService: "Microsoft.Web/sites",
    function: "Microsoft.Web/sites",
    sqlDatabase: "Microsoft.Sql/servers/databases",
    cosmosDb: "Microsoft.DocumentDB/databaseAccounts",
    storageAccount: "Microsoft.Storage/storageAccounts",
    virtualMachine: "Microsoft.Compute/virtualMachines",
    apiManagement: "Microsoft.ApiManagement/service",
    keyVault: "Microsoft.KeyVault/vaults",
    serviceBus: "Microsoft.ServiceBus/namespaces",
    eventHub: "Microsoft.EventHub/namespaces",
    logicApp: "Microsoft.Logic/workflows",
    applicationGateway: "Microsoft.Network/applicationGateways",
    loadBalancer: "Microsoft.Network/loadBalancers",
    containerInstance: "Microsoft.ContainerInstance/containerGroups",
    kubernetesService: "Microsoft.ContainerService/managedClusters",
    cognitiveServices: "Microsoft.CognitiveServices/accounts",
    applicationInsights: "Microsoft.Insights/components",
    frontDoor: "Microsoft.Network/frontDoors",
  }

  return typeMap[resourceType] || "Microsoft.Resources/deployments"
}


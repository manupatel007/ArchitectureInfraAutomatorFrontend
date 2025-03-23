"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResourceForm } from "@/components/resource-form"
import { ConnectionForm } from "@/components/connection-form"
import { DiagramView } from "@/components/diagram-view"
import { AiPromptForm } from "@/components/ai-prompt-form"
import { BomView } from "@/components/bom-view"
import { ArmTemplateOptions } from "@/components/arm-template-options"
import { CodeDeploymentOptions } from "@/components/code-deployment-options"
import type { ResourceNode, Connection } from "@/lib/types"
import { generateCode, deployCode, downloadCode } from "@/lib/code-generation"

interface AzureArchitectureDiagramProps {
  chatId: string | null
}

export function AzureArchitectureDiagram({ chatId }: AzureArchitectureDiagramProps) {
  const [resources, setResources] = useState<ResourceNode[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const [activeTab, setActiveTab] = useState("ai")
  const [isGeneratingArm, setIsGeneratingArm] = useState(false)
  const [isDeploying, setIsDeploying] = useState(false)
  const [armTemplate, setArmTemplate] = useState<string | null>(null)
  const [showBom, setShowBom] = useState(false)

  // Reset state when chat changes
  useEffect(() => {
    setResources([])
    setConnections([])
    setArmTemplate(null)
    setShowBom(false)
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

  const deployToAzure = async () => {
    setIsDeploying(true)
    try {
      // In a real implementation, this would:
      // 1. Check if user is authenticated
      // 2. If not, initiate OAuth flow
      // 3. Get access token
      // 4. Call Azure Management API to deploy the template
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API call
      alert("Template deployed successfully!")
    } catch (error) {
      console.error("Deployment failed:", error)
      alert("Failed to deploy template. Please try again.")
    } finally {
      setIsDeploying(false)
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

  const handleGenerateCode = async (resourceId: string) => {
    try {
      const code = await generateCode(resourceId, "function")
      // Store the generated code in your state or backend
      console.log("Generated code:", code)
    } catch (error) {
      console.error("Failed to generate code:", error)
      throw error
    }
  }

  const handleDeployCode = async (resourceId: string) => {
    try {
      await deployCode(resourceId, "function")
      // Handle successful deployment
      console.log("Code deployed successfully")
    } catch (error) {
      console.error("Failed to deploy code:", error)
      throw error
    }
  }

  const handleDownloadCode = async (resourceId: string) => {
    try {
      await downloadCode(resourceId, "function")
      // Handle successful download
      console.log("Code downloaded successfully")
    } catch (error) {
      console.error("Failed to download code:", error)
      throw error
    }
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
              <Button onClick={() => setShowBom(!showBom)} variant="outline">
                {showBom ? "Hide BOM" : "Show BOM"}
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

          {showBom && resources.length > 0 && (
            <div className="mt-6">
              <BomView resources={resources} />
            </div>
          )}

          {armTemplate && (
            <div className="mt-6">
              <ArmTemplateOptions
                armTemplate={armTemplate}
                onDeploy={deployToAzure}
                onExport={downloadArmTemplate}
                isDeploying={isDeploying}
              />
            </div>
          )}

          {/* Show code generation options if there are Function Apps or Web Apps */}
          {(resources.some(r => r.type === "appService") || resources.some(r => r.type === "function")) && (
            <div className="mt-6">
              <CodeDeploymentOptions
                resources={resources}
                onGenerateCode={handleGenerateCode}
                onDeployCode={handleDeployCode}
                onDownloadCode={handleDownloadCode}
              />
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


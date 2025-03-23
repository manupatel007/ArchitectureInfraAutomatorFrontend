"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ResourceNode } from "@/lib/types"
import { Trash2 } from "lucide-react"

interface ResourceFormProps {
  onAddResource: (resource: ResourceNode) => void
  resources: ResourceNode[]
  onRemoveResource: (id: string) => void
}

export function ResourceForm({ onAddResource, resources, onRemoveResource }: ResourceFormProps) {
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !type) return

    onAddResource({
      id: `resource-${resources.length + 1}`,
      name,
      type,
      position: { x: 100, y: 100 },
    })

    setName("")
    setType("")
    setDescription("")
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Resource Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter resource name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Resource Type</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger>
              <SelectValue placeholder="Select resource type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="function-app">Function App</SelectItem>
              <SelectItem value="web-app">Web App</SelectItem>
              <SelectItem value="appService">App Service</SelectItem>
              <SelectItem value="sqlDatabase">SQL Database</SelectItem>
              <SelectItem value="cosmosDb">Cosmos DB</SelectItem>
              <SelectItem value="storageAccount">Storage Account</SelectItem>
              <SelectItem value="virtualMachine">Virtual Machine</SelectItem>
              <SelectItem value="apiManagement">API Management</SelectItem>
              <SelectItem value="keyVault">Key Vault</SelectItem>
              <SelectItem value="serviceBus">Service Bus</SelectItem>
              <SelectItem value="eventHub">Event Hub</SelectItem>
              <SelectItem value="logicApp">Logic App</SelectItem>
              <SelectItem value="applicationGateway">Application Gateway</SelectItem>
              <SelectItem value="loadBalancer">Load Balancer</SelectItem>
              <SelectItem value="containerInstance">Container Instance</SelectItem>
              <SelectItem value="kubernetesService">Kubernetes Service</SelectItem>
              <SelectItem value="cognitiveServices">Cognitive Services</SelectItem>
              <SelectItem value="applicationInsights">Application Insights</SelectItem>
              <SelectItem value="frontDoor">Front Door</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description (Optional)</Label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of this resource"
          />
        </div>
        <Button type="submit" className="w-full">
          Add Resource
        </Button>
      </form>

      {resources.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium">Added Resources</h3>
          <div className="space-y-2">
            {resources.map((resource) => (
              <div key={resource.id} className="flex items-center justify-between p-2 border rounded">
                <div>
                  <p className="font-medium">{resource.name}</p>
                  <p className="text-sm text-muted-foreground">{resource.type}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveResource(resource.id)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}


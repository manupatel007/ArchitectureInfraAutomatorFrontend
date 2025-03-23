"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ResourceNode } from "@/lib/types"
import { Trash2 } from "lucide-react"
import { azureResourceTypes } from "@/lib/azure-resources"

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
      id: "", // Will be set by parent component
      name,
      type,
      description,
    })

    // Reset form
    setName("")
    setType("")
    setDescription("")
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div className="space-y-2">
          <Label htmlFor="name">Resource Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Web App, SQL Database"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Resource Type</Label>
          <Select value={type} onValueChange={setType} required>
            <SelectTrigger id="type">
              <SelectValue placeholder="Select resource type" />
            </SelectTrigger>
            <SelectContent>
              {azureResourceTypes.map((resourceType) => (
                <SelectItem key={resourceType.value} value={resourceType.value}>
                  {resourceType.label}
                </SelectItem>
              ))}
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

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Added Resources</h3>
        {resources.length === 0 ? (
          <p className="text-sm text-muted-foreground">No resources added yet</p>
        ) : (
          <ul className="space-y-2">
            {resources.map((resource) => (
              <li key={resource.id} className="flex items-center justify-between p-2 bg-muted rounded-md">
                <div>
                  <span className="font-medium">{resource.name}</span>
                  <span className="text-xs text-muted-foreground ml-2">({resource.type})</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => onRemoveResource(resource.id)} className="h-8 w-8">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}


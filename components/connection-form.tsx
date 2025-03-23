"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import type { ResourceNode, Connection } from "@/lib/types"
import { Trash2 } from "lucide-react"
import { connectionTypes } from "@/lib/azure-resources"

interface ConnectionFormProps {
  resources: ResourceNode[]
  connections: Connection[]
  onAddConnection: (connection: Connection) => void
  onRemoveConnection: (id: string) => void
}

export function ConnectionForm({ resources, connections, onAddConnection, onRemoveConnection }: ConnectionFormProps) {
  const [source, setSource] = useState("")
  const [target, setTarget] = useState("")
  const [type, setType] = useState("")
  const [label, setLabel] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!source || !target || !type) return

    const newConnection: Connection = {
      id: `connection-${connections.length + 1}`,
      source,
      target,
      type,
      label: label || undefined,
    }

    onAddConnection(newConnection)

    // Reset form
    setSource("")
    setTarget("")
    setType("")
    setLabel("")
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div className="space-y-2">
          <Label htmlFor="source">Source Resource</Label>
          <Select value={source} onValueChange={setSource} required>
            <SelectTrigger id="source">
              <SelectValue placeholder="Select source resource" />
            </SelectTrigger>
            <SelectContent>
              {resources.map((resource) => (
                <SelectItem key={resource.id} value={resource.id}>
                  {resource.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="target">Target Resource</Label>
          <Select value={target} onValueChange={setTarget} required>
            <SelectTrigger id="target">
              <SelectValue placeholder="Select target resource" />
            </SelectTrigger>
            <SelectContent>
              {resources.map((resource) => (
                <SelectItem key={resource.id} value={resource.id}>
                  {resource.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Connection Type</Label>
          <Select value={type} onValueChange={setType} required>
            <SelectTrigger id="type">
              <SelectValue placeholder="Select connection type" />
            </SelectTrigger>
            <SelectContent>
              {connectionTypes.map((connType) => (
                <SelectItem key={connType.value} value={connType.value}>
                  {connType.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="label">Label (Optional)</Label>
          <Input id="label" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="e.g., HTTP, TCP/IP" />
        </div>

        <Button type="submit" className="w-full" disabled={resources.length < 2}>
          Add Connection
        </Button>
      </form>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Added Connections</h3>
        {connections.length === 0 ? (
          <p className="text-sm text-muted-foreground">No connections added yet</p>
        ) : (
          <ul className="space-y-2">
            {connections.map((connection) => {
              const sourceResource = resources.find((r) => r.id === connection.source)
              const targetResource = resources.find((r) => r.id === connection.target)

              return (
                <li key={connection.id} className="flex items-center justify-between p-2 bg-muted rounded-md">
                  <div className="text-sm">
                    <span>{sourceResource?.name}</span>
                    <span className="mx-2">→</span>
                    <span>{targetResource?.name}</span>
                    {connection.label && (
                      <span className="text-xs text-muted-foreground ml-2">({connection.label})</span>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveConnection(connection.id)}
                    className="h-8 w-8"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}


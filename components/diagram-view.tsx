"use client"

import { useCallback, useEffect, useState } from "react"
import ReactFlow, {
  type Node,
  type Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ConnectionLineType,
  Panel,
} from "reactflow"
import "reactflow/dist/style.css"
import type { ResourceNode, Connection } from "@/lib/types"
import { AzureResourceNode } from "@/components/azure-resource-node"
import { Button } from "@/components/ui/button"
import { LayoutGrid } from "lucide-react"

interface DiagramViewProps {
  resources: ResourceNode[]
  connections: Connection[]
}

const nodeTypes = {
  azureResource: AzureResourceNode,
}

export function DiagramView({ resources, connections }: DiagramViewProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [animateNodes, setAnimateNodes] = useState(false)

  // Convert resources to ReactFlow nodes with animation
  useEffect(() => {
    if (resources.length === 0) {
      setNodes([])
      return
    }

    // Create new nodes with animation
    const flowNodes: Node[] = resources.map((resource, index) => ({
      id: resource.id,
      type: "azureResource",
      position: {
        x: 100 + (index % 3) * 250,
        y: 100 + Math.floor(index / 3) * 150,
      },
      data: {
        name: resource.name,
        type: resource.type,
        description: resource.description,
        animate: true,
      },
    }))

    setNodes(flowNodes)
    setAnimateNodes(true)

    // Remove animation after a delay
    const timer = setTimeout(() => {
      setNodes((nodes) =>
        nodes.map((node) => ({
          ...node,
          data: { ...node.data, animate: false },
        })),
      )
      setAnimateNodes(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [resources, setNodes])

  // Convert connections to ReactFlow edges with animation
  useEffect(() => {
    if (connections.length === 0) {
      setEdges([])
      return
    }

    // Add edges with a slight delay after nodes appear
    const timer = setTimeout(() => {
      const flowEdges: Edge[] = connections.map((connection, index) => ({
        id: connection.id,
        source: connection.source,
        target: connection.target,
        label: connection.label,
        type: "smoothstep",
        animated: connection.type === "dataFlow",
        style: {
          stroke: getConnectionColor(connection.type),
          opacity: 0,
          animation: "fadeIn 0.5s ease-in-out forwards",
          animationDelay: `${index * 100}ms`,
        },
      }))

      setEdges(flowEdges)
    }, 500)

    return () => clearTimeout(timer)
  }, [connections, setEdges])

  const applyAutoLayout = useCallback(() => {
    // This is a simple layout algorithm
    // In a real app, you'd use a more sophisticated algorithm like dagre
    const newNodes = [...nodes]

    // Position nodes in a grid
    newNodes.forEach((node, index) => {
      node.position = {
        x: 100 + (index % 3) * 250,
        y: 100 + Math.floor(index / 3) * 150,
      }
    })

    setNodes(newNodes)
  }, [nodes, setNodes])

  return (
    <div className="w-full h-[600px] border rounded-md">
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        .node-enter {
          animation: scaleIn 0.5s ease-out forwards;
        }
      `}</style>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
      >
        <Background />
        <Controls />
        <Panel position="top-right">
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={applyAutoLayout}>
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  )
}

function getConnectionColor(type: string): string {
  switch (type) {
    case "dataFlow":
      return "#0078d4"
    case "dependency":
      return "#107c10"
    case "network":
      return "#d83b01"
    case "authentication":
      return "#5c2d91"
    case "integration":
      return "#ff8c00"
    default:
      return "#666666"
  }
}


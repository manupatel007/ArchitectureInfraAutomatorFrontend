import { memo } from "react"
import { Handle, Position, type NodeProps } from "reactflow"
import { getResourceIcon } from "@/lib/azure-resources"

interface AzureResourceNodeData {
  name: string
  type: string
  description?: string
  animate?: boolean
}

function AzureResourceNodeComponent({ data }: NodeProps<AzureResourceNodeData>) {
  const Icon = getResourceIcon(data.type)

  return (
    <div
      className={`bg-white border border-gray-200 rounded-md shadow-sm p-3 w-[200px] ${data.animate ? "node-enter" : ""}`}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3" />

      <div className="flex items-center gap-2 mb-2">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-50 rounded-md">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <div className="truncate">
          <div className="font-medium text-sm truncate">{data.name}</div>
          <div className="text-xs text-muted-foreground truncate">{data.type}</div>
        </div>
      </div>

      {data.description && <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{data.description}</div>}

      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  )
}

export const AzureResourceNode = memo(AzureResourceNodeComponent)


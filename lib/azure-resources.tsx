import {
  Database,
  Server,
  Globe,
  HardDrive,
  Lock,
  Network,
  Cpu,
  Cloud,
  Box,
  Workflow,
  BarChart,
  Webhook,
  type LucideIcon,
} from "lucide-react"

export const azureResourceTypes = [
  { value: "appService", label: "App Service" },
  { value: "function", label: "Function App" },
  { value: "sqlDatabase", label: "SQL Database" },
  { value: "cosmosDb", label: "Cosmos DB" },
  { value: "storageAccount", label: "Storage Account" },
  { value: "virtualMachine", label: "Virtual Machine" },
  { value: "apiManagement", label: "API Management" },
  { value: "keyVault", label: "Key Vault" },
  { value: "serviceBus", label: "Service Bus" },
  { value: "eventHub", label: "Event Hub" },
  { value: "logicApp", label: "Logic App" },
  { value: "applicationGateway", label: "Application Gateway" },
  { value: "loadBalancer", label: "Load Balancer" },
  { value: "containerInstance", label: "Container Instance" },
  { value: "kubernetesService", label: "Kubernetes Service" },
  { value: "cognitiveServices", label: "Cognitive Services" },
  { value: "applicationInsights", label: "Application Insights" },
  { value: "frontDoor", label: "Front Door" },
]

export const connectionTypes = [
  { value: "dataFlow", label: "Data Flow" },
  { value: "dependency", label: "Dependency" },
  { value: "network", label: "Network Connection" },
  { value: "authentication", label: "Authentication" },
  { value: "integration", label: "Integration" },
]

export function getResourceIcon(type: string): LucideIcon {
  switch (type) {
    case "appService":
    case "function":
      return Globe
    case "sqlDatabase":
    case "cosmosDb":
      return Database
    case "storageAccount":
      return HardDrive
    case "virtualMachine":
      return Server
    case "apiManagement":
    case "frontDoor":
      return Webhook
    case "keyVault":
      return Lock
    case "serviceBus":
    case "eventHub":
      return Network
    case "logicApp":
      return Workflow
    case "applicationGateway":
    case "loadBalancer":
      return Network
    case "containerInstance":
    case "kubernetesService":
      return Box
    case "cognitiveServices":
      return Cpu
    case "applicationInsights":
      return BarChart
    default:
      return Cloud
  }
}


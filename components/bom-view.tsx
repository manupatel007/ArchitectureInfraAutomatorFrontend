"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ResourceNode } from "@/lib/types"

// Dummy pricing data - in a real app, this would come from an API
const resourcePricing: Record<string, { unit: string; price: number }> = {
  appService: { unit: "per hour", price: 0.075 },
  function: { unit: "per million executions", price: 0.000016667 },
  sqlDatabase: { unit: "per hour", price: 0.25 },
  cosmosDb: { unit: "per hour", price: 0.25 },
  storageAccount: { unit: "per GB/month", price: 0.0184 },
  virtualMachine: { unit: "per hour", price: 0.077 },
  apiManagement: { unit: "per hour", price: 0.25 },
  keyVault: { unit: "per 10,000 operations", price: 0.03 },
  serviceBus: { unit: "per million operations", price: 0.05 },
  eventHub: { unit: "per hour", price: 0.25 },
  logicApp: { unit: "per execution", price: 0.0005 },
  applicationGateway: { unit: "per hour", price: 0.025 },
  loadBalancer: { unit: "per hour", price: 0.025 },
  containerInstance: { unit: "per hour", price: 0.15 },
  kubernetesService: { unit: "per hour", price: 0.10 },
  cognitiveServices: { unit: "per 1000 transactions", price: 0.50 },
  applicationInsights: { unit: "per GB", price: 2.30 },
  frontDoor: { unit: "per GB", price: 0.15 },
}

interface BomViewProps {
  resources: ResourceNode[]
}

export function BomView({ resources }: BomViewProps) {
  // Calculate total cost (using dummy monthly usage)
  const calculateMonthlyCost = (resourceType: string) => {
    const pricing = resourcePricing[resourceType]
    if (!pricing) return 0

    // Dummy monthly usage based on resource type
    const monthlyUsage = {
      appService: 730, // hours
      function: 1000000, // executions
      sqlDatabase: 730, // hours
      cosmosDb: 730, // hours
      storageAccount: 100, // GB
      virtualMachine: 730, // hours
      apiManagement: 730, // hours
      keyVault: 100000, // operations
      serviceBus: 1000000, // operations
      eventHub: 730, // hours
      logicApp: 10000, // executions
      applicationGateway: 730, // hours
      loadBalancer: 730, // hours
      containerInstance: 730, // hours
      kubernetesService: 730, // hours
      cognitiveServices: 10000, // transactions
      applicationInsights: 5, // GB
      frontDoor: 1000, // GB
    }

    const usage = monthlyUsage[resourceType as keyof typeof monthlyUsage] || 0
    return (usage * pricing.price).toFixed(2)
  }

  const totalMonthlyCost = resources.reduce((sum, resource) => {
    return sum + parseFloat(calculateMonthlyCost(resource.type))
  }, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bill of Materials</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Resource Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Unit</TableHead>
              <TableHead className="text-right">Price/Unit</TableHead>
              <TableHead className="text-right">Monthly Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resources.map((resource) => {
              const pricing = resourcePricing[resource.type]
              const monthlyCost = calculateMonthlyCost(resource.type)
              return (
                <TableRow key={resource.id}>
                  <TableCell className="font-medium">{resource.name}</TableCell>
                  <TableCell>{resource.type}</TableCell>
                  <TableCell>{resource.description}</TableCell>
                  <TableCell className="text-right">{pricing?.unit || "N/A"}</TableCell>
                  <TableCell className="text-right">
                    ${pricing?.price.toFixed(6) || "0.00"}
                  </TableCell>
                  <TableCell className="text-right">${monthlyCost}</TableCell>
                </TableRow>
              )
            })}
            <TableRow className="font-bold">
              <TableCell colSpan={5} className="text-right">
                Total Monthly Cost
              </TableCell>
              <TableCell className="text-right">${totalMonthlyCost.toFixed(2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
} 
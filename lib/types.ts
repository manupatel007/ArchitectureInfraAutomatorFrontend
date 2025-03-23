export interface ResourceNode {
  id: string
  name: string
  type: string
  description?: string
}

export interface Connection {
  id: string
  source: string
  target: string
  type: string
  label?: string
}


export interface ResourceNode {
  id: string
  name: string
  type: string
  position: {
    x: number
    y: number
  }
}

export interface Connection {
  id: string
  source: string
  target: string
  type: string
}


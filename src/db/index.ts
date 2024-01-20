import Dexie, { Table } from 'dexie'
import type { Edge, Node, Viewport } from 'reactflow'

export type Optional<T, K extends keyof T> = Omit<T, K> & { [P in K]?: T[P] }

export type FlowConfig = {
  id: string
  name: string
  nodes: Node[]
  edges: Edge[]
  viewport: Viewport
  xml?: string
}

export type NodeConfig<NodeData = any> = {
  flowId: string
  id: string
  type: string
  name: string
  config?: NodeData
}

export class MySubClassedDexie extends Dexie {
  flows!: Table<FlowConfig>
  nodes!: Table<NodeConfig>

  constructor() {
    super('flow-db')
    this.version(1).stores({
      flows: 'id, name, nodes, edges, viewport, xml',
      nodes: 'id, name, type, config',
    })
  }
}

export const db = new MySubClassedDexie()

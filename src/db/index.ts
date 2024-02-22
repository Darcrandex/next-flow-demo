// 这是一个前端的简单数据库
// 只是为了模拟后端服务

import Dexie, { Table } from 'dexie'
import type { Edge, Node, Viewport } from 'reactflow'

export type Optional<T, K extends keyof T> = Omit<T, K> & { [P in K]?: T[P] }

// 流程配置
export type FlowData = {
  id: string
  name: string
  nodes: Node[]
  edges: Edge[]
  viewport?: Viewport
  xml?: string
}

// 节点配置
export type NodeData<T = any> = {
  flowId: string
  id: string
  type: string
  name: string
  config?: T
}

export class MySubClassedDexie extends Dexie {
  flows!: Table<FlowData>
  nodes!: Table<NodeData>

  constructor() {
    super('flow-db')
    this.version(1).stores({
      flows: 'id, name, nodes, edges, viewport, xml',
      nodes: 'id, name, type, config',
    })
  }
}

export const db = new MySubClassedDexie()

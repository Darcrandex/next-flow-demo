// 由于 reactflow 本身把数据层开放给外部（从外部接收数据）
// 因此将管理数据的功能定义到 context 中

import { createContext, useContext } from 'react'
import type { Edge, Node, OnEdgesChange, OnNodesChange } from 'reactflow'

export type FlowContextValue = {
  nodes: Node[]
  edges: Edge[]

  selectedNodeIds: string[]
  selectedEdgeIds: string[]

  setNodes: React.Dispatch<React.SetStateAction<Node[]>>
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>

  onNodesChange: OnNodesChange
  onEdgesChange: OnEdgesChange

  setSelectedNodeIds: React.Dispatch<React.SetStateAction<string[]>>
  setSelectedEdgeIds: React.Dispatch<React.SetStateAction<string[]>>
}

export const FlowContext = createContext<FlowContextValue>({
  nodes: [],
  edges: [],

  selectedNodeIds: [],
  selectedEdgeIds: [],

  setNodes: () => {},
  setEdges: () => {},

  onNodesChange: () => {},
  onEdgesChange: () => {},

  setSelectedNodeIds: () => {},
  setSelectedEdgeIds: () => {},
})

export function useFlowContext() {
  return useContext(FlowContext)
}

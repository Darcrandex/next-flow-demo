/**
 * @name FlowEdit
 * @description
 * @author darcrand
 */

'use client'
import { useState } from 'react'
import { ReactFlowProvider, useEdgesState, useNodesState } from 'reactflow'
import FlowRender from './FlowRender'
import HeaderTools from './HeaderTools'
import { FlowContext, FlowContextValue } from './context'
import InitialData from './plugins/InitialData'

export type FlowEditProps = {
  // 流程配置的唯一标识
  id?: string
}

export default function FlowEdit(props: FlowEditProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([])
  const [selectedEdgeIds, setSelectedEdgeIds] = useState<string[]>([])

  const contextValue: FlowContextValue = {
    nodes,
    edges,
    selectedNodeIds,
    selectedEdgeIds,

    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    setSelectedNodeIds,
    setSelectedEdgeIds,
  }

  return (
    <>
      <FlowContext.Provider value={contextValue}>
        <ReactFlowProvider>
          <section className="flex flex-col h-screen">
            <HeaderTools flowId={props.id} />
            <FlowRender className="flex-1" />
          </section>

          <InitialData flowId={props.id} />
        </ReactFlowProvider>
      </FlowContext.Provider>
    </>
  )
}

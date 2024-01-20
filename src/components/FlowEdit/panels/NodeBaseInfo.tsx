/**
 * @name NodeBaseInfo
 * @description 节点基本信息面板
 * @author darcrand
 */

import { useCallback, useMemo } from 'react'
import type { PanelPosition } from 'reactflow'
import { Panel } from 'reactflow'
import { useFlowContext } from '../context'

export type NodeBaseInfoProps = { position?: PanelPosition }

export default function NodeBaseInfo(props: NodeBaseInfoProps) {
  const { nodes, setNodes, selectedNodeIds } = useFlowContext()

  const targetNode = useMemo(() => {
    if (selectedNodeIds.length !== 1) return undefined
    const nodeId = selectedNodeIds[0]
    return nodes.find((v) => v.id === nodeId)
  }, [nodes, selectedNodeIds])

  const onDataUpdate = useCallback(
    (data?: any) => {
      setNodes((arr) =>
        arr.map((node) =>
          node.id === targetNode?.id
            ? { ...node, data: { ...node.data, ...data } }
            : node
        )
      )
    },
    [setNodes, targetNode?.id]
  )

  if (!targetNode) return null

  return (
    <Panel
      position={props.position || 'top-right'}
      className="bg-white w-80 p-4 shadow-lg"
    >
      <h1>节点信息</h1>

      <input
        type="text"
        placeholder="请输入节点名称"
        className="block border w-full px-2 py-1 mt-2 text-sm outline-none focus:border-emerald-300 transition-all"
        maxLength={20}
        value={targetNode.data.name || ''}
        onChange={(e) => onDataUpdate({ name: e.target.value })}
      />
    </Panel>
  )
}

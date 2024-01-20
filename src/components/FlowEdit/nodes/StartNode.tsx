/**
 * @name StartNode
 * @description 流程开始节点
 * @author darcrand
 */

import { cls } from '@/utils/cls'
import { useCallback } from 'react'
import type { NodeProps } from 'reactflow'
import { Handle, NodeToolbar, Position } from 'reactflow'
import { useFlowContext } from '../context'

export type StartNodeData = { name: string }
export type StartNodeProps = NodeProps<StartNodeData>
export const START_NODE = 'workflow-start-node'

export default function StartNode(props: StartNodeProps) {
  const { setNodes } = useFlowContext()

  const onRemove = useCallback(() => {
    setNodes((nds) => nds.filter((node) => node.id !== props.id))
  }, [setNodes, props.id])

  return (
    <>
      <div
        className={cls(
          'w-48 py-4 border text-center bg-emerald-50 transition-all',
          props.selected && 'border-emerald-300 shadow-lg'
        )}
      >
        <p className="font-bold truncate">开始:{props.data.name}</p>
      </div>

      <NodeToolbar align="start" className="space-x-2">
        <button onClick={onRemove}>delete</button>
      </NodeToolbar>

      <Handle id="s-r" type="source" position={Position.Right} />
      <Handle id="s-b" type="source" position={Position.Bottom} />
    </>
  )
}

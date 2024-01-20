/**
 * @name RobotTaskNode
 * @description
 * @author darcrand
 */

import { cls } from '@/utils/cls'
import { useCallback } from 'react'
import type { NodeProps } from 'reactflow'
import { Handle, NodeToolbar, Position } from 'reactflow'
import { useFlowContext } from '../context'

export type RobotTaskNodeData = { name: string }
export type RobotTaskNodeProps = NodeProps<RobotTaskNodeData>
export const ROBOT_TASK_NODE = 'workflow-robot-task-node'

export default function RobotTaskNode(props: RobotTaskNodeProps) {
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
        <p className="font-bold truncate">{props.data.name}</p>
      </div>

      <NodeToolbar align="start" className="space-x-2">
        <button onClick={onRemove}>delete</button>
      </NodeToolbar>

      <Handle id="t-t" type="target" position={Position.Top} />
      <Handle id="t-l" type="target" position={Position.Left} />

      <Handle id="s-b" type="source" position={Position.Bottom} />
      <Handle id="s-r" type="source" position={Position.Right} />
    </>
  )
}

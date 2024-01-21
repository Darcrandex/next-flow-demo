/**
 * @name RobotTaskNode
 * @description
 * @author darcrand
 */

import { cls } from '@/utils/cls'
import type { NodeProps } from 'reactflow'
import { Handle, NodeToolbar, Position } from 'reactflow'
import { useNodeQuery } from '../hooks/useNodeQuery'
import { useRemoveNode } from '../hooks/useRemoveNode'

export const ROBOT_TASK_NODE = 'workflow-robot-task-node'

export default function RobotTaskNode(props: NodeProps) {
  const { remove } = useRemoveNode(props.id)
  const { data } = useNodeQuery(props.id)

  return (
    <>
      <div
        className={cls(
          'w-48 py-4 border text-center bg-emerald-50 transition-all',
          props.selected && 'border-emerald-300 shadow-lg'
        )}
      >
        <p className="font-bold truncate">{data?.name || '未命名'}</p>
      </div>

      <NodeToolbar align="start" className="space-x-2">
        <button onClick={remove}>delete</button>
      </NodeToolbar>

      <Handle id="t-t" type="target" position={Position.Top} />
      <Handle id="t-l" type="target" position={Position.Left} />

      <Handle id="s-b" type="source" position={Position.Bottom} />
      <Handle id="s-r" type="source" position={Position.Right} />
    </>
  )
}

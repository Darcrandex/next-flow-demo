/**
 * @name NodeTools
 * @description 用于选择节点并添加到画布中
 * @author darcrand
 */

import { NodeData } from '@/db'
import { flowService } from '@/services/flow'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useCallback } from 'react'
import type { Node, PanelPosition } from 'reactflow'
import { Panel, useReactFlow } from 'reactflow'
import { useFlowContext } from '../context'
import { END_NODE } from '../nodes/EndNode'
import { ROBOT_TASK_NODE } from '../nodes/RobotTaskNode'
import { START_NODE } from '../nodes/StartNode'
import { USER_TASK_NODE } from '../nodes/UserTaskNode'

export type NodeToolsProps = { position?: PanelPosition }

const nodeGroups = [
  {
    key: 'event',
    label: '事件',
    nodes: [
      { key: START_NODE, label: '开始节点', data: { name: '开始节点' } },
      { key: END_NODE, label: '结束节点', data: { name: '结束节点' } },
    ],
  },
  {
    key: 'task',
    label: '任务',
    nodes: [
      { key: USER_TASK_NODE, label: '用户任务', data: { name: '用户任务' } },
      {
        key: ROBOT_TASK_NODE,
        label: '机器人任务',
        data: { name: '机器人任务' },
      },
    ],
  },
]

export default function NodeTools(props: NodeToolsProps) {
  const { nodes } = useFlowContext()
  const reactFlow = useReactFlow()
  const flowId = useParams().id as string
  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation({
    mutationFn: async (params: { node: Omit<Node, 'id'>; data: Omit<NodeData, 'id'> }) =>
      flowService.createNode(params.node, params.data),
    onSuccess(nodeId) {
      queryClient.invalidateQueries({ queryKey: ['flow'] })
      reactFlow.fitView({ nodes: [{ id: nodeId }] })
    },
  })

  const onNodeTypeClick = useCallback(
    (nodeType: string) => {
      const matchNode = nodeGroups.reduce((acc: any, group) => {
        const matchNode = group.nodes.find((node) => node.key === nodeType)
        return matchNode || acc
      }, undefined)

      if (nodeType === START_NODE && nodes.some((n) => n.type === START_NODE)) {
        console.error('已存在开始节点')
      }

      if (nodeType === END_NODE && nodes.some((n) => n.type === END_NODE)) {
        console.error('已存在结束节点')
      }

      // 预设一个新的位置
      const lastNode = nodes[nodes.length - 1]
      const x = 20 + (lastNode?.position.x || 0) + (lastNode?.width || 0)
      const y = lastNode?.position.y || 0

      if (matchNode) {
        mutateAsync({
          node: { type: matchNode.key, position: { x, y }, data: null },
          data: { name: matchNode.data.name, flowId, type: matchNode.key },
        })
      }
    },
    [flowId, mutateAsync, nodes]
  )

  return (
    <Panel position={props.position || 'top-left'}>
      <ul className="bg-white p-2 shadow-lg space-y-4">
        {nodeGroups.map((group) => (
          <li key={group.key}>
            <h3 className="text-gray-500 text-xs">{group.label}</h3>

            <ol className="mt-2 pl-2 space-y-2">
              {group.nodes.map((node) => (
                <li
                  key={node.key}
                  onClick={() => onNodeTypeClick(node.key)}
                  className="text-sm cursor-pointer hover:text-emerald-300 transition-all"
                >
                  {node.label}
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ul>
    </Panel>
  )
}

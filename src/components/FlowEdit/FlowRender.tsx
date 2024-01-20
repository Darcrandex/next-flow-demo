/**
 * @name FlowRender
 * @description 流程节点渲染
 * @author darcrand
 */

import { useCallback } from 'react'
import ReactFlow, {
  Background,
  MiniMap,
  addEdge,
  useOnSelectionChange,
} from 'reactflow'
import 'reactflow/dist/style.css'

import { useFlowContext } from './context'
import EndNode, { END_NODE } from './nodes/EndNode'
import RobotTaskNode, { ROBOT_TASK_NODE } from './nodes/RobotTaskNode'
import StartNode, { START_NODE } from './nodes/StartNode'
import UserTaskNode, { USER_TASK_NODE } from './nodes/UserTaskNode'
import NodeBaseInfo from './panels/NodeBaseInfo'
import NodeTools from './panels/NodeTools'

export type FlowRenderProps = { className?: string }

// 注册自定义节点
const nodeTypes = {
  [START_NODE]: StartNode,
  [END_NODE]: EndNode,
  [USER_TASK_NODE]: UserTaskNode,
  [ROBOT_TASK_NODE]: RobotTaskNode,
}

export default function FlowRender(props: FlowRenderProps) {
  const {
    nodes,
    edges,
    setEdges,
    onNodesChange,
    onEdgesChange,
    setSelectedNodeIds,
    setSelectedEdgeIds,
  } = useFlowContext()

  useOnSelectionChange({
    onChange: ({ nodes, edges }) => {
      setSelectedNodeIds(nodes.map((n) => n.id))
      setSelectedEdgeIds(edges.map((e) => e.id))
    },
  })

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) => addEdge({ ...params, type: 'smoothstep' }, eds)),
    [setEdges]
  )

  return (
    <>
      <div className={props.className}>
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          proOptions={{ hideAttribution: true }}
        >
          <Background gap={12} size={1} />
          <MiniMap />
          <NodeTools />
          <NodeBaseInfo />
        </ReactFlow>
      </div>
    </>
  )
}

/**
 * @name AutoSaveAsync
 * @description 节点或边变更时自动保存
 * @author darcrand
 */

import { useChannel } from '@/hooks/useChannel'
import { useEffect, useState } from 'react'
import type { ReactFlowJsonObject } from 'reactflow'
import { useReactFlow } from 'reactflow'
import { AUTO_SAVE_EVENT } from '../const/common'
import { useFlowContext } from '../context'

export default function AutoSaveAsync(props: { delay?: number }) {
  const { nodes, edges } = useFlowContext()
  const reactFlow = useReactFlow()
  const { send } = useChannel({ name: AUTO_SAVE_EVENT })

  const [prevState, setPrev] = useState<ReactFlowJsonObject>()

  useEffect(() => {
    const t = setTimeout(() => {
      const viewport = reactFlow.getViewport()
      const filteredEdges = edges.filter((e) => nodes.find((n) => n.id === e.target || n.id === e.source))

      if (prevState?.nodes?.length !== nodes?.length || prevState?.edges?.length !== filteredEdges?.length) {
        console.log('updated')
        const last = { nodes, edges: filteredEdges, viewport }
        setPrev(last)

        // 初始化的情况不需要保存
        if (prevState !== undefined) {
          console.log('auto save')
          send({})
        }
      }
    }, props.delay || 2000)

    return () => clearTimeout(t)
  }, [edges, nodes, prevState, props.delay, reactFlow, send])

  return null
}

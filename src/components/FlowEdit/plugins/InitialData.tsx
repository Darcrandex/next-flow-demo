/**
 * @name InitialDataPlugin
 * @description 初始化数据
 */

import { flowService } from '@/services/flow'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useReactFlow } from 'reactflow'

type InitialDataPluginProps = { flowId?: string }

export default function InitialDataPlugin(props: InitialDataPluginProps) {
  const reactflow = useReactFlow()

  const { data } = useQuery({
    queryKey: ['flow', 'detail', props.flowId],
    enabled: !!props.flowId,
    queryFn: () => flowService.getFlow(props.flowId || ''),
  })

  useEffect(() => {
    // 因为 viewport 不是数据监听的属性
    // 所以需要使用 reactflow 实例去设置
    if (reactflow && data) {
      try {
        const { nodes = [], edges = [], viewport } = data
        reactflow.setNodes(nodes)
        reactflow.setEdges(edges)
        !!viewport && reactflow.setViewport(viewport)
      } catch (error) {
        console.error('[InitialDataPlugin]: 初始化数据失败\n', error)
      }
    }
  }, [data, reactflow])

  return null
}

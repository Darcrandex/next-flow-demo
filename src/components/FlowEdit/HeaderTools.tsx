/**
 * @name HeaderTools
 * @description
 * @author darcrand
 */

import { FlowData, Optional } from '@/db'
import { useChannel } from '@/hooks/useChannel'
import { flowService } from '@/services/flow'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import 'buffer'
import { toXML } from 'jstoxml'
import { useRouter } from 'next/navigation'
import { pick } from 'ramda'
import { useCallback, useEffect, useState } from 'react'
import { useReactFlow } from 'reactflow'
import { AUTO_SAVE_EVENT } from './const/common'

export default function HeaderTools(props: { flowId?: string }) {
  const { data } = useQuery({
    queryKey: ['flow', 'detail', props.flowId],
    enabled: !!props.flowId,
    queryFn: () => flowService.getFlow(props.flowId || ''),
  })

  const [name, setName] = useState('')
  useEffect(() => {
    if (data?.name) setName(data.name)
  }, [data])

  const reactFlow = useReactFlow()
  const router = useRouter()
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: (data: Optional<FlowData, 'id'>) => {
      return !!data.id ? flowService.updateFlow(data as FlowData) : flowService.createFlow(data)
    },
    onSuccess(data) {
      if (data) {
        router.replace(`/wf/${data}`)
        queryClient.invalidateQueries({ queryKey: [] })
      }
    },
  })

  const { receive } = useChannel({ name: AUTO_SAVE_EVENT })
  const onSave = useCallback(() => {
    const jsonData = reactFlow.toObject()
    const xmlData = toXML(pick(['nodes', 'edges'], jsonData))

    // 过滤没有关联的边
    const edges = jsonData.edges.filter((e) => jsonData.nodes.find((n) => n.id === e.target || n.id === e.source))

    const params: Optional<FlowData, 'id'> = {
      ...jsonData,
      edges,
      xml: xmlData,
      id: props.flowId,
      name,
    }

    mutate(params)
  }, [mutate, name, props.flowId, reactFlow])

  useEffect(() => {
    return receive(() => {
      onSave()
    })
  }, [onSave, receive])

  return (
    <>
      <header className="flex items-center justify-between px-4 py-2 border-b space-x-2">
        <button type="button" onClick={() => router.back()}>
          返回
        </button>

        <input
          className="w-96 text-center outline-emerald-400"
          placeholder="请输入名称"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="button" onClick={onSave}>
          保存
        </button>
      </header>
    </>
  )
}

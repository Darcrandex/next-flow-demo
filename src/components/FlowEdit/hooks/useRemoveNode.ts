// 抽离删除节点的逻辑

import { useChannel } from '@/hooks/useChannel'
import { flowService } from '@/services/flow'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { AUTO_SAVE_EVENT } from '../const/common'
import { useFlowContext } from '../context'

export function useRemoveNode(nodeId: string) {
  const { setSelectedNodeIds } = useFlowContext()
  const { send } = useChannel({ name: AUTO_SAVE_EVENT })

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: (id: string) => flowService.removeNode(id),
    onSuccess() {
      setSelectedNodeIds([])
      queryClient.invalidateQueries({ queryKey: ['flow'] })
    },
  })

  const remove = useCallback(() => {
    const t = setTimeout(() => {
      send(null)
      mutate(nodeId)
    }, 200)

    return () => clearTimeout(t)
  }, [mutate, nodeId, send])

  return { remove }
}

// 抽离删除节点的逻辑

import { flowService } from '@/services/flow'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useFlowContext } from '../context'

export function useRemoveNode(nodeId: string) {
  const { setSelectedNodeIds } = useFlowContext()

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: (id: string) => flowService.removeNode(id),
    onSuccess() {
      setSelectedNodeIds([])
      queryClient.invalidateQueries({ queryKey: ['flow'] })
    },
  })

  const remove = useCallback(() => {
    mutate(nodeId)
  }, [mutate, nodeId])

  return { remove }
}

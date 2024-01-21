import { NodeData } from '@/db'
import { flowService } from '@/services/flow'
import { useQuery } from '@tanstack/react-query'

export function useNodeQuery<Config = any>(nodeId: string) {
  const res = useQuery<NodeData<Config> | undefined>({
    queryKey: ['node', nodeId],
    enabled: !!nodeId,
    queryFn: () => flowService.getNodeById(nodeId || ''),
  })

  return res
}

/**
 * @name NodeBaseInfo
 * @description 节点基本信息面板
 * @author darcrand
 */

import { NodeData } from '@/db'
import { flowService } from '@/services/flow'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import type { PanelPosition } from 'reactflow'
import { Panel } from 'reactflow'
import { useFlowContext } from '../context'
import { useNodeQuery } from '../hooks/useNodeQuery'

export type NodeBaseInfoProps = { position?: PanelPosition }

export default function NodeBaseInfo(props: NodeBaseInfoProps) {
  const { selectedNodeIds } = useFlowContext()
  const nodeId = selectedNodeIds[0]
  const { control, reset, getValues } = useForm<NodeData>({ defaultValues: { name: '' } })
  const { data: targetNode } = useNodeQuery(nodeId)

  useEffect(() => {
    if (targetNode) {
      reset(targetNode)
    }
  }, [reset, targetNode])

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: (values: any) => flowService.updateNode(values),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['node'] })
    },
  })

  const onSubmit = () => mutate(getValues())

  if (!targetNode) return null

  return (
    <Panel position={props.position || 'top-right'} className="bg-white w-80 p-4 shadow-lg">
      <h1>节点信息</h1>

      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <input
            type="text"
            placeholder="请输入节点名称"
            className="block border w-full px-2 py-1 mt-2 text-sm outline-none focus:border-emerald-300 transition-all"
            maxLength={20}
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            onBlur={onSubmit}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                onSubmit()
              }
            }}
          />
        )}
      />
    </Panel>
  )
}

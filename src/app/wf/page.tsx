/**
 * @name WorkflowListPage
 * @description
 * @author darcrand
 */

'use client'
import { flowService } from '@/services/flow'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function WorkflowListPage() {
  const { data } = useQuery({
    queryKey: ['flow'],
    queryFn: () => flowService.flows(),
  })

  const router = useRouter()
  const queryClient = useQueryClient()
  const { mutateAsync } = useMutation({
    mutationFn: () => flowService.createFlow({ name: '新的流程', nodes: [], edges: [] }),
    onSuccess(id) {
      router.push(`/wf/${id}`)
      queryClient.invalidateQueries({ queryKey: ['flow'] })
    },
  })

  return (
    <>
      <h1>WorkflowListPage</h1>
      <hr className="my-4" />

      <header className="m-4">
        <button type="button" className="text-emerald-400 border border-emerald-400 p-2" onClick={() => mutateAsync()}>
          Add Workflow
        </button>
      </header>

      <ul className="space-y-2 m-4 list-decimal pl-8">
        {data?.map((v) => (
          <li key={v.id} className="hover:underline">
            <Link href={`/wf/${v.id}`}>{v.name}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

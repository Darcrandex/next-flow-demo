/**
 * @name WorkflowListPage
 * @description
 * @author darcrand
 */

'use client'
import { flowService } from '@/services/flow'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

export default function WorkflowListPage() {
  const { data } = useQuery({
    queryKey: ['flow', 'list'],
    queryFn: () => flowService.flows(),
  })

  return (
    <>
      <h1>WorkflowListPage</h1>
      <hr className="my-4" />

      <header className="m-4">
        <Link href="/wf/add" className="text-emerald-400 border border-emerald-400 p-2">
          Add Workflow
        </Link>
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

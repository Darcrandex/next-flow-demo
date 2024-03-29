/**
 * @name WorkflowPage
 * @description
 * @author darcrand
 */

import dynamic from 'next/dynamic'

const FlowEdit = dynamic(() => import('@/components/FlowEdit'), {
  ssr: false,
})

export default function WorkflowPage({ params: { id } }: any) {
  return <FlowEdit id={id} />
}

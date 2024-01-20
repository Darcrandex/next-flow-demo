/**
 * @name WorkflowAdd
 * @description
 * @author darcrand
 */
import dynamic from 'next/dynamic'

const FlowEdit = dynamic(() => import('@/components/FlowEdit'), {
  ssr: false,
})

export default function WorkflowAdd() {
  return <FlowEdit />
}

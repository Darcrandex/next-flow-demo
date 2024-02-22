/**
 * @name RootPage
 * @description
 * @author darcrand
 */

import Link from 'next/link'

export default function RootPage() {
  return (
    <>
      <Link href="/wf" className="m-4 text-emerald-400 hover:underline">
        goto Workflow List
      </Link>
    </>
  )
}

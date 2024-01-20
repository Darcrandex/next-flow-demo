import dynamic from 'next/dynamic'
import { PropsWithChildren } from 'react'
import './globals.css'

const QueryProvider = dynamic(() => import('@/lib/QueryProvider'), {
  ssr: false,
})

export default function RootLayout(props: PropsWithChildren) {
  return (
    <html>
      <body>
        <QueryProvider>{props.children}</QueryProvider>
      </body>
    </html>
  )
}

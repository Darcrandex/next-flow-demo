'use client'

import { BroadcastChannel } from 'broadcast-channel'
import { useCallback, useRef } from 'react'

export function useChannel<T = any>(options: { name: string }) {
  const channel = useRef<BroadcastChannel<T>>(new BroadcastChannel<T>(options.name)).current

  const send = useCallback(
    (value: T) => {
      channel?.postMessage(value)
    },
    [channel]
  )

  const receive = useCallback(
    (callback: (value: T) => void) => {
      channel?.addEventListener('message', callback)
      return () => {
        channel?.removeEventListener('message', callback)
      }
    },
    [channel]
  )

  const disconnect = useCallback(() => {
    channel?.close()
  }, [channel])

  return { send, receive, disconnect }
}

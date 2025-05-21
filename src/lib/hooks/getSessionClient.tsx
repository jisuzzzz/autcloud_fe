'use client'

import { useEffect } from 'react'
import { fetchEventSource } from '@microsoft/fetch-event-source'

interface Props {
  project_id: string
}

export default function GetSessionClient({ project_id }: Props) {
  useEffect(() => {
    const controller = new AbortController()

    async function startSSE() {
      try {
        await fetchEventSource(`/api/project/${project_id}`, {
          method: 'GET',
          signal: controller.signal,
          credentials: 'include',
          
          async onopen(response) {
            if (!response.ok) {
              throw new Error(`Server returned ${response.status}`)
            }
            console.log('SSE connection established')
          },

          onmessage(event) {
            try {
              const data = JSON.parse(event.data)
              console.log('Received:', data)
            } catch (e) {
              console.error('Parse error:', event.data)
            }
          },

          onclose() {
            console.log('Connection closed')
          },

          onerror(err) {
            console.error('SSE Error:', err)
          }
        })
      } catch (err) {
        console.error('Connection failed:', err)
      }
    }

    startSSE()
    return () => controller.abort()
  }, [project_id])

  return null
}
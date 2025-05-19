'use client'

import { useEffect } from 'react'

interface Props {
  project_id: string
}

export default function GetSessionClient({ project_id }: Props) {
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch(`/api/project/${project_id}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Accept': 'text/event-stream',
          }
        })

        if (response.ok) {
          console.log('Session connection established')
        } else {
          console.error('Failed to connect:', response.status)
        }
      } catch (err) {
        console.error('Connection error:', err)
      }
    }

    checkConnection()
  }, [project_id])

  return null
}
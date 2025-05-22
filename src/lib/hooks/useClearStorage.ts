import { useMutation } from "@liveblocks/react"
import { LiveMap } from "@liveblocks/client"

export function useClearStorage() {
  return useMutation(({ storage }) => {
    const store = storage.get('attributeStore') as LiveMap<string, any>
    if (store && typeof store !== 'string') {
      for (const [key] of store.entries()) {
        store.delete(key)
      }
    }
  }, [])
}
import { useEffect, useMemo, useState } from "react"
import { useRoom } from "@liveblocks/react"
import { getYjsProviderForRoom } from "@liveblocks/yjs"

export function useYjsStore() {
  const room = useRoom()
  const [isConnected, setIsConnected] = useState(false)

  // YJS 설정
  const { yDoc, yProvider } = useMemo(() => {
    const yProvider = getYjsProviderForRoom(room)
    const yDoc = yProvider.getYDoc()
    yDoc.gc = true
    return { yDoc, yProvider }
  }, [room])

  useEffect(() => {
    if (!yProvider || !yDoc) return

    const unsubs: (() => void)[] = []

    // 동기화 핸들러
    function handleSync() {
      setIsConnected(true)
    }

    // Provider가 이미 동기화되어 있으면 바로 처리
    if (yProvider.synced) {
      handleSync()
    } else {
      // 아니면 동기화 이벤트 대기
      yProvider.on('synced', handleSync)
      unsubs.push(() => yProvider.off('synced', handleSync))
    }

    // Disconnect 처리
    const handleDisconnect = () => {
      setIsConnected(false)
    }

    yProvider.on('disconnect', handleDisconnect)
    unsubs.push(() => yProvider.off('disconnect', handleDisconnect))

    // Cleanup
    return () => {
      unsubs.forEach(fn => fn())
      unsubs.length = 0
    }
  }, [yProvider, yDoc])


  return {
    yDoc,
    yProvider,
    isConnected
  }

}
'use client'
import { useYjsStore } from "@/lib/hooks/useYjsStore"
import { useEffect, useState } from "react"
import EditLogModal from "./editLogModal"
import { ProjectHistoryItem } from "@/types/type"

export default function EditSummary() {
  const { yDoc } = useYjsStore()
  const [projectHistory, setProjectHistory] = useState<ProjectHistoryItem[]>([])
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (!yDoc) return
    
    const history = yDoc.getArray<ProjectHistoryItem>('projectHistory')
    
    const updateHistory = () => {
      const historyData = history.toArray()
      setProjectHistory(historyData)
    }
    
    updateHistory()
    history.observe(updateHistory)
    
    return () => {
      history.unobserve(updateHistory)
    }
  }, [yDoc])

  // nodeId별로 그룹화하여 최신 항목만 표시
  const groupedHistory = projectHistory.reduce((acc, item) => {
    if (!acc[item.nodeId]) {
      acc[item.nodeId] = []
    }
    acc[item.nodeId].push(item)
    return acc
  }, {} as Record<string, ProjectHistoryItem[]>)

  return (
    <div className="mt-13 px-2 py-2 space-y-2 overflow-y-auto max-h-[calc(100vh-410px)] scrollbar-thin font-mono">
      {Object.entries(groupedHistory)
        .filter(([nodeId]) => !nodeId.startsWith('firewall'))
        .map(([nodeId, historyItems]) => {
          const lastItem = historyItems[historyItems.length - 1]
          if (!lastItem) return null

          return (
            <div 
              key={nodeId} 
              className="px-3 py-2 border rounded-md mb-3 text-xs bg-gray-50/70 hover:bg-violet-50 transition-colors duration-200 cursor-pointer"
              onClick={() => {
                setIsModalOpen(true)
                setSelectedNodeId(nodeId)
              }}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium truncate max-w-[150px]">
                  {lastItem.label}
                </span>
                <span className={`rounded-md text-xs px-2 py-0.5 ${
                  lastItem.action === 'added' ? 'bg-green-100 text-green-800' :
                  lastItem.action === 'modified' ? 'bg-blue-100 text-blue-800' :
                  lastItem.action === 'removed' ? 'bg-red-100 text-red-800' : ''
                }`}>
                  {lastItem.action}
                </span>
              </div>
              <div className="mt-2 text-gray-500 flex items-center gap-2">
                <span className="inline-block w-5 h-5 rounded-full bg-gray-200 text-center text-[10px] leading-5 text-gray-700">
                  {lastItem.userName?.charAt(0) || '?'}
                </span>
                <span>{lastItem.userName || 'Unknown'}</span>
              </div>
              <div className="mt-1 text-[10px] text-gray-400">
                {historyItems.length} change{historyItems.length > 1 ? 's' : ''}
              </div>
            </div>
          )
        })}

      {isModalOpen && selectedNodeId && (
        <EditLogModal 
          resourceHistory={groupedHistory[selectedNodeId] || []} 
          onClose={() => setIsModalOpen(false)}
        />
      )}
      
      {projectHistory.length === 0 && (
        <p className="text-xs text-gray-500">No history available...</p>
      )}
    </div>
  )
}

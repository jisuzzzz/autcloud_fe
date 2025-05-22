'use client'
import { useYjsStore } from "@/lib/hooks/useYjsStore"
import { useEffect, useState } from "react"
import EditLogModal from "./editLogModal"

export default function EditSummary() {
  const { yDoc } = useYjsStore()
  const [projectHistory, setProjectHistory] = useState<any>(null)
  const [selectedItem, setSelectedItem] = useState<{nodeId: string, data: any} | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)


  useEffect(() => {
    if (!yDoc) return
    
    const history = yDoc.getMap('projectHistory')
    const updateHistory = () => {
      const historyData = history.get('nodes') || {}
      // console.log(historyData)
      setProjectHistory(historyData)
    }
    
    updateHistory()
    history.observe(updateHistory)
    
    return () => {
      history.unobserve(updateHistory)
    }
  }, [yDoc])

  return (
    <div className="mt-13 px-2 py-2 space-y-2 overflow-y-auto max-h-[calc(100vh-410px)] scrollbar-thin font-mono">
      {projectHistory && Object.entries(projectHistory)
      .filter(([nodeId]) => nodeId.split('-')[0] !== 'firewall')
      .map(([nodeId, data]: [string, any]) => (

        <div key={nodeId} className="px-3 py-2 border rounded-md mb-3 text-xs bg-gray-50/70 hover:bg-violet-50 transition-colors duration-200 cursor-pointer"
          onClick={() => {
            setIsModalOpen(true)
            setSelectedItem({nodeId, data})
          }}
        >
          <div className="flex justify-between items-center">
            <span className="font-medium truncate max-w-[150px]">
              {data.label}
            </span>
            <span className={`rounded-md text-xs px-2 py-0.5 ${
              data.status === 'added' ? 'bg-green-100 text-green-800' : 
              data.status === 'modified' ? 'bg-blue-100 text-blue-800' : 
              data.status === 'removed' ? 'bg-red-100 text-red-800' : ''
            }`}>
              {data.status}
            </span>
          </div>
          <div className="mt-2 text-gray-500 flex items-center gap-2">
            <span className="inline-block w-5 h-5 rounded-full bg-gray-200 text-center text-[10px] leading-5 text-gray-700">
              {data.userName?.charAt(0) || '?'}
            </span>
            <span>{data.userName || 'Unknown'}</span>
          </div>
        </div>
      ))}

      {isModalOpen && selectedItem && (
        <EditLogModal 
          resourceHistory={{...selectedItem.data}} 
          onClose={() => setIsModalOpen(false)}
        />
      )}
      
      {(!projectHistory || 
        Object.keys(projectHistory).length === 0 ||  
        Object.keys(projectHistory).every((key) => key.startsWith('firewall'))) && (
        <p className="text-xs text-gray-500">No history available...</p>
      )}
    </div>
  )
}
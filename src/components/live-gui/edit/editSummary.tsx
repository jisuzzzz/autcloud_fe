'use client'
import { useYjsStore } from "@/lib/useYjsStore"
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
      setProjectHistory(historyData)
    }
    
    updateHistory()
    history.observe(updateHistory)
    
    return () => {
      history.unobserve(updateHistory)
    }
  }, [yDoc])

  return (
    <div className="mt-13 px-4 py-4 space-y-2 overflow-y-auto max-h-[calc(100vh-50vh)]">
      {projectHistory && Object.entries(projectHistory).map(([nodeId, data]: [string, any]) => (

        <div key={nodeId} className="p-2 border rounded mb-2 text-xs h-14 hover:bg-violet-300"
          onClick={() => {
            setIsModalOpen(true)
            setSelectedItem({nodeId, data})
          }}
        >
          <div className="flex justify-between items-center">
            <span className="font-medium truncate max-w-[150px]">
              {data.specChanges?.id}
            </span>
            <span className={`rounded-sm h-4 px-1 ${
              data.status === 'added' ? 'bg-green-100 text-green-800' : 
              data.status === 'modified' ? 'bg-blue-100 text-blue-800' : 
              'bg-red-100 text-red-800'
            }`}>
              {data.status}
            </span>
          </div>
          <div className="mt-1 text-gray-500">
            Added by: {data.userName || 'Unknown'}
          </div>
        </div>
      ))}

      {isModalOpen && selectedItem && (
        <EditLogModal 
          resourceHistory={{...selectedItem.data}} 
          onClose={() => setIsModalOpen(false)}
        />
      )}
      
      {(!projectHistory || Object.keys(projectHistory).length === 0) && (
        <p className="text-sm text-gray-500">No history available</p>
      )}
    </div>
  )
}
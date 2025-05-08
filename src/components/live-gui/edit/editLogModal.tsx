import Modal from "@/components/custom/modal"

interface ResourceHistory {
  userId: string
  userName: string
  status: string
  label: string
  specChanges: Record<string, {
    prevValue?: any
    currValue?: any
  } | any>
}

interface EditLogModalProps {
  resourceHistory: ResourceHistory
  onClose: () => void
}

export default function EditLogModal({resourceHistory, onClose}: EditLogModalProps) {
  const renderValue = (value: any) => {
    if (value === null || value === undefined) return "-";
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    return value;
  };

  return (
    <Modal
      onClose={onClose}
      className="fixed top-[70px] left-[268px]"
    >
      <div className="w-[450px] max-h-[85vh] bg-white rounded-md border shadow-lg overflow-hidden">
        <div className="sticky top-0 p-4 border-b bg-white z-10 flex justify-between items-center">
          <h2 className="text-sm font-semibold">Detailed Change Log</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
          </button>
        </div>

        <div className="flex flex-col p-5 space-y-5 overflow-y-auto" style={{maxHeight: 'calc(85vh - 57px)'}}>
          <div className="grid grid-cols-[60px_1fr] gap-3 items-center">
            <p className="font-medium text-sm text-gray-700">Label:</p>
            <p className="text-sm font-medium">{resourceHistory.label}</p>
          </div>
          <div className="grid grid-cols-[60px_1fr] gap-3 items-center">
            <p className="font-medium text-sm text-gray-700">User:</p>
            <p className="text-sm font-medium">{resourceHistory.userName} ({resourceHistory.userId})</p>
          </div>
          <div className="grid grid-cols-[60px_1fr] gap-3 items-center">
            <p className="font-medium text-sm text-gray-700">Action:</p>
            <span className={`rounded-sm px-1 py-0.5 inline-flex items-center ${
              resourceHistory.status === 'added' ? ' text-green-800' : 
              resourceHistory.status === 'modified' ? ' text-blue-800' : 
              ' text-red-800'
            }`}>
              {resourceHistory.status}
            </span>
          </div>
          
          <div className="border rounded-md p-4 bg-gray-50">
            <p className="font-semibold mb-4 text-sm">Specification Changes:</p>
            <div className="space-y-5 overflow-y-auto pr-1 custom-scrollbar max-h-[300px]">
              {Object.entries(resourceHistory.specChanges).map(([key, value]) => (
                <div key={key} className="flex flex-col">
                  <p className="capitalize font-medium text-sm text-gray-800 mb-2">{key.replace(/_/g, ' ')}:</p>
                  
                  {value && typeof value === 'object' && ('prevValue' in value || 'currValue' in value) ? (
                    <div className="flex flex-col mt-1 space-y-3 pl-3">
                      {value.prevValue !== undefined && (
                        <div className="flex items-center">
                          <span className="text-red-600 mr-2 text-sm font-medium">-</span>
                          <p className="text-red-600 text-sm bg-red-50 px-3 py-1.5 rounded-sm">{renderValue(value.prevValue)}</p>
                        </div>
                      )}
                      {value.currValue !== undefined && (
                        <div className="flex items-center">
                          <span className="text-green-600 mr-2 text-sm font-medium">+</span>
                          <p className="text-green-600 text-sm bg-green-50 px-3 py-1.5 rounded-sm">{renderValue(value.currValue)}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex mt-1 pl-3 items-center">
                      <span className={`${resourceHistory.status === "added" ? "text-green-600" : 
                              resourceHistory.status === "removed" ? "text-red-600" : ""} mr-2 text-sm font-medium`}>
                        {resourceHistory.status === "added" ? "+" : 
                         resourceHistory.status === "removed" ? "-" : " "}
                      </span>
                      <p className={`${resourceHistory.status === "added" ? "text-green-600 bg-green-50" : 
                              resourceHistory.status === "removed" ? "text-red-600 bg-red-50" : ""} text-sm px-3 py-1.5 rounded-sm`}>
                        {renderValue(value)}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c5c5c5;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>
    </Modal>
  )
}
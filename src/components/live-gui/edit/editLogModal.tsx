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
      className="fixed top-[70px] left-[268px]"
    >
      <div className="w-[430px] max-h-[90vh] bg-white rounded-md border shadow-lg overflow-hidden">
        <div className="sticky top-0 p-4 border-b bg-white z-10 flex justify-between items-center">
          <h2 className="text-xs font-semibold">Detailed Change Log</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
          </button>
        </div>
        
        <div className="flex flex-col p-4 space-y-3 text-xs">
          <div className="flex items-center">
            <p className="font-medium text-gray-700 w-[70px]">Label:</p>
            <p className="font-medium">{resourceHistory.label}</p>
          </div>
          <div className="flex items-center">
            <p className="font-medium text-gray-700 w-[70px]">User:</p>
            <p className="font-medium">{resourceHistory.userName} ({resourceHistory.userId})</p>
          </div>
          <div className="flex items-center">
            <p className="font-medium text-gray-700 w-[70px]">Action:</p>
            <span className={`rounded-sm inline-flex font-semibold items-center ${
              resourceHistory.status === 'added' ? ' text-green-800' : 
              resourceHistory.status === 'modified' ? ' text-blue-800' : 
              ' text-red-800'
            }`}>
              {resourceHistory.status}
            </span>
          </div>
        </div>

        <div className="p-4 text-xs">
          <p className="font-semibold mb-3">Specification Changes:</p>
          <div className="border rounded-md p-4 bg-[#FAFAFA] overflow-y-auto max-h-[calc(90vh-250px)]">
            <div className="space-y-4 custom-scollbar w-full">
              {Object.entries(resourceHistory.specChanges).map(([key, value]) => (
                <div key={key} className="flex flex-col">
                  <p className="capitalize font-medium text-xs text-gray-800 mb-2">{key.replace(/_/g, ' ')}:</p>

                  {value && typeof value === 'object' && ('prevValue' in value || 'currValue' in value) ? (
                    <div className="flex flex-col space-y-2 pl-5">
                      {value.prevValue !== null && (
                        <div className="flex items-center">
                          <span className="text-red-600 mr-2 text-xs font-medium">-</span>
                          <p className="text-red-600 text-xs bg-red-50 px-3 py-1.5 rounded-sm">{renderValue(value.prevValue)}</p>
                        </div>
                      )}
                      {value.currValue !== null && (
                        <div className="flex items-center">
                          <span className="text-green-600 mr-2 text-xs font-medium">+</span>
                          <p className="text-green-600 text-xs bg-green-50 px-3 py-1.5 rounded-sm">{renderValue(value.currValue)}</p>
                        </div>
                      )}
                    </div>
                  ): (
                    <div className="flex mt-1 pl-5 items-center">
                      <span className={`${resourceHistory.status === "added" ? "text-green-600" : 
                        resourceHistory.status === "removed" ? "text-red-600" : ""} mr-2 text-xs font-medium`}>
                        {resourceHistory.status === "added" ? "+" : 
                         resourceHistory.status === "removed" ? "-" : " "}
                      </span>
                      <p className={`${resourceHistory.status === "added" ? "text-green-600 bg-green-50" : 
                        resourceHistory.status === "removed" ? "text-red-600 bg-red-50" : ""} text-xs px-3 py-1.5 rounded-sm`}>
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
    </Modal>
  )
}
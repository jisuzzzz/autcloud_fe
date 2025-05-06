import Modal from "@/components/custom/modal"

interface ResourceHistory {
  userId: string
  userName: string
  status: string
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
      <div className="w-[400px] max-h-[500px] bg-white rounded-xs border overflow-y-auto">
        <div className="sticky top-0 p-4 border-b bg-white z-10">
          <h2 className="text-sm font-medium">Details Changed Log</h2>
        </div>

        <div className="flex flex-col p-4 space-y-4">
          <div className="flex items-center justify-between">
            <p className="font-medium text-sm">User:</p>
            <p className="text-[#8171E8] text-sm">{resourceHistory.userName} ({resourceHistory.userId})</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium text-sm">Action:</p>
            <p className="capitalize text-sm">{resourceHistory.status}</p>
          </div>
          
          <div className="border rounded-md p-3">
            <p className="font-medium mb-3 text-sm">Specification Changes:</p>
            <div className="space-y-4 max-h-[300px] overflow-y-auto">
              {Object.entries(resourceHistory.specChanges).map(([key, value]) => (
                <div key={key} className="flex flex-col">
                  <p className="capitalize font-medium text-sm">{key.replace('_', ' ')}:</p>
                  
                  {value && typeof value === 'object' && ('prevValue' in value || 'currValue' in value) ? (
                    <div className="flex flex-col mt-1 space-y-1 pl-2">
                      {value.prevValue !== undefined && (
                        <div className="flex">
                          <span className="text-red-600 mr-2 text-sm">-</span>
                          <p className="text-red-600 text-sm">{renderValue(value.prevValue)}</p>
                        </div>
                      )}
                      {value.currValue !== undefined && (
                        <div className="flex">
                          <span className="text-green-600 mr-2 text-sm">+</span>
                          <p className="text-green-600 text-sm">{renderValue(value.currValue)}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex mt-1 pl-2">
                      <span className={`${resourceHistory.status === "added" ? "text-green-600" : 
                              resourceHistory.status === "removed" ? "text-red-600" : ""} mr-2 text-sm`}>
                        {resourceHistory.status === "added" ? "+" : 
                         resourceHistory.status === "removed" ? "-" : " "}
                      </span>
                      <p className={`${resourceHistory.status === "added" ? "text-green-600" : 
                              resourceHistory.status === "removed" ? "text-red-600" : ""} text-sm`}>
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
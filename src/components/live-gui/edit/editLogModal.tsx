import Modal from "@/components/custom/modal"

interface ResourceHistory {
  userId: string
  userName: string
  status: 'added' | 'modified' | 'removed'
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

interface LogCardProps {
  title: string
  prev?: any
  curr?: any
  status: 'added' | 'modified' | 'removed'
}

function LogCard({ title, prev, curr, status }: LogCardProps) {
  const renderValue = (value: any) => {
    if (value === null || value === undefined) return "-"
    if (typeof value === 'boolean') return value ? 'Yes' : 'No'
    return value
  }

  const statusMap = {
    added: {
      label: 'added',
      color: 'bg-green-100 text-green-800',
    },
    modified: {
      label: 'modified',
      color: 'bg-blue-100 text-blue-800',
    },
    removed: {
      label: 'removed',
      color: 'bg-red-100 text-red-800',
    }
  }

  const statusInfo = statusMap[status]

  return (
    <div className="border rounded-sm bg-[#FAFAFA] text-xs">
      <div className="px-4 py-[9px] border-b items-center">
        <div className="flex items-center justify-between">
          <p className="font-semibold">{title}</p>
          <p className={`rounded-lg text-xs px-2 py-0.5 font-medium  ${statusInfo.color}`}>
            {statusInfo.label}
          </p>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="bg-[#FFFBFB] w-1/2 px-4 py-3 border-r space-y-2">
          <div className="flex items-center gap-2">
            <div className="rounded-full w-2 h-2 bg-red-400"/>
            <p className="font-medium">Previous Value:</p>
          </div>
          <p>{renderValue(prev)}</p>
        </div>

        <div className="bg-[#FAFEFC] w-1/2 px-4 py-3 space-y-2">
          <div className="flex items-center gap-2">
            <div className="rounded-full w-2 h-2 bg-green-400"/>
            <p className="font-medium">Current Value:</p>
          </div>
          <p>{renderValue(curr)}</p>
        </div>
      </div>
    </div>
  )
}

export default function EditLogModal({ resourceHistory, onClose }: EditLogModalProps) {
  return (
    <Modal className="fixed top-[70px] left-[268px]">
      <div className="w-[550px] max-h-[90vh] bg-white rounded-md border shadow-lg overflow-y-hidden">
        <div className="sticky top-0 p-4 border-b bg-white z-10 flex justify-between items-center">
          <h2 className="text-xs font-semibold">Detailed Change Log</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
          </button>
        </div>

        <div className="flex flex-col p-4 space-y-2 text-xs">
          <div className="flex items-center">
            <p className="font-semibold">{resourceHistory.label}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-medium text-gray-600">Changed by:</p>
            <p className="font-medium text-gray-600">{resourceHistory.userName} ({resourceHistory.userId})</p>
          </div>
        </div>

        <div className="px-4 pb-4 text-xs overflow-y-auto max-h-[calc(90vh-226px)] scrollbar-thin">
          <div className="space-y-4">
            {Object.entries(resourceHistory.specChanges).map(([key, value]) => {
              const title = key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

              if (value && typeof value === 'object' && ('prevValue' in value || 'currValue' in value)) {
                return (
                  <LogCard
                    key={key}
                    title={title}
                    prev={value.prevValue}
                    curr={value.currValue}
                    status={resourceHistory.status}
                  />
                );
              } else {
                return (
                  <LogCard
                    key={key}
                    title={title}
                    prev={resourceHistory.status === 'removed' ? value : undefined}
                    curr={resourceHistory.status === 'added' ? value : undefined}
                    status={resourceHistory.status}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    </Modal>
  )
}
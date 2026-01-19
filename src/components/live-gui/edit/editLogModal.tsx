'use client'
import Modal from "@/components/custom/modal/modal"
import { ProjectHistoryItem } from "@/types/type"
import { AttributeService } from "@/services/attribute"

interface EditLogModalProps {
  resourceHistory: ProjectHistoryItem[]
  onClose: () => void
}

const buildAttributeFromChanges = (changes: Array<{property: string, prev: any, curr: any}>, getValue: 'prev' | 'curr') => {
  const attribute: Record<string, any> = {}
  changes.forEach(change => {
    attribute[change.property] = change[getValue]
  })
  return attribute
}

const getDetailedAttribute = (resourceType: string, changes: Array<{property: string, prev: any, curr: any}>, getValue: 'prev' | 'curr') => {
  const attribute = buildAttributeFromChanges(changes, getValue)

  switch (resourceType) {
    case 'Compute':
      return AttributeService.getComputeAttribute(attribute)
    case 'ManagedDatabase':
      return AttributeService.getDatabaseAttribute(attribute)
    case 'ObjectStorage':
      return AttributeService.getObjectStorageAttribute(attribute)
    case 'BlockStorage':
      return AttributeService.getBlockStorageAttribute(attribute)
    default:
      return null
  }
}

interface LogCardProps {
  title: string
  prev?: any
  curr?: any
  status: 'added' | 'modified' | 'removed'
}

function renderValue(value: any, key: string): string {
  if (value === null || value === undefined) return "-"
  if (typeof value === 'boolean') return value ? 'Yes' : 'No'
  if (typeof value === 'object') return JSON.stringify(value, null, 2)

  switch (key) {
    case 'vcpu':
      return `${value} vCPU/s`
    case 'ram':
      return `${value} MB`
    case 'disk':
    case 'size':
    case 'bandwidth':
      return `${value} GB`
    case 'monthly_cost':
    case 'price':
    case 'disk_gb_price':
    case 'bw_gb_price':
      return `$${value} /month`
    case 'replica_nodes':
      return `${value} node`
    case 'ratelimit_ops_secs':
      return `${value} ops/sec`
    case 'ratelimit_ops_bytes':
      return `${value} bytes`
    default:
      return String(value)
  }
}

function LogCard({ title, prev, curr, status }: LogCardProps) {
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
          <p className="font-mono font-semibold">{title}</p>
          <p className={`rounded-lg text-xs px-2 py-0.5 font-medium  ${statusInfo.color}`}>
            {statusInfo.label}
          </p>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="bg-[#FFFBFB] w-1/2 px-4 py-3 border-r space-y-2">
          <div className="flex items-center gap-2">
            <div className="rounded-full w-2 h-2 bg-red-400" />
            <p className="font-mono">Previous Value:</p>
          </div>
          <pre className="whitespace-pre-wrap break-words text-xs font-mono">{prev}</pre>
        </div>

        <div className="bg-[#FAFEFC] w-1/2 px-4 py-3 space-y-2">
          <div className="flex items-center gap-2">
            <div className="rounded-full w-2 h-2 bg-green-400" />
            <p className="font-mono">Current Value:</p>
          </div>
          <pre className="whitespace-pre-wrap break-words text-xs font-mono">{curr}</pre>
        </div>
      </div>
    </div>
  )
}

function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp)
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

interface HistoryItemCardProps {
  item: ProjectHistoryItem
  isLatest: boolean
}

function HistoryItemCard({ item, isLatest }: HistoryItemCardProps) {
  const prevAttribute = getDetailedAttribute(item.resourceType, item.changes, 'prev')
  const currAttribute = getDetailedAttribute(item.resourceType, item.changes, 'curr')

  const displayKeys = item.changes
    .map(c => c.property)
    .filter(key => !key.toLowerCase().includes('id') && key !== 'rules' && key !== 'status')

  return (
    <div className={`border rounded-md p-4 ${isLatest ? 'bg-blue-50 border-blue-300' : 'bg-white'}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-sm">{item.label}</p>
          {isLatest && (
            <span className="text-xs px-2 py-0.5 bg-blue-500 text-white rounded-full">Latest</span>
          )}
        </div>
        <p className="text-xs text-gray-500">{formatTimestamp(item.timestamp)}</p>
      </div>

      <div className="flex items-center gap-2 mb-3 text-xs">
        <p className="text-gray-600">Changed by:</p>
        <p className="font-medium text-gray-800">{item.userName}</p>
      </div>

      <div className="space-y-3">
        {displayKeys.map((key) => {
          const title = key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
          const change = item.changes.find(c => c.property === key)
          const prevValue = prevAttribute ? prevAttribute[key as keyof typeof prevAttribute] : change?.prev
          const currValue = currAttribute ? currAttribute[key as keyof typeof currAttribute] : change?.curr

          return (
            <LogCard
              key={`${key}-${item.timestamp}`}
              title={title}
              prev={renderValue(prevValue, key)}
              curr={renderValue(currValue, key)}
              status={item.action}
            />
          )
        })}
      </div>
    </div>
  )
}

export default function EditLogModal({ resourceHistory, onClose }: EditLogModalProps) {
  if (!resourceHistory || resourceHistory.length === 0) return null

  const sortedHistory = [...resourceHistory].sort((a, b) => b.timestamp - a.timestamp)

  return (
    <Modal className="fixed top-[70px] left-[268px]">
      <div className="w-[650px] max-h-[90vh] bg-white rounded-md border shadow-lg overflow-y-hidden font-mono">
        <div className="sticky top-0 p-4 border-b bg-white z-10 flex justify-between items-center">
          <div>
            <h2 className="text-sm font-semibold">Change History</h2>
            <p className="text-xs text-gray-500 mt-1">{sortedHistory.length} change{sortedHistory.length > 1 ? 's' : ''} recorded</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 overflow-y-auto max-h-[calc(90vh-100px)] scrollbar-thin space-y-4">
          {sortedHistory.map((item, index) => (
            <HistoryItemCard 
              key={`${item.nodeId}-${item.timestamp}`} 
              item={item}
              isLatest={index === 0}
            />
          ))}
        </div>
      </div>
    </Modal>
  )
}

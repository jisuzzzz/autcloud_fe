'use client'
import Image from "next/image"
import { Search, Boxes, Box } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useLiveFlowStore } from "@/store/liveFlowStore"
import { useYjsStore } from "@/store/useYjsStore"
import { Node } from 'reactflow'

interface Resource {
  type: 'Compute' | 'BlockStorage' | 'Database' | 'ObjectStorage' | 'FireWall'
  label: string
  icon: string
}

interface SubItem {
  label: string
}

interface TemplateItem {
  value: string
  label: string
  img: string
  items: SubItem[]
}

interface ToolBarProps {
  userId: string | undefined
  // setNodes는 함수를 받음
  // 그 함수는 이전 상태(prev: Node[])를 매개변수로 받고
  // 새로운 상태(Node[])를 반환
  setNodes: (updater: (prev: Node[]) => Node[]) => void 
}

const resources: Resource[] = [
  { type: 'Compute', label: 'Compute', icon: '/aut-compute.svg' },
  { type: 'Database', label: 'Database', icon: '/aut-database.svg' },
  { type: 'BlockStorage', label: 'BlockStorage', icon: '/aut-block-storage.svg' },
  { type: 'ObjectStorage', label: 'ObjectStorage', icon: '/aut-obj-storage.svg' },
  { type: 'FireWall', label: 'Firewall', icon: '/aut-firewall.svg' },
]

const templates: TemplateItem[] = [
  {
    value: "templates1",
    label: "Templates-1",
    img: "/object-storage.svg",
    items: [
      { label: "temp-1-1" },
      { label: "temp-1-2" }
    ]
  },
  {
    value: "templates2",
    label: "Templates-2",
    img: "/compute.svg",
    items: [
      { label: "temp-2-1" },
      { label: "temp-2-2" }
    ]
  },
  {
    value: "templates3",
    label: "Templates-3",
    img: "/databases.svg",
    items: [
      { label: "temp-3-1" },
      { label: "temp-3-2" }
    ]
  }
]

function ListItem({ icon: Icon, label }: { icon: any, label: string }) {
  return (
    <div className="flex py-2 items-center gap-2 cursor-pointer">
      <Icon size={16}/>
      <p>{label}</p>
    </div>
  )
}

function TemplateAccordion({ item }: { item: TemplateItem }) {
  return (
    <AccordionItem value={item.value} className="border-none">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Image
            alt=""
            width={18}
            height={18}
            src={item.img}
          ></Image>
          <p className="text-sm">{item.label}</p>
        </div>
        <AccordionTrigger />
      </div>
      <AccordionContent>
        <div className="pl-7">
          {item.items.map((subItem, index) => (
            <ListItem 
              key={index}
              icon={Box} 
              label={subItem.label} 
            />
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

export default function ToolBar({ userId, setNodes }: ToolBarProps) {
  const { addNode, pushToUndoStack } = useLiveFlowStore()
  const { yDoc } = useYjsStore()

  const handleResourceClick = (resource: Resource) => {
    if(!userId || !yDoc) return

    const centerPosition = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    const newNode: Node = {
      id: `${resource.type}-${Date.now()}`,
      type: 'resource',
      position: centerPosition,
      data: { 
        type: resource.type,
        isNew: true
      },
    }
    setNodes((prev: Node[]) => [...prev, newNode])
    addNode(newNode, yDoc)
    pushToUndoStack(userId, {
      type: 'add',
      nodes: [newNode],
      timestamp: Date.now(),
    }, yDoc)
  }
  return (
    <div className="fixed top-[60px] left-0 bg-white border-r w-[256px] h-screen z-50">
      
      <div className="flex justify-between items-center px-4 py-[14px] border-b">
        <h3 className="text-sm font-medium">Objects</h3>
        <Search size={18} />
      </div>

      <div className="px-4 py-3 space-y-2 border-b">
        {resources.map((resource) => (
          <div
            key={resource.type}
            onClick={() => handleResourceClick(resource)}
            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded cursor-pointer"
          >
            <div className="w-[25px] h-[25px] relative">
              <Image
                src={resource.icon}
                alt={resource.type}
                fill
                className="object-contain rounded-xs"
              />
            </div>
            <span className="text-sm">{resource.label}</span>
          </div>
        ))}
      </div>
      
      <div className="px-4 py-4 space-y-2">
        <h3 className="text-sm font-medium">List</h3>
        <Accordion type="single" collapsible>
          {templates.map((template) => (
            <TemplateAccordion key={template.value} item={template} />
          ))}
        </Accordion>
      </div>
    </div>
  )
}
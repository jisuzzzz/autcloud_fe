'use client'
import Image from "next/image"
import { Search, Boxes, Box } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface Resource {
  type: 'EC2' | 'S3' | 'RDS' | 'ClOUDFRONT' | 'WAF'
  label: string
  icon: string
}

interface SubItem {
  label: string
}

interface TemplateItem {
  value: string
  label: string
  items: SubItem[]
}

const resources: Resource[] = [
  { type: 'EC2', label: 'EC2', icon: '/logos_aws-ec2.svg' },
  { type: 'S3', label: 'S3', icon: '/logos_aws-s3.svg' },
  { type: 'RDS', label: 'RDS', icon: '/logos_aws-rds.svg' },
  { type: 'ClOUDFRONT', label: 'CloudFront', icon: '/logos_aws-cloudfront.svg' },
  { type: 'WAF', label: 'WAF', icon: '/logos_aws-waf.svg' },
]

const templates: TemplateItem[] = [
  {
    value: "templates1",
    label: "Templates-1",
    items: [
      { label: "temp-1-1" },
      { label: "temp-1-2" }
    ]
  },
  {
    value: "templates2",
    label: "Templates-2",
    items: [
      { label: "temp-2-1" },
      { label: "temp-2-2" }
    ]
  },
  {
    value: "templates3",
    label: "Templates-3",
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
          <Boxes size={20} />
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

export default function ToolBar() {
  return (
    <div className="fixed top-[60px] left-0 bg-white border-r w-[256px] h-screen z-50">
      
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <h3 className="text-sm font-medium">Objects</h3>
        <Search size={18} />
      </div>

      <div className="px-4 py-3 space-y-2 border-b">
        {resources.map((resource) => (
          <div
            key={resource.type}
            
            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded cursor-pointer"
          >
            <div className="w-6 h-6 relative">
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
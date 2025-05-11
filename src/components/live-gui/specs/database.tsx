import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { InfoItem, SpecSection, InfoIcon } from '../specBar';
import { DatabaseSpecType } from '@/lib/projectDB';
import { useEffect, useState } from "react"
import { eventBus } from "@/services/eventBus"

interface DatabaseSpecProps {
  spec: DatabaseSpecType;
}

export default function DatabaseSpec({ spec }: DatabaseSpecProps) {
  const [specState, setSpec] = useState(spec)
  useEffect(() => {
    // 이벤트 구독
    const unsubscribe = eventBus.subscribe('dbSpecUpdated', (updatedSpec) => {
      setSpec(prevSpec => ({ ...prevSpec, ...updatedSpec }))
    })
    
    // 컴포넌트 언마운트시 구독 해제
    return () => unsubscribe();
  }, [])
  return (
    <>
      <div className="flex justify-between items-center px-4 py-2.5 border-b">
        <h3 className="text-xs text-gray-500">Stauts</h3>
        <Button
          className={cn('px-2.5 h-7 rounded-sm pointer-events-none text-xs', {
            'bg-green-500': spec.status === 'running',
            'bg-yellow-500': spec.status === 'pending',
            'bg-red-500': spec.status === 'stopped',
          })}
        >
          {spec.status}
        </Button>
      </div>

      <SpecSection>
        <InfoItem label="ID">{spec.id}</InfoItem>
        <InfoItem label="Node-Plan">{spec.node_plan}</InfoItem>
        <InfoItem label="Cluster Created">{spec.cluster_created}</InfoItem>
      </SpecSection>

      <SpecSection>
        <InfoItem label="DB Engine">{spec.db_engine}</InfoItem>
        <InfoItem label="Latest Backup">{spec.latest_backup}</InfoItem>
        <InfoItem label="Replica Nodes">
          {spec.replica_nodes ? 'Yes' : 'No'}
        </InfoItem>
        <InfoItem label="Location">
          <div className="flex items-center gap-3">
            <Image
              alt="region"
              src={'/flag-icn.svg'}
              width={25}
              height={25}
            ></Image>
            <p className="text-[13px]">{spec.location}</p>
          </div>
        </InfoItem>
        <InfoItem label="Label">
          <p className="text-[13px] text-[#8171E8]">{spec.label}</p>
        </InfoItem>
        <InfoItem label="Tag">
          <p className="text-[13px] text-[#8171E8]">{spec.tag}</p>
          <InfoIcon label="?" />
        </InfoItem>
      </SpecSection>
    </>
  );
}

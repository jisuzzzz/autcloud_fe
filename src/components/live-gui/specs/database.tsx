import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { InfoItem, SpecSection } from '../specBar';
import { DatabaseSpecType } from '@/lib/projectDB';
import { useEffect, useState, useMemo } from "react"
import { RegionsArray } from '@/lib/resourceOptions';

interface DatabaseSpecProps {
  spec: DatabaseSpecType;
}

export default function DatabaseSpec({ spec:localSpec }: DatabaseSpecProps) {
  const [spec, setSpec] = useState(localSpec)

  useEffect(() => {
    setSpec(localSpec)
  }, [localSpec])
  // 지역 ID에서 국기 이미지 경로 매핑
  const regionInfo = useMemo(() => {

    let regionId = spec.region_id
    
    const region = RegionsArray.find(r => r.id === regionId);
    return {
      flag: region?.flag || '/flag-icn.svg',
    };
  }, [spec.region_id]);

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
      <InfoItem label="Region">
          <div className="flex items-center gap-2">
            <Image
              alt="region"
              src={regionInfo.flag}
              width={21}
              height={21}
            ></Image>
            <p className="text-xs">{`${spec.region} (${spec.region_id})`}</p>
          </div>
        </InfoItem>
        <InfoItem label="ID">{spec.plan}</InfoItem>
        <InfoItem label="DB Engine">{(spec.db_engine === 'pg' ? 'PostgreSQL' : 'MySQL' ) + " " + spec.db_version}</InfoItem>
      </SpecSection>

      <SpecSection>
        <InfoItem label="vCPU/s">{`${spec.vcpu_count} vCPU`}</InfoItem>
        <InfoItem label="RAM">{`${spec.ram} MB`}</InfoItem>
        <InfoItem label="Disk">{`${spec.disk} GB`}</InfoItem>
        <InfoItem label="Replica Nodes">
          {`${spec.replica_nodes} Node`}
        </InfoItem>
        <InfoItem label="Monthly Cost">{`$${spec.monthly_cost} per Month`}</InfoItem>
        
      </SpecSection>
      <SpecSection>
        <InfoItem label="Latest Backup">{spec.latest_backup}</InfoItem>
      </SpecSection>
    </>
  );
}

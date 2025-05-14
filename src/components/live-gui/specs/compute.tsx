'use client'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { InfoItem, SpecSection, InfoIcon } from '../specBar';
import { Copy } from 'lucide-react';
import { ComputeSpecType } from '@/lib/projectDB';
import { useEffect, useState, useMemo } from 'react';
import { eventBus } from '@/services/eventBus';
import { RegionsArray } from '@/lib/resourceOptions';

interface ComputeSpecProps {
  spec: ComputeSpecType;
}

export default function ComputeSpec({ spec: initSpec }: ComputeSpecProps) {
  const [spec, setSpec] = useState(initSpec);

  useEffect(() => {
    setSpec(initSpec)
  }, [initSpec])


  useEffect(() => {
    // 이벤트 구독
    const unsubscribe = eventBus.subscribe('computeSpecUpdated', (updatedSpec) => {
      setSpec(prevSpec => ({ ...prevSpec, ...updatedSpec }));
    });
    
    // 컴포넌트 언마운트시 구독 해제
    return () => unsubscribe();
  }, []);

  // 지역 ID에서 국기 이미지 경로 매핑
  const regionInfo = useMemo(() => {

    let regionId = spec.region;
    const regionCodeMatch = spec.region.match(/\(([^)]+)\)/);
    if (regionCodeMatch) {
      regionId = regionCodeMatch[1];
    }
    
    const region = RegionsArray.find(r => r.id === regionId);
    return {
      flag: region?.flag || '/flag-icn.svg',
    };
  }, [spec.region]);
  
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
            <p className="text-xs">{spec.region}</p>
          </div>
        </InfoItem>
        
        <InfoItem label='Plan'>{spec.plan}</InfoItem>
        <InfoItem label="OS">{spec.os}</InfoItem>
        <InfoItem label="IP Adress">
          <div className="flex w-full justify-between items-center">
            <p className="text-xs">{spec.ip_address}</p>
            <Copy size={18} className="text-gray-500 hover:text-[#8171E8]" />
          </div>
        </InfoItem>
      </SpecSection>

      <SpecSection>
        <InfoItem label="vCPU/s">{`${spec.vcpu} vCPU`}</InfoItem>
        <InfoItem label="RAM">{`${spec.ram} MB`}</InfoItem>
        <InfoItem label="Disk">{`${spec.disk} GB`}</InfoItem>
        <InfoItem label="Bandwidht">
          <p className="text-xs text-[#8171E8]">{`${spec.bandwidth} GB`}</p>
          <InfoIcon label="?" />
        </InfoItem>
        <InfoItem label="Monthly Cost">{`$${spec.monthly_cost} per Month`}</InfoItem>
      </SpecSection>

      <SpecSection>
        <InfoItem label="Auto Backups">
          {spec.auto_backups ? (
            <p className="text-xs text-green-600">Enabled</p>
          ) : (
            <p className="text-xs text-red-600">Not Enabled</p>
          )}
          <InfoIcon label="!" />
        </InfoItem>
      </SpecSection>
    </>
  );
}
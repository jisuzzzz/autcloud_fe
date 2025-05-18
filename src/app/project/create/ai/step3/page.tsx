'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { getProjectById } from '@/lib/projectDB';
import ProjectThumbnail from '@/components/live-gui/thumbnail';

const DIAGRAMS = [
  getProjectById("9cd47912-c94a-451f-a1a2-ec5b2097c461"),
  getProjectById("8ab36845-d77c-482f-b9e3-5a4c31f89d52"),
  getProjectById("5cd92f34-a17b-429d-8e35-9bf72c680d13")
].filter(Boolean);

function getTotalMonthlyCost(resources: any[]) {
  return resources.reduce((sum, resource) => {
    const cost = Number(resource?.spec?.monthly_cost || resource?.spec?.price || 0);
    return sum + cost;
  }, 0);
}

function getMainSpecInfo(resource: any) {
  const { type, spec } = resource;
  
  switch(type) {
    case 'Compute': return `Plan: ${spec.plan} ($${spec.monthly_cost} /month)`;
    case 'Database': return `Plan: ${spec.plan} ($${spec.monthly_cost} /month)`;
    case 'BlockStorage': return `${spec.size}GB • ${spec.type}`;
    case 'ObjectStorage': return `Plan: ${spec.plan} ($${spec.price} /month)`;
    case 'FireWall': return 'Security rules';
    default: return '';
  }
}

export default function Step3Page() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handlePrevious = () => router.back();
  const handleConfirm = () => {
    if (selectedId) {
      router.push(`/project/${selectedId}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7FF]">
      <div className='px-[60px] py-[20px]'>

        <div className="grid grid-cols-3 items-center mb-6 pt-4">
          <button
            onClick={handlePrevious}
            className="text-gray-500 text-[14px] justify-self-start hover:text-black cursor-pointer"
          >
            ← Back
          </button>

          <h2 className="text-[18px] font-semibold justify-self-center">Choose a diagram</h2>
          
          <div />
        </div>

        <div className="grid grid-cols-3 gap-6 mb-14">
          {DIAGRAMS.map((diagram) => diagram && (
            <div
              key={diagram.id}
              onClick={() => setSelectedId(diagram.id)}
              className={`w-full h-[560px] rounded-xl border p-0 cursor-pointer
                transition-all overflow-hidden flex flex-col
                ${diagram.id === selectedId ? 'border-black' : 'border-gray-200 hover:border-gray-300'}
              `}
            >
              <div className="w-full h-[240px] bg-gray-50">
                <ProjectThumbnail
                  project={diagram}
                  width={380}
                  height={240}
                />
              </div>

              <div className="p-4 flex-1 overflow-y-auto bg-white">
                <div className="mb-3">
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {diagram.description}
                  </p>
                  <p className="text-xs font-medium text-left text-gray-700 mt-2">
                    Total: ${getTotalMonthlyCost(diagram.initial_resources)} /month
                  </p>
                </div>

                <div className="space-y-2">
                  {diagram.initial_resources.map(resource => (
                    <div key={resource.id} className="text-xs p-3 border rounded-md bg-gray-50">
                      <div className="font-medium mb-1">{resource.type}</div>
                      <div className="text-gray-500 truncate">
                        {getMainSpecInfo(resource)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex w-full justify-center">
          <Button 
            onClick={handleConfirm}
            disabled={!selectedId}
            className="w-[480px] bg-gray-50 hover:bg-gray-100 hover:border-gray-300 text-black border text-sm h-10 flex items-center cursor-pointer"
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}

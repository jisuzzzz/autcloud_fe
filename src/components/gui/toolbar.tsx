'use client'
import Image from 'next/image';
import { useFlowMapStore } from '@/store/flowMapStore';

interface Resource {
  type: 'EC2' | 'S3' | 'RDS'
  label: string;
  icon: string;
}

const resources: Resource[] = [
  { type: 'EC2', label: 'EC2 Instance', icon: '/logos_aws-ec2.svg' },
  { type: 'S3', label: 'S3 Bucket', icon: '/logos_aws-s3.svg' },
  { type: 'RDS', label: 'RDS Database', icon: '/logos_aws-rds.svg' },
];

export default function ToolBar() {
  const { nodes, setNodes, pushToUndoStack, userId, userName } = useFlowMapStore();

  const handleClick = (resource: Resource) => {
    if (!userId) return;  // userId가 없으면 리턴

    const centerPosition = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    const newNode = {
      id: `${resource.type}-${Date.now()}`,
      type: 'resource',
      position: centerPosition,
      data: { 
        type: resource.type,
        createdBy: userName
      },
    };

    pushToUndoStack(userId, {
      type: 'add',
      nodes: [newNode],
      timestamp: Date.now()
    });

    setNodes([...nodes, newNode]);
  };

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-2 space-y-2 z-50">
      <h3 className="text-sm font-semibold px-2 py-1 border-b">AWS Resources</h3>
      <div className="space-y-1">
        {resources.map((resource) => (
          <div
            key={resource.type}
            onClick={() => handleClick(resource)}
            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded cursor-pointer"
          >
            <div className="w-6 h-6 relative">
              <Image
                src={resource.icon}
                alt={resource.type}
                fill
                className="object-contain"
              />
            </div>
            <span className="text-sm">{resource.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
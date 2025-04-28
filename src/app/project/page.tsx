'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Upload, Folder, Search, List, LayoutGrid } from 'lucide-react';
import SideBar from '@/components/custom/sidebar';
import { CreateButton } from '@/components/custom/actionButtons';
import ProjectItem from '@/components/custom/projectItem';
import SortDropdown from '@/components/custom/sortDropdown';

const PROJECT_TEMPLATES = [
  {
    id: '9cd47912-c94a-451f-a1a2-ec5b2097c461',
    name: 'project-example-1-api-test',
    description: 'project-example-1-api-test',
  },
  {
    id: '601f9404-1cea-431d-88ac-a5fadaffc36e',
    name: 'project-example-2-api-test',
    description: 'project-example-2-api-test',
  },
];

export default function ProjectPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const router = useRouter();

  const handleCreateClick = () => {
    router.push('/project/create');
  };

  return (
    <div className="flex min-h-screen bg-white">
      <SideBar />
      <div className="flex-1">
        <header className="flex items-center justify-between border-b px-6 py-4">
          <div className="w-96">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search files..."
                className="pl-9"
              />
            </div>
          </div>
        </header>

        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex gap-4">
              <Button
                onClick={handleCreateClick}
                className="h-9 px-4 bg-black text-white hover:bg-gray-900"
              >
                <Plus size={16} />
                Create project
              </Button>
              <Button variant="outline">
                <Upload size={16} />
                Upload
              </Button>
              <Button variant="outline">
                <Folder size={16} />
                Create folder
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <SortDropdown />
              <button
                onClick={() => setViewMode('list')}
                className={`p-1 rounded-md hover:bg-gray-100 transition ${
                  viewMode === 'list' ? 'text-black' : 'text-gray-400'
                }`}
                aria-label="목록 보기"
              >
                <List size={20} />
              </button>

              <button
                onClick={() => setViewMode('grid')}
                className={`p-1 rounded-md hover:bg-gray-100 transition ${
                  viewMode === 'grid' ? 'text-black' : 'text-gray-400'
                }`}
                aria-label="카드 보기"
              >
                <LayoutGrid size={18} />
              </button>
            </div>
          </div>

          <div className="mb-6">
            <Tabs defaultValue="recent">
              <TabsList>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="starred">Starred</TabsTrigger>
                <TabsTrigger value="shared">Shared</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'
                : 'flex flex-col gap-4'
            }
          >
            {PROJECT_TEMPLATES.map((project) => (
              <ProjectItem
                key={project.id}
                id={project.id}
                name={project.name}
                description={project.description}
                thumbnail="/img-placeholder.svg"
                viewMode={viewMode}
                specs={[
                  { name: 'EC2', value: 't2.micro' },
                  { name: 'S3', value: 'bucket' },
                  { name: 'RDS', value: 'db.t2.micro' },
                  { name: 'Spec 4', value: 101 },
                  { name: 'Spec 5', value: 202 },
                  { name: 'Spec 6', value: 303 },
                  { name: 'Spec 7', value: 404 },
                  { name: 'Spec 8', value: 505 },
                ]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

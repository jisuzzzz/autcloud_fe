'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Plus, Upload, Folder, Search, List, LayoutGrid } from 'lucide-react';
import Header from '@/components/custom/header';
import ProjectItem from '@/components/custom/projectItem';
import SortDropdown from '@/components/custom/sortDropdown';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getProjects } from '@/lib/projectDB';

// const PROJECT_TEMPLATES = [
//   {
//     id: '9cd47912-c94a-451f-a1a2-ec5b2097c461',
//     name: 'project-example-1-api-test',
//     description: 'project-example-1-api-test',
//   },
//   {
//     id: '601f9404-1cea-431d-88ac-a5fadaffc36e',
//     name: 'project-example-2-api-test',
//     description: 'project-example-2-api-test',
//   },
//   {
//     id: 'aabbccdd-1234-5678-9999-example03',
//     name: 'project-example-3',
//     description: 'project-example-3-description',
//   },
//   {
//     id: 'eeffeeff-5678-4321-8888-example04',
//     name: 'project-example-4',
//     description: 'project-example-4-description',
//   },
// ];

export default function ProjectPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const router = useRouter();
  
  const projects = getProjects()
  // console.log(projects)
  const handleCreateClick = () => {
    router.push('/project/create');
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex-1">
        <Header />

        <div className="p-6">
          {/* 제목 + 생성 버튼 */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-medium">Project</h2>
            <Button
              onClick={handleCreateClick}
              className="h-9 px-4 bg-black text-white hover:bg-gray-700"
            >
              <Plus size={16} className="mr-1" />
              Create project
            </Button>
          </div>

          <div className="mt-6 mb-6 flex items-center justify-between">
            {/* 탭 */}
            <Tabs defaultValue="recent">
              <TabsList>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="starred">Activate</TabsTrigger>
                <TabsTrigger value="shared">Completed</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* 정렬 및 보기 모드 */}
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

          {/* 리스트 헤더 */}
          {viewMode === 'list' && (
            <div className="mt-4 grid grid-cols-[minmax(320px,auto)_1px_repeat(5,96px)_96px_48px_48px] items-center gap-x-6 px-6 pb-2 text-sm font-medium text-gray-400">
              <div className="pl-1">Label</div>
              <div></div>
              <div className="text-center">Label</div>
              <div className="text-center">Label</div>
              <div className="text-center">Label</div>
              <div className="text-center">Label</div>
              <div className="text-center">Label</div>
              <div className="text-center">Created</div>
              <div className="text-center">Created</div>
              <div className="text-center">label</div>
            </div>
          )}

          {/* 프로젝트 목록 */}
          <div
            className={`mt-4 ${
              viewMode === 'grid'
                ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                : 'flex flex-col'
            }`}
          >
            {projects.map((project) => (
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
                ]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

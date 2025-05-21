import Link from 'next/link';
import Header from '@/components/custom/ui/header/header';
import ProjectItem from '@/components/custom/panel/projectItem';
import { getProjects } from '@/lib/db/projectDB';
import ProjectThumbnail from '@/components/custom/panel/thumbnail';
import Image from 'next/image';

export default async function ProjectPage() {
  
  const projects = getProjects();

  return (
    <div className="min-h-screen bg-[#F8F7FF]">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="mb-8">
          <h1 className="text-xl font-semibold text-gray-900">Projects</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">

          <Link
            href={'/project/create'}
            className="group relative bg-white rounded-lg border border-gray-300 hover:border-gray-400 transition-all hover:shadow-lg overflow-hidden"
          >
            <div className="aspect-[16/9] w-full h-full relative bg-white">
              <Image
                src="/aut-logo-cloud.svg"
                alt="New Project"
                fill
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                  <Image src={"/fluent-emoji_plus.svg"} alt='plus' width={30} height={30}/>
                  <h3 className="text-sm font-medium text-gray-900">New Project</h3>
                  <p className="text-xs text-gray-500 mt-1">Create a new project</p>
                </div>
              </div>
            </div>
          </Link>

          {projects.map((project) => (
            <ProjectItem
              key={project.id}
              id={project.id}
              name={project.name}
              description={project.description}
              thumbnail={
                <ProjectThumbnail
                  project={project}
                  width={380}
                  height={250}
                />
              }
              resource={project.initial_resources}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

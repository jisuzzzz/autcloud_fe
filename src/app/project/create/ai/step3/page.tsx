// 'use client';

// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
// import { ProjectTemplate,getProjectById } from '@/lib/projectDB';
// import ProjectThumbnailWrapper from '@/components/live-gui/thumbnailWrapper';

// // const DIAGRAMS = [
// //   {
// //     id: 1,
// //     title: 'Diagram A',
// //     specs: ['Spec 1', 'Spec 2', 'Spec 3', 'Spec 4', 'Spec 5'],
// //   },
// //   {
// //     id: 2,
// //     title: 'Diagram B',
// //     specs: ['Spec 1', 'Spec 2', 'Spec 3', 'Spec 4', 'Spec 5'],
// //   },
// //   {
// //     id: 3,
// //     title: 'Diagram C',
// //     specs: ['Spec 1', 'Spec 2', 'Spec 3', 'Spec 4', 'Spec 5'],
// //   },
// // ];
// const DIAGRAMS = [
//   getProjectById("9cd47912-c94a-451f-a1a2-ec5b2097c461"),
//   getProjectById("8ab36845-d77c-482f-b9e3-5a4c31f89d52"),
//   getProjectById("5cd92f34-a17b-429d-8e35-9bf72c680d13")
// ].filter(Boolean)

// // 리소스 타입별 개수 계산
// function countResourceTypes(resources: ResourceConfig[]) {
//   return resources.reduce((acc, resource) => {
//     acc[resource.type] = (acc[resource.type] || 0) + 1;
//     return acc;
//   }, {} as Record<string, number>);
// }

// // 리소스 타입에 따른 색상 반환
// function getResourceColor(type: string) {
//   const colors = {
//     Compute: '#1890ff',
//     Database: '#52c41a',
//     BlockStorage: '#fa8c16',
//     ObjectStorage: '#722ed1',
//     FireWall: '#f5222d'
//   };
//   return colors[type as keyof typeof colors] || '#999';
// }

// // 리소스 타입에 따라 주요 스펙 정보 반환
// function getMainSpecInfo(resource: ResourceConfig) {
//   const type = resource.type;
//   const spec = resource.spec;
  
//   switch(type) {
//     case 'Compute':
//       return `${(spec as any).vcpu} • ${(spec as any).ram} • ${(spec as any).os}`;
//     case 'Database': 
//       return `${(spec as any).db_engine} • ${(spec as any).location}`;
//     case 'BlockStorage':
//       return `${(spec as any).size} • ${(spec as any).type}`;
//     case 'ObjectStorage':
//       return `${(spec as any).tier} • ${(spec as any).location}`;
//     case 'FireWall':
//       return 'Security rules';
//     default:
//       return '';
//   }
// }

// export default function Step3Page() {
//   const router = useRouter();
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [screenWidth, setScreenWidth] = useState(1280);

//   const CARD_WIDTH = 360;
//   const CARD_GAP = 32;

//   useEffect(() => {
//     const handleResize = () => setScreenWidth(window.innerWidth);
//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const handlePrevious = () => router.back();

//   const handleConfirm = () => {
//     const selectedDiagram = DIAGRAMS[currentIndex];
//     const projectId = selectedDiagram.id;
//     router.push(`/project/${projectId}`);
//   };

//   const handlePrevSlide = () => {
//     if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
//   };

//   const handleNextSlide = () => {
//     if (currentIndex < DIAGRAMS.length - 1) setCurrentIndex(currentIndex + 1);
//   };

//   const getTranslateX = () => {
//     const cardUnit = CARD_WIDTH + CARD_GAP / 2;

//     if (currentIndex === 1) {
//       return 0;
//     } else if (currentIndex === 0) {
//       return cardUnit / 2;
//     } else {
//       return -(cardUnit / 2);
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-white px-[60px] py-[50px]">
//       {/* Back 버튼 */}
//       <Button
//         onClick={handlePrevious}
//         variant="ghost"
//         className="mb-8 w-fit text-gray-500 text-[14px]"
//       >
//         ← Back
//       </Button>

//       {/* Title + 화살표 */}
//       <div className="flex items-center justify-between mb-[50px]">
//         <h2 className="text-[18px] font-bold">Choose a diagram</h2>
//         <div className="flex gap-[12px]">
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={handlePrevSlide}
//             disabled={currentIndex === 0}
//             className="h-[36px] w-[36px]"
//           >
//             <ChevronLeft className="h-[20px] w-[20px]" />
//           </Button>
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={handleNextSlide}
//             disabled={currentIndex === DIAGRAMS.length - 1}
//             className="h-[36px] w-[36px]"
//           >
//             <ChevronRight className="h-[20px] w-[20px]" />
//           </Button>
//         </div>
//       </div>

//       {/* 카드 슬라이드 */}
//       <div className="overflow-hidden w-full mb-10">
//         <div
//           className="flex justify-center transition-transform duration-300 ease-in-out gap-[40px]"
//           style={{
//             transform: `translateX(${getTranslateX()}px)`,
//           }}
//         >
//           {DIAGRAMS.map((diagram, idx) => (
//             <div
//               key={diagram.id}
//               onClick={() => setCurrentIndex(idx)}
//               className={`w-[380px] h-[560px] shrink-0 rounded-[12px] border p-0 cursor-pointer
//                 transition-all overflow-hidden flex flex-col
//                 ${
//                   idx === currentIndex
//                     ? 'border-black'
//                     : 'border-gray-300 hover:border-gray-400'
//                 }
//               `}
//             >
              
//               {/* 썸네일 */}
//               <div className="w-full h-[220px] bg-gray-100">
//                 <ProjectThumbnailWrapper 
//                   project={diagram} 
//                   width={600} 
//                   height={220} 
//                 />
//               </div>

//               {/* 상세 정보 (여백 있음) */}
//               <div className="p-[16px] flex-1 overflow-y-auto">
//                 {/* 다이어그램 설명 */}
//                 <p className="text-[13px] text-gray-600 line-clamp-2">
//                   {diagram.description}
//                 </p>

//                 {/* 리소스 요약 정보 */}
//                 <div className="text-[13px] text-gray-700">
                  
//                   {/* 주요 리소스 정보 */}
//                   <div className="mt-3 space-y-3 scrollbar-thin">
//                     {diagram.initial_resources
//                       .map(resource => (
//                         <div key={resource.id} className="text-xs px-3 py-2 border rounded-md">
//                           <div className="font-medium mb-1">{resource.id}</div>
//                           <div className="text-gray-500 truncate">
//                             {getMainSpecInfo(resource)}
//                           </div>
//                         </div>
//                       ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Pagination dots */}
//       <div className="flex justify-center gap-2 mb-[40px]">
//         {DIAGRAMS.map((_, idx) => (
//           <button
//             key={idx}
//             onClick={() => setCurrentIndex(idx)}
//             className={`w-[8px] h-[8px] rounded-full ${
//               idx === currentIndex ? 'bg-black' : 'bg-gray-300'
//             }`}
//             aria-label={`Go to slide ${idx + 1}`}
//           />
//         ))}
//       </div>

//       {/* Footer 버튼 */}
//       <div className="flex justify-end w-full mt-auto">
//         <div className="flex gap-[16px]">
//           <Button
//             variant="ghost"
//             className="text-gray-500 text-[14px]"
//             onClick={handlePrevious}
//           >
//             Previous
//           </Button>
//           <Button 
//             onClick={handleConfirm}
//             className="bg-primary text-white hover:bg-primary/90 flex items-center gap-2 h-[46px] px-[26px] text-[14px]"
//           >
//             <Check className="h-[16px] w-[16px]" />
//             Confirm
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

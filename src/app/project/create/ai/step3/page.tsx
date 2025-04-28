'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

const DIAGRAMS = [
  {
    id: 1,
    title: 'Diagram A',
    specs: ['Spec 1', 'Spec 2', 'Spec 3', 'Spec 4', 'Spec 5'],
  },
  {
    id: 2,
    title: 'Diagram B',
    specs: ['Spec 1', 'Spec 2', 'Spec 3', 'Spec 4', 'Spec 5'],
  },
  {
    id: 3,
    title: 'Diagram C',
    specs: ['Spec 1', 'Spec 2', 'Spec 3', 'Spec 4', 'Spec 5'],
  },
];

export default function Step3Page() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(1280);

  const CARD_WIDTH = 360;
  const CARD_GAP = 32;

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrevious = () => router.back();

  const handleConfirm = () => {
    const selectedDiagram = DIAGRAMS[currentIndex];
    const projectId = selectedDiagram.id;
    router.push(`/project/${projectId}`);
  };

  const handlePrevSlide = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNextSlide = () => {
    if (currentIndex < DIAGRAMS.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const getTranslateX = () => {
    const cardUnit = CARD_WIDTH + CARD_GAP / 2;

    if (currentIndex === 1) {
      return 0;
    } else if (currentIndex === 0) {
      return cardUnit / 2;
    } else {
      return -(cardUnit / 2);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white px-[80px] py-[60px]">
      {/* Back 버튼 */}
      <Button
        onClick={handlePrevious}
        variant="ghost"
        className="mb-6 w-fit text-gray-500 text-[14px]"
      >
        ← Back
      </Button>

      {/* Title + 화살표 */}
      <div className="flex items-center justify-between mb-[40px]">
        <h2 className="text-[20px] font-bold">Choose a diagram</h2>
        <div className="flex gap-[8px]">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevSlide}
            disabled={currentIndex === 0}
            className="h-[32px] w-[32px]"
          >
            <ChevronLeft className="h-[20px] w-[20px]" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNextSlide}
            disabled={currentIndex === DIAGRAMS.length - 1}
            className="h-[32px] w-[32px]"
          >
            <ChevronRight className="h-[20px] w-[20px]" />
          </Button>
        </div>
      </div>

      {/* 카드 슬라이드 */}
      <div className="overflow-hidden w-full">
        <div
          className="flex justify-center transition-transform duration-300 ease-in-out gap-[32px]"
          style={{
            transform: `translateX(${getTranslateX()}px)`,
          }}
        >
          {DIAGRAMS.map((diagram, idx) => (
            <div
              key={diagram.id}
              onClick={() => setCurrentIndex(idx)}
              className={`w-[360px] h-[440px] shrink-0 rounded-[8px] border p-[20px] cursor-pointer
                transition-all
                ${
                  idx === currentIndex
                    ? 'border-black'
                    : 'border-gray-300 hover:border-gray-400'
                }
              `}
            >
              {/* 썸네일 */}
              <div className="w-full h-[200px] bg-gray-100 rounded-[8px] mb-[20px]" />

              {/* 다이어그램 이름 */}
              <div className="text-[16px] font-semibold text-gray-900 mb-[16px]">
                {diagram.title}
              </div>

              {/* 스펙 리스트 */}
              <ul className="text-[14px] text-gray-700 space-y-[4px]">
                {diagram.specs.map((spec, i) => (
                  <li key={i} className="flex">
                    <span className="w-[80px] text-gray-500">{spec}</span>
                    <span>{'{number}'}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Footer 버튼 */}
      <div className="flex justify-end w-full mt-[60px]">
        <div className="flex gap-[12px]">
          <Button
            variant="ghost"
            className="text-gray-500 text-[14px]"
            onClick={handlePrevious}
          >
            Previous
          </Button>
          <Button
            onClick={handleConfirm}
            className="bg-primary text-white hover:bg-primary/90 flex items-center gap-2 h-[44px] px-[24px] text-[14px]"
          >
            <Check className="h-[16px] w-[16px]" />
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}

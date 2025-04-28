'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Sparkles } from 'lucide-react';

export default function CreateProjectPage() {
  const router = useRouter();

  const handleStartFromScratch = () => {
    console.log('Start from scratch');
  };

  const handleCreateWithAI = () => {
    router.push('/project/create/ai/step1');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 상단 Back 버튼 */}
      <div className="p-6">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="text-gray-500 w-fit px-0"
        >
          ← Back
        </Button>
      </div>

      {/* 카드 영역 */}
      <div className="flex flex-1 justify-center items-start pt-32 gap-5">
        <Card onClick={handleStartFromScratch} className="cursor-pointer">
          <CardContent>
            <Pencil size={48} className="mb-6 text-black" />
            <h2 className="text-lg font-semibold mb-2 text-black">
              Start from scratch
            </h2>
            <p className="text-gray-500 text-sm">Description</p>
          </CardContent>
        </Card>

        <Card onClick={handleCreateWithAI} className="cursor-pointer">
          <CardContent>
            <Sparkles size={48} className="mb-6 text-black" />
            <h2 className="text-lg font-semibold mb-2 text-black">
              Create with AI
            </h2>
            <p className="text-gray-500 text-sm">Description</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

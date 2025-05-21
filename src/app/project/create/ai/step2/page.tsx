'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import FormDropdown from '@/components/custom/ui/dropDown/formDropdown';

export default function Step2Page() {
  const router = useRouter();

  const handleNext = () => {
    router.push('/project/create/ai/step3');
  };

  const handlePrevious = () => {
    router.back();
  };

  return (
    <div className="flex flex-col min-h-screen bg-white p-10">
      {/* Back 버튼 */}
      <Button
        onClick={() => router.back()}
        variant="ghost"
        className="mb-8 w-fit text-gray-500"
      >
        ← Back
      </Button>

      {/* 질문 영역 */}
      <div className="flex flex-1 items-start justify-center pt-8">
        <div className="max-w-2xl w-full space-y-10">
          {/* Question 5 */}
          <div>
            <label className="block text-base font-semibold mb-2">
              Question 5
            </label>
            <Input placeholder="Place holder" />
          </div>

          {/* Question 6 */}
          <div>
            <label className="block text-base font-semibold mb-2">
              Question 6
            </label>
            <div className="flex gap-4">
              <FormDropdown
                placeholder="Place holder"
                options={['Option 1', 'Option 2', 'Option 3']}
              />
              <FormDropdown
                placeholder="Place holder"
                options={['Option A', 'Option B', 'Option C']}
              />
            </div>
          </div>

          {/* Question 7 */}
          <div>
            <label className="block text-base font-semibold mb-2">
              Question 7
            </label>
            <Input placeholder="Place holder" />
          </div>

          {/* Question 8 */}
          <div>
            <label className="block text-base font-semibold mb-2">
              Question 8
            </label>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1 w-full text-sm hover:border-gray-400"
              >
                Button
              </Button>
              <Button
                variant="outline"
                className="flex-1 w-full text-sm hover:border-gray-400"
              >
                Button
              </Button>
            </div>
          </div>

          {/* Previous & Next 버튼 */}
          <div className="flex justify-end items-center gap-4 mt-8">
            <Button
              variant="ghost"
              onClick={handlePrevious}
              className="text-gray-500"
            >
              Previous
            </Button>
            <Button onClick={handleNext}>Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

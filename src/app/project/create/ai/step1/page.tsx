'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import FormDropdown from '@/components/custom/formDropdown';

export default function Step1Page() {
  const router = useRouter();

  const handleNext = () => {
    router.push('/project/create/ai/step2');
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
          {/* Question 1 */}
          <div>
            <label className="block text-base font-semibold mb-2">
              Question 1
            </label>
            <Input placeholder="Place holder" />
          </div>

          {/* Question 2 */}
          <div>
            <label className="block text-base font-semibold mb-2">
              Question 2
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
              <Button
                variant="outline"
                className="flex-1 w-full text-sm hover:border-gray-400"
              >
                Button
              </Button>
            </div>
          </div>

          {/* Question 3 */}
          <div>
            <label className="block text-base font-semibold mb-2">
              Question 3
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

          {/* Question 4 */}
          <div>
            <label className="block text-base font-semibold mb-2">
              Question 4
            </label>
            <Input placeholder="Place holder" />
          </div>

          {/* Next 버튼 */}
          <div className="flex justify-end mt-8">
            <Button onClick={handleNext}>Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import FormDropdown from '@/components/custom/formDropdown';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Step2Page() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const handleNext = () => router.push('/project/create/ai/step3');
  const handlePrevious = () => router.back();

  return (
    <div className="min-h-screen bg-[#F8F7FF] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-[60px] py-[20px]"
      >
        <div className="grid grid-cols-3 items-center mb-10 pt-4">
          <button
            onClick={handlePrevious}
            className="text-gray-500 text-[14px] justify-self-start hover:text-black cursor-pointer"
          >
            ← Back
          </button>

          <h2 className="text-[16px] sm:text-[18px] font-semibold justify-self-center">
            Step 2
          </h2>

          <div />
        </div>

        <div className="max-w-3xl w-full mx-auto space-y-10">
          <div>
            <label className="block text-base font-semibold mb-2">
              Question 5
            </label>
            <Input placeholder="Place holder" />
          </div>

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

          <div>
            <label className="block text-base font-semibold mb-2">
              Question 7
            </label>
            <Input placeholder="Place holder" />
          </div>

          <div>
            <label className="block text-base font-semibold mb-2">
              Question 8
            </label>
            <div className="flex gap-4">
              {['Option X', 'Option Y'].map((label, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelected(label)}
                  className={`flex-1 text-sm border rounded-md px-4 py-2 transition-all duration-300 ease-in-out
                    ${
                      selected === label
                        ? 'border-gray-400 bg-gray-50 shadow-md scale-[1.015] ring-1 ring-gray-300 ring-offset-1'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end items-center gap-4 pt-4">
            <Button
              variant="ghost"
              onClick={handlePrevious}
              className="text-gray-500 text-sm transition"
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              className="bg-[#7868E6] hover:bg-[#6a5ed4] text-white text-sm transition"
            >
              Next
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

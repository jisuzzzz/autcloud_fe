'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Pencil, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import CreateProjectModal from '@/components/custom/modal/createProjectModal';

export default function CreateProjectPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleStartFromScratch = () => {
    // console.log('Start from scratch');
    setIsModalOpen(true)
  };

  const handleCreateWithAI = () => {
    setIsModalOpen(true)
  };

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleModalSuccess = (res:any) => {
    setIsModalOpen(false)
    router.push(`/project/create/${res.project_id}/ai/step1`)
  }

  return (
    <motion.div
      className="flex flex-col min-h-screen bg-[#F8F7FF]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >

      {/* 카드 영역 */}
      <div className="flex justify-center mt-30 gap-8">
        {[
          {
            icon: <Pencil size={52} className="mb-6 text-violet-500" />,
            title: 'Start from scratch',
            onClick: handleStartFromScratch,
          },
          {
            icon: <Sparkles size={52} className="mb-6 text-violet-500" />,
            title: 'Create with AI',
            onClick: handleCreateWithAI,
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.4 }}
          >
            <Card
              onClick={item.onClick}
              className="cursor-pointer bg-white w-[300px] h-[270px] border rounded-md hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <CardContent className="flex flex-col items-center justify-center text-center p-8 h-full">
                {item.icon}
                <h2 className="text-xl font-semibold mb-2 text-violet-600">
                  {item.title}
                </h2>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      {isModalOpen && <CreateProjectModal onClose={handleModalClose} onSuccess={handleModalSuccess} />}
    </motion.div>
  );
}

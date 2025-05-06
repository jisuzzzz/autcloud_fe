'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';
import DocsHeader from '@/components/custom/docsHeader';
import { Monitor, Cloud } from 'lucide-react';

export default function DocsPage() {
  return (
    <>
      <DocsHeader />

      {/* 첫 번째 섹션 */}
      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-[#F6F5FD] min-h-screen flex flex-col items-center justify-center text-center px-4 pb-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="inline-block bg-white text-[#7868E6] font-medium px-8 py-1 rounded-full shadow-sm">
            Introduce Cloud Platforms
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold leading-tight mb-6"
        >
          Design <span className="text-[#7868E6]">Cloud Infrastructure</span>
          <br />
          Visually with AI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-600 text-lg max-w-xl mb-10"
        >
          Simplify cloud design with AI-driven templates and drag-and-drop UI.
          From architecture to deployment, all in one platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex gap-4 flex-col sm:flex-row"
        >
          <Link href="/project">
            <Button className="bg-[#7868E6] text-white px-7 py-3 text-sm rounded-full shadow hover:bg-[#675ad1] transition-transform hover:scale-105">
              Start Designing
            </Button>
          </Link>
          <Button
            variant="outline"
            className="bg-white px-9 py-3 text-sm rounded-full shadow hover:bg-gray-100 transition-transform hover:scale-105"
          >
            How to Start
          </Button>
        </motion.div>
      </motion.section>

      {/* 두 번째 섹션 */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-[#FFFFFF] w-full py-28 px-6 flex flex-col items-center -mt-20 z-10 relative"
      >
        <div className="max-w-6xl w-full grid md:grid-cols-[380px_1fr] gap-7 justify-center">
          {/* 왼쪽 카드 */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="rounded-[20px] border border-[#E5E7EB] shadow-sm w-[380px] overflow-hidden"
          >
            <div className="flex items-center gap-2 bg-white px-5 py-5 border-b border-gray-200">
              <div className="w-[10px] h-[10px] rounded-full bg-gray-300" />
              <div className="w-[10px] h-[10px] rounded-full bg-gray-300" />
              <div className="w-[10px] h-[10px] rounded-full bg-gray-300" />
            </div>

            <div className="bg-gradient-to-b from-[#F6F3FF] to-[#ECE7FF] mx-3 my-3 px-10 py-15 text-center rounded-b-[20px]">
              <div className="flex justify-center items-center gap-5 mb-8">
                <div className="bg-white p-[14px] rounded-[12px] shadow-md">
                  <Monitor className="w-6 h-6 text-black" />
                </div>
                <div className="text-lg font-semibold text-gray-500">↔</div>
                <div className="bg-[#7868E6] p-[14px] rounded-[12px] shadow-md">
                  <Cloud className="w-6 h-6 text-white" />
                </div>
              </div>

              <h2 className="text-[20px] font-bold text-[#1F1F1F] mb-2">
                Welcome to Autcloud
              </h2>
              <p className="text-[14px] text-gray-500 leading-relaxed mb-6">
                With Autcloud, you can connect to <br /> your cloud computer
              </p>

              <button className="bg-white border rounded-full px-6 py-[9px] text-sm font-semibold shadow-sm hover:bg-gray-100 transition">
                Connect
              </button>
            </div>
          </motion.div>

          {/* 오른쪽 카드 */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="rounded-[20px] border border-[#E5E7EB] shadow-sm w-[700px] overflow-hidden"
          >
            <div className="flex items-center gap-2 bg-white px-5 py-5 border-b border-gray-200">
              <div className="w-[10px] h-[10px] rounded-full bg-gray-300" />
              <div className="w-[10px] h-[10px] rounded-full bg-gray-300" />
              <div className="w-[10px] h-[10px] rounded-full bg-gray-300" />
            </div>

            <div className="px-8 py-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[22px] font-bold text-[#7868E6]">
                  AutCloud
                </h3>
                <input
                  type="text"
                  placeholder="Search by resource name or public IP.."
                  className="border border-gray-300 text-sm px-4 py-2 rounded-md w-[260px] placeholder:text-gray-400"
                />
              </div>

              <hr className="mb-5" />

              <p className="text-[15px] font-semibold mb-5 text-black">
                Which Performance would You like to use this time?
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* 카드 3개 */}
                {[
                  {
                    title: 'Small package',
                    color: '#7195E3',
                    specs: ['4 Cores', '16 GB', '16 GB'],
                    dots: 1,
                  },
                  {
                    title: 'Medium package',
                    color: '#7868E6',
                    specs: ['16 Cores', '16 GB', '64 GB'],
                    dots: 2,
                  },
                  {
                    title: 'Large package',
                    color: '#151032',
                    specs: ['48 Cores', '4x16 GB', '192 GB'],
                    dots: 3,
                  },
                ].map((pkg, i) => (
                  <div
                    key={i}
                    className={`bg-[${pkg.color}] text-white rounded-[16px] px-5 py-6`}
                  >
                    <div className="bg-[rgba(217,217,217,0.3)] w-9 h-9 rounded-md mb-4 flex items-center justify-center gap-0.5">
                      {Array(pkg.dots)
                        .fill(0)
                        .map((_, j) => (
                          <div
                            key={j}
                            className="w-2 h-2 bg-white rounded-full"
                          />
                        ))}
                    </div>
                    <p className="text-[15px] font-medium mb-4">{pkg.title}</p>
                    <p className="text-[14px] mb-1 text-white/90">
                      <span className="font-light">Processor:</span>
                      <span className="float-right font-medium">
                        {pkg.specs[0]}
                      </span>
                    </p>
                    <p className="text-[14px] mb-1 text-white/90">
                      <span className="font-light">GPU:</span>
                      <span className="float-right font-medium">
                        {pkg.specs[1]}
                      </span>
                    </p>
                    <p className="text-[14px] text-white/90">
                      <span className="font-light">RAM:</span>
                      <span className="float-right font-medium">
                        {pkg.specs[2]}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}

// 'use client';

// import { useState } from 'react';
// import { Card, CardContent, CardTitle } from '@/components/ui/card';
// import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import {
//   CalendarDays,
//   Download,
//   TrendingUp,
//   DollarSign,
//   BarChart2,
//   Activity,
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// // import {
// //   Popover,
// //   PopoverContent,
// //   PopoverTrigger,
// // } from '@/components/ui/popover';
// // import { Calendar } from '@/components/ui/calendar';
// import CostHeader from '@/components/custom/costHeader';
// import SideBar from '@/components/custom/sidebar';
// import { format } from 'date-fns';
// import { motion } from 'framer-motion';

// export default function CostDashboardPage() {
//   const [date, setDate] = useState<Date | undefined>(new Date());

//   return (
//     <div className="flex min-h-screen">
//       <SideBar />
//       <div className="flex-1">
//         {/* <CostHeader /> */}
//         <div className="p-6 space-y-6">
//           {/* Header + Date Range + Download */}
//           <motion.div
//             className="flex items-center justify-between"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4 }}
//           >
//             <h2 className="text-2xl font-bold">Cost Dashboard</h2>
//             <div className="flex items-center gap-2">
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant="outline"
//                     className="flex items-center gap-2 text-sm font-normal"
//                   >
//                     <CalendarDays className="w-4 h-4" />
//                     {date ? format(date, 'LLL dd, y') : 'Pick a date'}
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0" align="end">
//                   <Calendar
//                     mode="single"
//                     selected={date}
//                     onSelect={setDate}
//                     initialFocus
//                   />
//                 </PopoverContent>
//               </Popover>
//               <Button className="text-sm font-medium">Download</Button>
//             </div>
//           </motion.div>

//           {/* Tabs */}
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.3 }}
//           >
//             <Tabs defaultValue="overview">
//               <TabsList>
//                 <TabsTrigger value="overview">Overview</TabsTrigger>
//                 <TabsTrigger value="analytics">Analytics</TabsTrigger>
//                 <TabsTrigger value="reports">Reports</TabsTrigger>
//                 <TabsTrigger value="notifications">Notifications</TabsTrigger>
//               </TabsList>
//             </Tabs>
//           </motion.div>

//           {/* Summary Cards */}
//           <motion.div
//             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
//             initial="hidden"
//             animate="show"
//             variants={{
//               hidden: {},
//               show: {
//                 transition: {
//                   staggerChildren: 0.1,
//                 },
//               },
//             }}
//           >
//             {[
//               {
//                 title: 'Forecasted costs (Jan 2025)',
//                 value: '$45,231.89',
//                 desc: '+20.1% from last month',
//                 icon: <TrendingUp className="w-5 h-5 text-[#8474FF]" />,
//               },
//               {
//                 title: 'Avg Daily Cost',
//                 value: '$1,235.00',
//                 desc: '+12.8% from last week',
//                 icon: <DollarSign className="w-5 h-5 text-[#8474FF]" />,
//               },
//               {
//                 title: 'Total Cost',
//                 value: '$98,734.00',
//                 desc: 'Updated 2 days ago',
//                 icon: <BarChart2 className="w-5 h-5 text-[#8474FF]" />,
//               },
//               {
//                 title: 'Active Services',
//                 value: '15',
//                 desc: 'Across 4 cloud providers',
//                 icon: <Activity className="w-5 h-5 text-[#8474FF]" />,
//               },
//             ].map((card, idx) => (
//               <motion.div
//                 key={idx}
//                 variants={{
//                   hidden: { opacity: 0, y: 10 },
//                   show: { opacity: 1, y: 0 },
//                 }}
//               >
//                 <Card className="hover:shadow-md transition-shadow duration-200">
//                   <CardContent className="p-4">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm text-gray-500">{card.title}</p>
//                       {card.icon}
//                     </div>
//                     <CardTitle className="text-2xl mt-2">
//                       {card.value}
//                     </CardTitle>
//                     <p className="text-xs text-gray-500">{card.desc}</p>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </motion.div>

//           {/* Chart */}
//           <motion.div
//             className="grid grid-cols-1 lg:grid-cols-2 gap-4"
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4, delay: 0.1 }}
//           >
//             <Card>
//               <CardContent className="p-4 h-64">
//                 <h3 className="text-sm font-medium text-gray-700 mb-2">
//                   All Resources
//                 </h3>
//                 <div className="h-full flex items-center justify-center text-gray-400">
//                   (예: Bar Chart Placeholder)
//                 </div>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardContent className="p-4 h-64">
//                 <h3 className="text-sm font-medium text-gray-700 mb-2">
//                   Cost Breakdown
//                 </h3>
//                 <div className="h-full flex items-center justify-center text-gray-400">
//                   (예: Pie Chart Placeholder)
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }


export default function CostDashboardPage() {
  return (
    <div></div>
  )
}
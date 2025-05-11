
// 데이터베이스 스펙 정의
export interface DBSpec {
  vcpu_count: number | null
  ram: number | null
  disk: number
}

// 데이터베이스 플랜 정의
export interface DBPlan {
  id: string
  supported_engines: string[]
  locations: string[]
  spec: DBSpec
  monthly_cost: number
  numbers_of_node: number
}

// 데이터베이스 플랜 배열 (첫 번째 배치)
export const DatabasePlans: DBPlan[] = [
  {
    id: 'vultr-dbaas-hobbyist-cc-1-25-1',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'EWR', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SGP'],
    spec: { vcpu_count: 1, ram: 1024, disk: 25 },
    monthly_cost: 15,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-startup-cc-1-55-2',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 1, ram: 2048, disk: 55 },
    monthly_cost: 30,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-cc-1-55-2',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 1, ram: 2048, disk: 55 },
    monthly_cost: 50,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-cc-1-55-2',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 1, ram: 2048, disk: 55 },
    monthly_cost: 70,
    numbers_of_node: 3
  },
  {
    id: 'vultr-dbaas-startup-cc-2-80-4',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 2, ram: 4096, disk: 80 },
    monthly_cost: 60,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-cc-2-80-4',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 2, ram: 4096, disk: 80 },
    monthly_cost: 100,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-cc-2-80-4',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 2, ram: 4096, disk: 80 },
    monthly_cost: 140,
    numbers_of_node: 3
  },
  {
    id: 'vultr-dbaas-startup-cc-4-160-8',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 4, ram: 8192, disk: 160 },
    monthly_cost: 120,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-cc-4-160-8',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 4, ram: 8192, disk: 160 },
    monthly_cost: 200,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-cc-4-160-8',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 4, ram: 8192, disk: 160 },
    monthly_cost: 280,
    numbers_of_node: 3
  },
  {
    id: 'vultr-dbaas-startup-cc-4-320-16',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 6, ram: 16384, disk: 320 },
    monthly_cost: 240,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-cc-4-320-16',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 6, ram: 16384, disk: 320 },
    monthly_cost: 400,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-cc-4-320-16',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 6, ram: 16384, disk: 320 },
    monthly_cost: 560,
    numbers_of_node: 3
  },
  {
    id: 'vultr-dbaas-startup-cc-8-640-32',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 8, ram: 32768, disk: 640 },
    monthly_cost: 480,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-cc-8-640-32',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 8, ram: 32768, disk: 640 },
    monthly_cost: 800,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-cc-8-640-32',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 8, ram: 32768, disk: 640 },
    monthly_cost: 1120,
    numbers_of_node: 3
  },
  {
    id: 'vultr-dbaas-startup-cc-16-1280-64',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 16, ram: 65536, disk: 1280 },
    monthly_cost: 960,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-cc-16-1280-64',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 16, ram: 65536, disk: 1280 },
    monthly_cost: 1600,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-cc-16-1280-64',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 16, ram: 65536, disk: 1280 },
    monthly_cost: 2240,
    numbers_of_node: 3
  },
  {
    id: 'vultr-dbaas-startup-cc-24-1600-96',
    supported_engines: ['mysql', 'pg'],
    locations: ['ICN', 'MEL', 'SCL'],
    spec: { vcpu_count: 24, ram: 98304, disk: 1600 },
    monthly_cost: 1920,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-cc-24-1600-96',
    supported_engines: ['mysql', 'pg'],
    locations: ['ICN', 'MEL', 'SCL'],
    spec: { vcpu_count: 24, ram: 98304, disk: 1600 },
    monthly_cost: 3200,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-cc-24-1600-96',
    supported_engines: ['mysql', 'pg'],
    locations: ['ICN', 'MEL', 'SCL'],
    spec: { vcpu_count: 24, ram: 98304, disk: 1600 },
    monthly_cost: 4480,
    numbers_of_node: 3
  },
  {
    id: 'vultr-dbaas-hobbyist-cc-hp-amd-1-32-1',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 1, ram: 1024, disk: 32 },
    monthly_cost: 18,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-startup-cc-hp-amd-1-64-2',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 1, ram: 2048, disk: 64 },
    monthly_cost: 36,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-cc-hp-amd-1-64-2',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 1, ram: 2048, disk: 64 },
    monthly_cost: 60,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-cc-hp-amd-1-64-2',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 1, ram: 2048, disk: 64 },
    monthly_cost: 84,
    numbers_of_node: 3
  },
  {
    id: 'vultr-dbaas-startup-cc-hp-amd-2-80-2',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 2, ram: 2048, disk: 80 },
    monthly_cost: 54,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-cc-hp-amd-2-80-2',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 2, ram: 2048, disk: 80 },
    monthly_cost: 90,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-cc-hp-amd-2-80-2',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 2, ram: 2048, disk: 80 },
    monthly_cost: 126,
    numbers_of_node: 3
  },
  {
    id: 'vultr-dbaas-startup-cc-hp-amd-2-128-4',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 2, ram: 4096, disk: 128 },
    monthly_cost: 72,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-cc-hp-amd-2-128-4',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 2, ram: 4096, disk: 128 },
    monthly_cost: 120,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-cc-hp-amd-2-128-4',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 2, ram: 4096, disk: 128 },
    monthly_cost: 168,
    numbers_of_node: 3
  },
  {
    id: 'vultr-dbaas-startup-cc-hp-amd-3-256-8',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 3, ram: 8192, disk: 256 },
    monthly_cost: 144,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-cc-hp-amd-3-256-8',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 3, ram: 8192, disk: 256 },
    monthly_cost: 240,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-cc-hp-amd-3-256-8',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 3, ram: 8192, disk: 256 },
    monthly_cost: 336,
    numbers_of_node: 3
  },
  {
    id: 'vultr-dbaas-startup-cc-hp-amd-4-384-16',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 4, ram: 16384, disk: 384 },
    monthly_cost: 288,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-cc-hp-amd-4-384-16',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 4, ram: 16384, disk: 384 },
    monthly_cost: 480,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-cc-hp-amd-4-384-16',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 4, ram: 16384, disk: 384 },
    monthly_cost: 672,
    numbers_of_node: 3
  },
  {
    id: 'vultr-dbaas-startup-cc-hp-amd-6-448-24',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 6, ram: 24576, disk: 448 },
    monthly_cost: 432,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-cc-hp-amd-6-448-24',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 6, ram: 24576, disk: 448 },
    monthly_cost: 720,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-cc-hp-amd-6-448-24',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 6, ram: 24576, disk: 448 },
    monthly_cost: 1008,
    numbers_of_node: 3
  },
  {
    id: 'vultr-dbaas-startup-cc-hp-amd-8-512-32',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 8, ram: 32768, disk: 512 },
    monthly_cost: 576,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-cc-hp-amd-8-512-32',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 8, ram: 32768, disk: 512 },
    monthly_cost: 960,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-cc-hp-amd-8-512-32',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 8, ram: 32768, disk: 512 },
    monthly_cost: 1322,
    numbers_of_node: 3
  },
  {
    id: 'vultr-dbaas-startup-cc-hp-amd-12-768-48',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 12, ram: 49152, disk: 768 },
    monthly_cost: 768,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-cc-hp-amd-12-768-48',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 12, ram: 49152, disk: 768 },
    monthly_cost: 1280,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-cc-hp-amd-12-768-48',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 12, ram: 49152, disk: 768 },
    monthly_cost: 1792,
    numbers_of_node: 3
  },
  {
    id: 'vultr-dbaas-hobbyist-cc-hp-intel-1-32-1',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 1, ram: 1024, disk: 32 },
    monthly_cost: 18,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-startup-cc-hp-intel-1-64-2',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 1, ram: 2048, disk: 64 },
    monthly_cost: 36,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-cc-hp-intel-1-64-2',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 1, ram: 2048, disk: 64 },
    monthly_cost: 60,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-cc-hp-intel-1-64-2',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 1, ram: 2048, disk: 64 },
    monthly_cost: 84,
    numbers_of_node: 3
  },
  {
    id: 'vultr-dbaas-startup-cc-hp-intel-2-80-2',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 2, ram: 2048, disk: 80 },
    monthly_cost: 54,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-cc-hp-intel-2-80-2',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 2, ram: 2048, disk: 80 },
    monthly_cost: 90,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-cc-hp-intel-2-80-2',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 2, ram: 2048, disk: 80 },
    monthly_cost: 126,
    numbers_of_node: 3
  },
  {
    id: 'vultr-dbaas-startup-cc-hp-intel-2-128-4',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 2, ram: 4096, disk: 128 },
    monthly_cost: 72,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-cc-hp-intel-2-128-4',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 2, ram: 4096, disk: 128 },
    monthly_cost: 120,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-cc-hp-intel-2-128-4',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 2, ram: 4096, disk: 128 },
    monthly_cost: 168,
    numbers_of_node: 3
  },
  {
    id: 'vultr-dbaas-startup-cc-hp-intel-3-256-8',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 3, ram: 8192, disk: 256 },
    monthly_cost: 144,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-cc-hp-intel-3-256-8',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 3, ram: 8192, disk: 256 },
    monthly_cost: 240,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-cc-hp-intel-3-256-8',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 3, ram: 8192, disk: 256 },
    monthly_cost: 336,
    numbers_of_node: 3
  },
  {
    id: 'vultr-dbaas-startup-cc-hp-intel-4-384-16',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 4, ram: 16384, disk: 384 },
    monthly_cost: 288,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-cc-hp-intel-4-384-16',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 4, ram: 16384, disk: 384 },
    monthly_cost: 480,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-cc-hp-intel-4-384-16',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 4, ram: 16384, disk: 384 },
    monthly_cost: 672,
    numbers_of_node: 3
  },
  {
    id: 'vultr-dbaas-startup-cc-hp-intel-6-448-24',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 6, ram: 24576, disk: 448 },
    monthly_cost: 432,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-cc-hp-intel-6-448-24',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 6, ram: 24576, disk: 448 },
    monthly_cost: 720,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-cc-hp-intel-6-448-24',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 6, ram: 24576, disk: 448 },
    monthly_cost: 1008,
    numbers_of_node: 3
  },
  {
    id: 'vultr-dbaas-startup-cc-hp-intel-8-512-32',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 8, ram: 32768, disk: 512 },
    monthly_cost: 576,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-cc-hp-intel-8-512-32',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 8, ram: 32768, disk: 512 },
    monthly_cost: 960,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-cc-hp-intel-8-512-32',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 8, ram: 32768, disk: 512 },
    monthly_cost: 1344,
    numbers_of_node: 3
  },
  {
    id: 'vultr-dbaas-startup-cc-hp-intel-12-768-48',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 12, ram: 49152, disk: 768 },
    monthly_cost: 768,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-cc-hp-intel-12-768-48',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 12, ram: 49152, disk: 768 },
    monthly_cost: 1280,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-cc-hp-intel-12-768-48',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 12, ram: 49152, disk: 768 },
    monthly_cost: 1792,
    numbers_of_node: 3
  },
  {
    id: 'vultr-dbaas-startup-occ-gp-1-30-4',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 1, ram: 4096, disk: 30 },
    monthly_cost: 90,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-occ-gp-1-30-4',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 1, ram: 4096, disk: 30 },
    monthly_cost: 150,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-occ-gp-1-30-4',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 1, ram: 4096, disk: 30 },
    monthly_cost: 210,
    numbers_of_node: 3
  },
  {
    id: 'vultr-dbaas-startup-occ-gp-2-50-8',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 2, ram: 8192, disk: 50 },
    monthly_cost: 180,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-occ-gp-2-50-8',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 2, ram: 8192, disk: 50 },
    monthly_cost: 300,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-occ-gp-2-50-8',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 2, ram: 8192, disk: 50 },
    monthly_cost: 420,
    numbers_of_node: 3
  },
  {
    id: 'vultr-dbaas-startup-occ-gp-4-80-16',
    supported_engines: ['mysql', 'pg'],
    locations: ['ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 4, ram: 16384, disk: 80 },
    monthly_cost: 360,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-occ-gp-4-80-16',
    supported_engines: ['mysql', 'pg'],
    locations: ['ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 4, ram: 16384, disk: 80 },
    monthly_cost: 600,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-occ-gp-4-80-16',
    supported_engines: ['mysql', 'pg'],
    locations: ['ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 4, ram: 16384, disk: 80 },
    monthly_cost: 840,
    numbers_of_node: 3
  },
  {
    id: 'vultr-dbaas-startup-occ-gp-8-160-32',
    supported_engines: ['mysql', 'pg'],
    locations: ['ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 8, ram: 32768, disk: 160 },
    monthly_cost: 720,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-occ-gp-8-160-32',
    supported_engines: ['mysql', 'pg'],
    locations: ['ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 8, ram: 32768, disk: 160 },
    monthly_cost: 1200,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-occ-gp-8-160-32',
    supported_engines: ['mysql', 'pg'],
    locations: ['ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 8, ram: 32768, disk: 160 },
    monthly_cost: 1680,
    numbers_of_node: 3
  },
  {
    id: 'vultr-dbaas-startup-occ-gp-16-320-64',
    supported_engines: ['mysql', 'pg'],
    locations: ['ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 16, ram: 65536, disk: 320 },
    monthly_cost: 1440,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-occ-gp-16-320-64',
    supported_engines: ['mysql', 'pg'],
    locations: ['ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 16, ram: 65536, disk: 320 },
    monthly_cost: 2400,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-occ-gp-16-320-64',
    supported_engines: ['mysql', 'pg'],
    locations: ['ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 16, ram: 65536, disk: 320 },
    monthly_cost: 3360,
    numbers_of_node: 3
  },
  {
    id: 'vultr-dbaas-startup-occ-gp-24-480-96',
    supported_engines: ['mysql', 'pg'],
    locations: ['ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 24, ram: 98304, disk: 480 },
    monthly_cost: 2160,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-occ-gp-24-480-96',
    supported_engines: ['mysql', 'pg'],
    locations: ['ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 24, ram: 98304, disk: 480 },
    monthly_cost: 3600,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-occ-gp-24-480-96',
    supported_engines: ['mysql', 'pg'],
    locations: ['ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 24, ram: 98304, disk: 480 },
    monthly_cost: 5040,
    numbers_of_node: 3
  },
  {
    id: 'vultr-dbaas-startup-occ-gp-32-640-128',
    supported_engines: ['mysql', 'pg'],
    locations: ['ICN', 'JNB', 'LHR', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 32, ram: 131072, disk: 640 },
    monthly_cost: 2880,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-occ-gp-32-640-128',
    supported_engines: ['mysql', 'pg'],
    locations: ['ICN', 'JNB', 'LHR', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 32, ram: 131072, disk: 640 },
    monthly_cost: 4800,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-occ-gp-32-640-128',
    supported_engines: ['mysql', 'pg'],
    locations: ['ICN', 'JNB', 'LHR', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 32, ram: 131072, disk: 640 },
    monthly_cost: 6720,
    numbers_of_node: 3
  },
  {
    id: 'vultr-dbaas-startup-occ-gp-40-768-160',
    supported_engines: ['mysql', 'pg'],
    locations: ['ICN', 'JNB', 'LHR', 'SGP', 'SJC'],
    spec: { vcpu_count: 40, ram: 163840, disk: 768 },
    monthly_cost: 3600,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-occ-gp-40-768-160',
    supported_engines: ['mysql', 'pg'],
    locations: ['ICN', 'JNB', 'LHR', 'SGP', 'SJC'],
    spec: { vcpu_count: 40, ram: 163840, disk: 768 },
    monthly_cost: 6000,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-occ-gp-40-768-160',
    supported_engines: ['mysql', 'pg'],
    locations: ['ICN', 'JNB', 'LHR', 'SGP', 'SJC'],
    spec: { vcpu_count: 40, ram: 163840, disk: 768 },
    monthly_cost: 8400,
    numbers_of_node: 3
  },
  {
    id: 'vultr-dbaas-startup-occ-gp-64-960-192',
    supported_engines: ['mysql', 'pg'],
    locations: ['LHR', 'SGP'],
    spec: { vcpu_count: 64, ram: 196608, disk: 960 },
    monthly_cost: 5760,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-occ-gp-64-960-192',
    supported_engines: ['mysql', 'pg'],
    locations: ['LHR', 'SGP'],
    spec: { vcpu_count: 64, ram: 196608, disk: 960 },
    monthly_cost: 9600,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-occ-gp-64-960-192',
    supported_engines: ['mysql', 'pg'],
    locations: ['LHR', 'SGP'],
    spec: { vcpu_count: 64, ram: 196608, disk: 960 },
    monthly_cost: 13440,
    numbers_of_node: 3
  },
  {
    id: 'vultr-dbaas-startup-occ-gp-96-1280-256',
    supported_engines: ['mysql', 'pg'],
    locations: ['LHR', 'SGP'],
    spec: { vcpu_count: 96, ram: 262144, disk: 1280 },
    monthly_cost: 11520,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-occ-gp-96-1280-256',
    supported_engines: ['mysql', 'pg'],
    locations: ['LHR', 'SGP'],
    spec: { vcpu_count: 96, ram: 262144, disk: 1280 },
    monthly_cost: 19200,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-occ-gp-96-1280-256',
    supported_engines: ['mysql', 'pg'],
    locations: ['LHR', 'SGP'],
    spec: { vcpu_count: 96, ram: 262144, disk: 1280 },
    monthly_cost: 26880,
    numbers_of_node: 3
  },
  {
    id: 'vultr-dbaas-startup-occ-so-1-150-8',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 1, ram: 8192, disk: 150 },
    monthly_cost: 225,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-occ-so-1-150-8',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 1, ram: 8192, disk: 150 },
    monthly_cost: 375,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-occ-so-1-150-8',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 1, ram: 8192, disk: 150 },
    monthly_cost: 525,
    numbers_of_node: 3
  },
  {
    id: 'vultr-dbaas-startup-occ-so-2-320-16',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 2, ram: 16384, disk: 320 },
    monthly_cost: 375,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-occ-so-2-320-16',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 2, ram: 16384, disk: 320 },
    monthly_cost: 625,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-occ-so-2-320-16',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 2, ram: 16384, disk: 320 },
    monthly_cost: 875,
    numbers_of_node: 3
  },
  {
    id: 'vultr-dbaas-startup-occ-so-2-480-16',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 2, ram: 16384, disk: 480 },
    monthly_cost: 465,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-occ-so-2-480-16',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 2, ram: 16384, disk: 480 },
    monthly_cost: 775,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-occ-so-2-480-16',
    supported_engines: ['mysql', 'pg'],
    locations: ['AMS', 'ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 2, ram: 16384, disk: 480 },
    monthly_cost: 1085,
    numbers_of_node: 3
  },
  {
    id: 'vultr-dbaas-startup-occ-so-4-640-32',
    supported_engines: ['mysql', 'pg'],
    locations: ['ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 4, ram: 32768, disk: 640 },
    monthly_cost: 750,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-occ-so-4-640-32',
    supported_engines: ['mysql', 'pg'],
    locations: ['ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 4, ram: 32768, disk: 640 },
    monthly_cost: 1250,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-occ-so-4-640-32',
    supported_engines: ['mysql', 'pg'],
    locations: ['ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 4, ram: 32768, disk: 640 },
    monthly_cost: 1750,
    numbers_of_node: 3
  },
  {
    id: 'vultr-dbaas-startup-occ-so-4-960-32',
    supported_engines: ['mysql', 'pg'],
    locations: ['ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 4, ram: 32768, disk: 960 },
    monthly_cost: 930,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-occ-so-4-960-32',
    supported_engines: ['mysql', 'pg'],
    locations: ['ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 4, ram: 32768, disk: 960 },
    monthly_cost: 1550,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-occ-so-4-960-32',
    supported_engines: ['mysql', 'pg'],
    locations: ['ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 4, ram: 32768, disk: 960 },
    monthly_cost: 2170,
    numbers_of_node: 3
  },
  {
    id: 'vultr-dbaas-startup-occ-so-8-1280-64',
    supported_engines: ['mysql', 'pg'],
    locations: ['ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 8, ram: 65536, disk: 1280 },
    monthly_cost: 1500,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-occ-so-8-1280-64',
    supported_engines: ['mysql', 'pg'],
    locations: ['ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 8, ram: 65536, disk: 1280 },
    monthly_cost: 2500,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-occ-so-8-1280-64',
    supported_engines: ['mysql', 'pg'],
    locations: ['ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 8, ram: 65536, disk: 1280 },
    monthly_cost: 3500,
    numbers_of_node: 3
  },
  {
    id: 'vultr-dbaas-startup-occ-so-8-1920-64',
    supported_engines: ['mysql', 'pg'],
    locations: ['ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 8, ram: 65536, disk: 1920 },
    monthly_cost: 1860,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-occ-so-8-1920-64',
    supported_engines: ['mysql', 'pg'],
    locations: ['ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 8, ram: 65536, disk: 1920 },
    monthly_cost: 3100,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-occ-so-8-1920-64',
    supported_engines: ['mysql', 'pg'],
    locations: ['ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 8, ram: 65536, disk: 1920 },
    monthly_cost: 4340,
    numbers_of_node: 3
  },
  {
    id: 'vultr-dbaas-startup-occ-so-16-2560-128',
    supported_engines: ['mysql', 'pg'],
    locations: ['ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 16, ram: 131072, disk: 2560 },
    monthly_cost: 3000,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-occ-so-16-2560-128',
    supported_engines: ['mysql', 'pg'],
    locations: ['ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 16, ram: 131072, disk: 2560 },
    monthly_cost: 5000,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-occ-so-16-2560-128',
    supported_engines: ['mysql', 'pg'],
    locations: ['ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 16, ram: 131072, disk: 2560 },
    monthly_cost: 7000,
    numbers_of_node: 3
  },
  {
    id: 'vultr-dbaas-startup-occ-so-16-3840-128',
    supported_engines: ['mysql', 'pg'],
    locations: ['ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 16, ram: 131072, disk: 3840 },
    monthly_cost: 3720,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-occ-so-16-3840-128',
    supported_engines: ['mysql', 'pg'],
    locations: ['ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 16, ram: 131072, disk: 3840 },
    monthly_cost: 6200,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-occ-so-16-3840-128',
    supported_engines: ['mysql', 'pg'],
    locations: ['ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 16, ram: 131072, disk: 3840 },
    monthly_cost: 8680,
    numbers_of_node: 3
  },
  {
    id: 'vultr-dbaas-startup-occ-so-24-3840-192',
    supported_engines: ['mysql', 'pg'],
    locations: ['ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 24, ram: 196608, disk: 3840 },
    monthly_cost: 4500,
    numbers_of_node: 1
  },
  {
    id: 'vultr-dbaas-business-occ-so-24-3840-192',
    supported_engines: ['mysql', 'pg'],
    locations: ['ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 24, ram: 196608, disk: 3840 },
    monthly_cost: 7500,
    numbers_of_node: 2
  },
  {
    id: 'vultr-dbaas-premium-occ-so-24-3840-192',
    supported_engines: ['mysql', 'pg'],
    locations: ['ICN', 'JNB', 'LHR', 'MEL', 'SAO', 'SCL', 'SGP', 'SJC'],
    spec: { vcpu_count: 24, ram: 196608, disk: 3840 },
    monthly_cost: 10500,
    numbers_of_node: 3
  }
]
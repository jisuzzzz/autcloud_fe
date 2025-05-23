export interface ComputeAttribute {
  plan: string
  regions: string[]
  vcpu_count: number
  ram: number
  disk: number
  bandwidth: number
  monthly_cost: number
  disk_type: string
}

export const ComputeOptions: ComputeAttribute[] = [
  {
    plan: 'vc2-1c-0.5gb-free',
    regions: ['sea'],
    vcpu_count: 1,
    ram: 512,
    disk: 10,
    bandwidth: 0,
    monthly_cost: 0,
    disk_type: 'SSD'
  },
  {
    plan: 'vc2-1c-0.5gb-v6',
    regions: ['ewr'],
    vcpu_count: 1,
    ram: 512,
    disk: 10,
    bandwidth: 512,
    monthly_cost: 2.5,
    disk_type: 'SSD'
  },
  {
    plan: 'vc2-1c-0.5gb',
    regions: ['ewr'],
    vcpu_count: 1,
    ram: 512,
    disk: 10,
    bandwidth: 512,
    monthly_cost: 3.5,
    disk_type: 'SSD'
  },
  {
    plan: 'vc2-1c-1gb',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 1,
    ram: 1024,
    disk: 25,
    bandwidth: 1024,
    monthly_cost: 5,
    disk_type: 'SSD'
  },
  {
    plan: 'vc2-1c-1gb-sc1',
    regions: ['sao'],
    vcpu_count: 1,
    ram: 1024,
    disk: 25,
    bandwidth: 1024,
    monthly_cost: 7.5,
    disk_type: 'SSD'
  },
  {
    plan: 'vc2-1c-2gb',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 1,
    ram: 2048,
    disk: 55,
    bandwidth: 2048,
    monthly_cost: 10,
    disk_type: 'SSD'
  },
  {
    plan: 'vc2-1c-2gb-sc1',
    regions: ['sao'],
    vcpu_count: 1,
    ram: 2048,
    disk: 55,
    bandwidth: 2048,
    monthly_cost: 15,
    disk_type: 'SSD'
  },
  {
    plan: 'vc2-2c-2gb',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 2,
    ram: 2048,
    disk: 65,
    bandwidth: 3072,
    monthly_cost: 15,
    disk_type: 'SSD'
  },
  {
    plan: 'vc2-2c-2gb-sc1',
    regions: ['sao'],
    vcpu_count: 2,
    ram: 2048,
    disk: 65,
    bandwidth: 3072,
    monthly_cost: 22.5,
    disk_type: 'SSD'
  },
  {
    plan: 'vc2-2c-4gb',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 2,
    ram: 4096,
    disk: 80,
    bandwidth: 3072,
    monthly_cost: 20,
    disk_type: 'SSD'
  },
  {
    plan: 'vc2-2c-4gb-sc1',
    regions: ['sao'],
    vcpu_count: 2,
    ram: 4096,
    disk: 80,
    bandwidth: 3072,
    monthly_cost: 30,
    disk_type: 'SSD'
  },
  {
    plan: 'vc2-4c-8gb',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 4,
    ram: 8192,
    disk: 160,
    bandwidth: 4096,
    monthly_cost: 40,
    disk_type: 'SSD'
  },
  {
    plan: 'vc2-4c-8gb-sc1',
    regions: ['sao'],
    vcpu_count: 4,
    ram: 8192,
    disk: 160,
    bandwidth: 4096,
    monthly_cost: 60,
    disk_type: 'SSD'
  },
  {
    plan: 'vc2-6c-16gb',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 6,
    ram: 16384,
    disk: 320,
    bandwidth: 5120,
    monthly_cost: 80,
    disk_type: 'SSD'
  },
  {
    plan: 'vc2-6c-16gb-sc1',
    regions: ['sao'],
    vcpu_count: 6,
    ram: 16384,
    disk: 320,
    bandwidth: 5120,
    monthly_cost: 120,
    disk_type: 'SSD'
  },
  {
    plan: 'vc2-8c-32gb',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 8,
    ram: 32768,
    disk: 640,
    bandwidth: 6144,
    monthly_cost: 160,
    disk_type: 'SSD'
  },
  {
    plan: 'vc2-8c-32gb-sc1',
    regions: ['sao'],
    vcpu_count: 8,
    ram: 32768,
    disk: 640,
    bandwidth: 6144,
    monthly_cost: 240,
    disk_type: 'SSD'
  },
  {
    plan: 'vc2-16c-64gb',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 16,
    ram: 65536,
    disk: 1280,
    bandwidth: 10240,
    monthly_cost: 320,
    disk_type: 'SSD'
  },
  {
    plan: 'vc2-16c-64gb-sc1',
    regions: ['sao'],
    vcpu_count: 16,
    ram: 65536,
    disk: 1280,
    bandwidth: 10240,
    monthly_cost: 480,
    disk_type: 'SSD'
  },
  {
    plan: 'vc2-24c-96gb',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 24,
    ram: 98304,
    disk: 1600,
    bandwidth: 15360,
    monthly_cost: 640,
    disk_type: 'SSD'
  },
  {
    plan: 'vc2-24c-96gb-sc1',
    regions: ['sao'],
    vcpu_count: 24,
    ram: 98304,
    disk: 1600,
    bandwidth: 15360,
    monthly_cost: 960,
    disk_type: 'SSD'
  },
  {
    plan: 'vhf-1c-1gb',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 1,
    ram: 1024,
    disk: 32,
    bandwidth: 1024,
    monthly_cost: 6,
    disk_type: 'HIGHFREQUENCY'
  },
  {
    plan: 'vhf-1c-1gb-sc1',
    regions: ['sao'],
    vcpu_count: 1,
    ram: 1024,
    disk: 32,
    bandwidth: 1024,
    monthly_cost: 9,
    disk_type: 'HIGHFREQUENCY'
  },
  {
    plan: 'vhf-1c-2gb',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 1,
    ram: 2048,
    disk: 64,
    bandwidth: 2048,
    monthly_cost: 12,
    disk_type: 'HIGHFREQUENCY'
  },
  {
    plan: 'vhf-1c-2gb-sc1',
    regions: ['sao'],
    vcpu_count: 1,
    ram: 2048,
    disk: 64,
    bandwidth: 2048,
    monthly_cost: 18,
    disk_type: 'HIGHFREQUENCY'
  },
  {
    plan: 'vhf-2c-2gb',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 2,
    ram: 2048,
    disk: 80,
    bandwidth: 3072,
    monthly_cost: 18,
    disk_type: 'HIGHFREQUENCY'
  },
  {
    plan: 'vhf-2c-2gb-sc1',
    regions: ['sao'],
    vcpu_count: 2,
    ram: 2048,
    disk: 80,
    bandwidth: 3072,
    monthly_cost: 27,
    disk_type: 'HIGHFREQUENCY'
  },
  {
    plan: 'vhf-2c-4gb',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 2,
    ram: 4096,
    disk: 128,
    bandwidth: 3072,
    monthly_cost: 24,
    disk_type: 'HIGHFREQUENCY'
  },
  {
    plan: 'vhf-2c-4gb-sc1',
    regions: ['sao'],
    vcpu_count: 2,
    ram: 4096,
    disk: 128,
    bandwidth: 3072,
    monthly_cost: 36,
    disk_type: 'HIGHFREQUENCY'
  },
  {
    plan: 'vhf-3c-8gb',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 3,
    ram: 8192,
    disk: 256,
    bandwidth: 4096,
    monthly_cost: 48,
    disk_type: 'HIGHFREQUENCY'
  },
  {
    plan: 'vhf-3c-8gb-sc1',
    regions: ['sao'],
    vcpu_count: 3,
    ram: 8192,
    disk: 256,
    bandwidth: 4096,
    monthly_cost: 72,
    disk_type: 'HIGHFREQUENCY'
  },
  {
    plan: 'vhf-4c-16gb',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 4,
    ram: 16384,
    disk: 384,
    bandwidth: 5120,
    monthly_cost: 96,
    disk_type: 'HIGHFREQUENCY'
  },
  {
    plan: 'vhf-4c-16gb-sc1',
    regions: ['sao'],
    vcpu_count: 4,
    ram: 16384,
    disk: 384,
    bandwidth: 5120,
    monthly_cost: 144,
    disk_type: 'HIGHFREQUENCY'
  },
  {
    plan: 'vhf-6c-24gb',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 6,
    ram: 24576,
    disk: 448,
    bandwidth: 6144,
    monthly_cost: 144,
    disk_type: 'HIGHFREQUENCY'
  },
  {
    plan: 'vhf-6c-24gb-sc1',
    regions: ['sao'],
    vcpu_count: 6,
    ram: 24576,
    disk: 448,
    bandwidth: 6144,
    monthly_cost: 216,
    disk_type: 'HIGHFREQUENCY'
  },
  {
    plan: 'vhf-8c-32gb',
    regions: ['ewr', 'lhr', 'sjc', 'icn', 'sgp', 'mel'],
    vcpu_count: 8,
    ram: 32768,
    disk: 512,
    bandwidth: 7168,
    monthly_cost: 192,
    disk_type: 'HIGHFREQUENCY'
  },
  {
    plan: 'vhf-8c-32gb-sc1',
    regions: ['sao'],
    vcpu_count: 8,
    ram: 32768,
    disk: 512,
    bandwidth: 7168,
    monthly_cost: 288,
    disk_type: 'HIGHFREQUENCY'
  },
  {
    plan: 'vhf-12c-48gb',
    regions: ['ewr', 'lhr', 'sjc', 'icn', 'sgp', 'mel'],
    vcpu_count: 12,
    ram: 49152,
    disk: 768,
    bandwidth: 8192,
    monthly_cost: 256,
    disk_type: 'HIGHFREQUENCY'
  },
  {
    plan: 'vhf-12c-48gb-sc1',
    regions: ['sao'],
    vcpu_count: 12,
    ram: 49152,
    disk: 768,
    bandwidth: 8192,
    monthly_cost: 384,
    disk_type: 'HIGHFREQUENCY'
  },
  {
    plan: 'vhf-16c-58gb',
    regions: ['ewr', 'lhr', 'sjc', 'icn', 'sgp', 'mel'],
    vcpu_count: 16,
    ram: 59392,
    disk: 1024,
    bandwidth: 9216,
    monthly_cost: 320,
    disk_type: 'HIGHFREQUENCY'
  },
  {
    plan: 'vhf-16c-58gb-sc1',
    regions: ['sao'],
    vcpu_count: 16,
    ram: 59392,
    disk: 1024,
    bandwidth: 9216,
    monthly_cost: 480,
    disk_type: 'HIGHFREQUENCY'
  },
  {
    plan: 'vhp-1c-1gb-amd',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 1,
    ram: 1024,
    disk: 25,
    bandwidth: 2048,
    monthly_cost: 6,
    disk_type: 'AMDHIGHPERF'
  },
  {
    plan: 'vhp-1c-1gb-amd-sc1',
    regions: ['sao'],
    vcpu_count: 1,
    ram: 1024,
    disk: 25,
    bandwidth: 2048,
    monthly_cost: 9,
    disk_type: 'AMDHIGHPERF'
  },
  {
    plan: 'vhp-1c-2gb-amd',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 1,
    ram: 2048,
    disk: 50,
    bandwidth: 3072,
    monthly_cost: 12,
    disk_type: 'AMDHIGHPERF'
  },
  {
    plan: 'vhp-1c-2gb-amd-sc1',
    regions: ['sao'],
    vcpu_count: 1,
    ram: 2048,
    disk: 50,
    bandwidth: 3072,
    monthly_cost: 18,
    disk_type: 'AMDHIGHPERF'
  },
  {
    plan: 'vhp-2c-2gb-amd',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 2,
    ram: 2048,
    disk: 60,
    bandwidth: 4096,
    monthly_cost: 18,
    disk_type: 'AMDHIGHPERF'
  },
  {
    plan: 'vhp-2c-2gb-amd-sc1',
    regions: ['sao'],
    vcpu_count: 2,
    ram: 2048,
    disk: 60,
    bandwidth: 4096,
    monthly_cost: 27,
    disk_type: 'AMDHIGHPERF'
  },
  {
    plan: 'vhp-2c-4gb-amd',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 2,
    ram: 4096,
    disk: 100,
    bandwidth: 5120,
    monthly_cost: 24,
    disk_type: 'AMDHIGHPERF'
  },
  {
    plan: 'vhp-2c-4gb-amd-sc1',
    regions: ['sao'],
    vcpu_count: 2,
    ram: 4096,
    disk: 100,
    bandwidth: 5120,
    monthly_cost: 36,
    disk_type: 'AMDHIGHPERF'
  },
  {
    plan: 'vhp-4c-8gb-amd',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 4,
    ram: 8192,
    disk: 180,
    bandwidth: 6144,
    monthly_cost: 48,
    disk_type: 'AMDHIGHPERF'
  },
  {
    plan: 'vhp-4c-8gb-amd-sc1',
    regions: ['sao'],
    vcpu_count: 4,
    ram: 8192,
    disk: 180,
    bandwidth: 6144,
    monthly_cost: 72,
    disk_type: 'AMDHIGHPERF'
  },
  {
    plan: 'vhp-4c-12gb-amd',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 4,
    ram: 12288,
    disk: 260,
    bandwidth: 7168,
    monthly_cost: 72,
    disk_type: 'AMDHIGHPERF'
  },
  {
    plan: 'vhp-4c-12gb-amd-sc1',
    regions: ['sao'],
    vcpu_count: 4,
    ram: 12288,
    disk: 260,
    bandwidth: 7168,
    monthly_cost: 108,
    disk_type: 'AMDHIGHPERF'
  },
  {
    plan: 'vhp-8c-16gb-amd',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 8,
    ram: 16384,
    disk: 350,
    bandwidth: 8192,
    monthly_cost: 96,
    disk_type: 'AMDHIGHPERF'
  },
  {
    plan: 'vhp-8c-16gb-amd-sc1',
    regions: ['sao'],
    vcpu_count: 8,
    ram: 16384,
    disk: 350,
    bandwidth: 8192,
    monthly_cost: 144,
    disk_type: 'AMDHIGHPERF'
  },
  {
    plan: 'vhp-12c-24gb-amd',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 12,
    ram: 24576,
    disk: 500,
    bandwidth: 12288,
    monthly_cost: 144,
    disk_type: 'AMDHIGHPERF'
  },
  {
    plan: 'vhp-12c-24gb-amd-sc1',
    regions: ['sao'],
    vcpu_count: 12,
    ram: 24576,
    disk: 500,
    bandwidth: 12288,
    monthly_cost: 216,
    disk_type: 'AMDHIGHPERF'
  },
  {
    plan: 'vhp-1c-1gb-intel',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 1,
    ram: 1024,
    disk: 25,
    bandwidth: 2048,
    monthly_cost: 6,
    disk_type: 'INTELHIGHPERF'
  },
  {
    plan: 'vhp-1c-1gb-intel-sc1',
    regions: ['sao'],
    vcpu_count: 1,
    ram: 1024,
    disk: 25,
    bandwidth: 2048,
    monthly_cost: 9,
    disk_type: 'INTELHIGHPERF'
  },
  {
    plan: 'vhp-1c-2gb-intel',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 1,
    ram: 2048,
    disk: 50,
    bandwidth: 3072,
    monthly_cost: 12,
    disk_type: 'INTELHIGHPERF'
  },
  {
    plan: 'vhp-1c-2gb-intel-sc1',
    regions: ['sao'],
    vcpu_count: 1,
    ram: 2048,
    disk: 50,
    bandwidth: 3072,
    monthly_cost: 18,
    disk_type: 'INTELHIGHPERF'
  },
  {
    plan: 'vhp-2c-2gb-intel',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 2,
    ram: 2048,
    disk: 60,
    bandwidth: 4096,
    monthly_cost: 18,
    disk_type: 'INTELHIGHPERF'
  },
  {
    plan: 'vhp-2c-2gb-intel-sc1',
    regions: ['sao'],
    vcpu_count: 2,
    ram: 2048,
    disk: 60,
    bandwidth: 4096,
    monthly_cost: 27,
    disk_type: 'INTELHIGHPERF'
  },
  {
    plan: 'vhp-2c-4gb-intel',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 2,
    ram: 4096,
    disk: 100,
    bandwidth: 5120,
    monthly_cost: 24,
    disk_type: 'INTELHIGHPERF'
  },
  {
    plan: 'vhp-2c-4gb-intel-sc1',
    regions: ['sao'],
    vcpu_count: 2,
    ram: 4096,
    disk: 100,
    bandwidth: 5120,
    monthly_cost: 36,
    disk_type: 'INTELHIGHPERF'
  },
  {
    plan: 'vhp-4c-8gb-intel',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 4,
    ram: 8192,
    disk: 180,
    bandwidth: 6144,
    monthly_cost: 48,
    disk_type: 'INTELHIGHPERF'
  },
  {
    plan: 'vhp-4c-8gb-intel-sc1',
    regions: ['sao'],
    vcpu_count: 4,
    ram: 8192,
    disk: 180,
    bandwidth: 6144,
    monthly_cost: 72,
    disk_type: 'INTELHIGHPERF'
  },
  {
    plan: 'vhp-4c-12gb-intel',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 4,
    ram: 12288,
    disk: 260,
    bandwidth: 7168,
    monthly_cost: 72,
    disk_type: 'INTELHIGHPERF'
  },
  {
    plan: 'vhp-4c-12gb-intel-sc1',
    regions: ['sao'],
    vcpu_count: 4,
    ram: 12288,
    disk: 260,
    bandwidth: 7168,
    monthly_cost: 108,
    disk_type: 'INTELHIGHPERF'
  },
  {
    plan: 'vhp-8c-16gb-intel',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 8,
    ram: 16384,
    disk: 350,
    bandwidth: 8192,
    monthly_cost: 96,
    disk_type: 'INTELHIGHPERF'
  },
  {
    plan: 'vhp-8c-16gb-intel-sc1',
    regions: ['sao'],
    vcpu_count: 8,
    ram: 16384,
    disk: 350,
    bandwidth: 8192,
    monthly_cost: 144,
    disk_type: 'INTELHIGHPERF'
  },
  {
    plan: 'vhp-12c-24gb-intel',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 12,
    ram: 24576,
    disk: 500,
    bandwidth: 12288,
    monthly_cost: 144,
    disk_type: 'INTELHIGHPERF'
  },
  {
    plan: 'vhp-12c-24gb-intel-sc1',
    regions: ['sao'],
    vcpu_count: 12,
    ram: 24576,
    disk: 500,
    bandwidth: 12288,
    monthly_cost: 216,
    disk_type: 'INTELHIGHPERF'
  },
  {
    plan: 'voc-c-1c-2gb-25s-amd',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 1,
    ram: 2048,
    disk: 25,
    bandwidth: 4096,
    monthly_cost: 28,
    disk_type: 'DEDICATEDOPTIMIZED'
  },
  {
    plan: 'voc-c-1c-2gb-25s-amd-sc1',
    regions: ['sao'],
    vcpu_count: 1,
    ram: 2048,
    disk: 25,
    bandwidth: 4096,
    monthly_cost: 42,
    disk_type: 'DEDICATEDOPTIMIZED'
  },
  {
    plan: 'voc-g-1c-4gb-30s-amd',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 1,
    ram: 4096,
    disk: 30,
    bandwidth: 4096,
    monthly_cost: 30,
    disk_type: 'DEDICATEDOPTIMIZED'
  },
  {
    plan: 'voc-g-1c-4gb-30s-amd-sc1',
    regions: ['sao'],
    vcpu_count: 1,
    ram: 4096,
    disk: 30,
    bandwidth: 4096,
    monthly_cost: 45,
    disk_type: 'DEDICATEDOPTIMIZED'
  },
  {
    plan: 'voc-m-1c-8gb-50s-amd',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 1,
    ram: 8192,
    disk: 50,
    bandwidth: 5120,
    monthly_cost: 40,
    disk_type: 'DEDICATEDOPTIMIZED'
  },
  {
    plan: 'voc-m-1c-8gb-50s-amd-sc1',
    regions: ['sao'],
    vcpu_count: 1,
    ram: 8192,
    disk: 50,
    bandwidth: 5120,
    monthly_cost: 60,
    disk_type: 'DEDICATEDOPTIMIZED'
  },
  {
    plan: 'voc-c-2c-4gb-50s-amd',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 2,
    ram: 4096,
    disk: 50,
    bandwidth: 5120,
    monthly_cost: 40,
    disk_type: 'DEDICATEDOPTIMIZED'
  },
  {
    plan: 'voc-g-2c-8gb-50s-amd',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 2,
    ram: 8192,
    disk: 50,
    bandwidth: 5120,
    monthly_cost: 60,
    disk_type: 'DEDICATEDOPTIMIZED'
  },
  {
    plan: 'voc-c-2c-4gb-50s-amd-sc1',
    regions: ['sao'],
    vcpu_count: 2,
    ram: 4096,
    disk: 50,
    bandwidth: 5120,
    monthly_cost: 60,
    disk_type: 'DEDICATEDOPTIMIZED'
  },
  {
    plan: 'voc-g-2c-8gb-50s-amd-sc1',
    regions: ['sao'],
    vcpu_count: 2,
    ram: 8192,
    disk: 50,
    bandwidth: 5120,
    monthly_cost: 90,
    disk_type: 'DEDICATEDOPTIMIZED'
  },
  {
    plan: 'voc-c-2c-4gb-75s-amd',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 2,
    ram: 4096,
    disk: 75,
    bandwidth: 5120,
    monthly_cost: 45,
    disk_type: 'DEDICATEDOPTIMIZED'
  },
  {
    plan: 'voc-c-2c-4gb-75s-amd-sc1',
    regions: ['sao'],
    vcpu_count: 2,
    ram: 4096,
    disk: 75,
    bandwidth: 5120,
    monthly_cost: 67.5,
    disk_type: 'DEDICATEDOPTIMIZED'
  },
  {
    plan: 'voc-c-4c-8gb-75s-amd',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 4,
    ram: 8192,
    disk: 75,
    bandwidth: 6144,
    monthly_cost: 80,
    disk_type: 'DEDICATEDOPTIMIZED'
  },
  {
    plan: 'voc-c-4c-8gb-75s-amd-sc1',
    regions: ['sao'],
    vcpu_count: 4,
    ram: 8192,
    disk: 75,
    bandwidth: 6144,
    monthly_cost: 120,
    disk_type: 'DEDICATEDOPTIMIZED'
  },
  {
    plan: 'voc-g-4c-16gb-80s-amd',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 4,
    ram: 16384,
    disk: 80,
    bandwidth: 6144,
    monthly_cost: 120,
    disk_type: 'DEDICATEDOPTIMIZED'
  },
  {
    plan: 'voc-g-4c-16gb-80s-amd-sc1',
    regions: ['sao'],
    vcpu_count: 4,
    ram: 16384,
    disk: 80,
    bandwidth: 6144,
    monthly_cost: 180,
    disk_type: 'DEDICATEDOPTIMIZED'
  },
  {
    plan: 'voc-m-2c-16gb-100s-amd',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 2,
    ram: 16384,
    disk: 100,
    bandwidth: 6144,
    monthly_cost: 80,
    disk_type: 'DEDICATEDOPTIMIZED'
  },
  {
    plan: 'voc-m-2c-16gb-100s-amd-sc1',
    regions: ['sao'],
    vcpu_count: 2,
    ram: 16384,
    disk: 100,
    bandwidth: 6144,
    monthly_cost: 120,
    disk_type: 'DEDICATEDOPTIMIZED'
  },
  {
    plan: 'voc-s-1c-8gb-150s-amd',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 1,
    ram: 8192,
    disk: 150,
    bandwidth: 4096,
    monthly_cost: 75,
    disk_type: 'DEDICATEDOPTIMIZED'
  },
  {
    plan: 'voc-s-1c-8gb-150s-amd-sc1',
    regions: ['sao'],
    vcpu_count: 1,
    ram: 8192,
    disk: 150,
    bandwidth: 4096,
    monthly_cost: 112.5,
    disk_type: 'DEDICATEDOPTIMIZED'
  },
  {
    plan: 'voc-c-4c-8gb-150s-amd',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 4,
    ram: 8192,
    disk: 150,
    bandwidth: 6144,
    monthly_cost: 90,
    disk_type: 'DEDICATEDOPTIMIZED'
  },
  {
    plan: 'voc-c-4c-8gb-150s-amd-sc1',
    regions: ['sao'],
    vcpu_count: 4,
    ram: 8192,
    disk: 150,
    bandwidth: 6144,
    monthly_cost: 135,
    disk_type: 'DEDICATEDOPTIMIZED'
  },
  {
    plan: 'voc-c-8c-16gb-150s-amd',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 8,
    ram: 16384,
    disk: 150,
    bandwidth: 7168,
    monthly_cost: 160,
    disk_type: 'DEDICATEDOPTIMIZED'
  },
  {
    plan: 'voc-c-8c-16gb-150s-amd-sc1',
    regions: ['sao'],
    vcpu_count: 8,
    ram: 16384,
    disk: 150,
    bandwidth: 7168,
    monthly_cost: 240,
    disk_type: 'DEDICATEDOPTIMIZED'
  },
  {
    plan: 'voc-g-8c-32gb-160s-amd',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 8,
    ram: 32768,
    disk: 160,
    bandwidth: 7168,
    monthly_cost: 240,
    disk_type: 'DEDICATEDOPTIMIZED'
  },
  {
    plan: 'voc-g-8c-32gb-160s-amd-sc1',
    regions: ['sao'],
    vcpu_count: 8,
    ram: 32768,
    disk: 160,
    bandwidth: 7168,
    monthly_cost: 360,
    disk_type: 'DEDICATEDOPTIMIZED'
  },
  {
    plan: 'voc-m-2c-16gb-200s-amd',
    regions: ['ewr', 'ams', 'lhr', 'sjc', 'icn', 'sgp', 'mel', 'scl'],
    vcpu_count: 2,
    ram: 16384,
    disk: 200,
    bandwidth: 6144,
    monthly_cost: 100,
    disk_type: 'DEDICATEDOPTIMIZED'
  }
];
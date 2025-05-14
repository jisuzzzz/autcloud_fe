// objectStorageOptions.ts - Defines object storage options for cloud resources

// Interface for object storage specifications
export interface ObjectStorageSpec {
  id: string
  plan: string
  price: string
  regions: string[]
  sales_desc: string
}

// Array of object storage options
export const ObjectStorageOptions: ObjectStorageSpec[] = [
  {
    id: "2",
    plan: "Standard",
    price: "18.00",
    regions: ['ewr', 'sgp', 'sjc', 'ams', 'blr', 'del'],
    sales_desc: 'Affordable bulk storage with data readily available.'
  },
  {
    id: "3",
    plan: "Premium",
    price: "36.00",
    regions: ['ewr', 'sgp', 'sjc', 'ams', 'blr', 'del'],
    sales_desc: 'Reliable and durable storage for a variety of uses.'
  },
  {
    id: "4",
    plan: "Performance",
    price: "50.00",
    regions: ['ewr', 'ord', 'lax', 'ams', 'syd', 'lhr', 'sgp', 'nrt', 'blr'],
    sales_desc: 'Low-latency storage for datacenter workloads.'
  },
  {
    id: "5",
    plan: "Accelerated",
    price: "100.00",
    regions: ['ewr', 'ord', 'lax', 'ams', 'syd', 'lhr', 'sgp', 'nrt', 'blr'],
    sales_desc: 'Fast storage for the most demanding write-heavy uses.'
  }
];
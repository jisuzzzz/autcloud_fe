// objectStorageOptions.ts - Defines object storage options for cloud resources

// Interface for object storage specifications
export interface ObjectStorageSpec {
  id: number
  price: number
  locations: string[]
  sales_desc: string
}

// Array of object storage options
export const ObjectStorageOptions: ObjectStorageSpec[] = [
  {
    id: 2,
    price: 18,
    locations: ['ewr', 'sgp', 'sjc', 'ams', 'blr', 'del'],
    sales_desc: 'Affordable bulk storage with data readily available.'
  },
  {
    id: 3,
    price: 36,
    locations: ['ewr', 'sgp', 'sjc', 'ams', 'blr', 'del'],
    sales_desc: 'Reliable and durable storage for a variety of uses.'
  },
  {
    id: 4,
    price: 50,
    locations: ['ewr', 'ord', 'lax', 'ams', 'syd', 'lhr', 'sgp', 'nrt', 'blr'],
    sales_desc: 'Low-latency storage for datacenter workloads.'
  },
  {
    id: 5,
    price: 100,
    locations: ['ewr', 'ord', 'lax', 'ams', 'syd', 'lhr', 'sgp', 'nrt', 'blr'],
    sales_desc: 'Fast storage for the most demanding write-heavy uses.'
  }
];
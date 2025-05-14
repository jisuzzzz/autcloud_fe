type ResourceConfig = {
  id: string,
  type: 'Compute' | 'Database' | 'BlockStorage' | 'ObjectStorage' | 'FireWall',
  position: {
    x: number,
    y: number
  },
  status: 'add' | 'remove' | 'edit' | 'comfirm',
  spec: ComputeSpecType | DatabaseSpecType | BlockStorageSpecType | ObjectStorageSpecType | FirewallSpecType
}

type ResourceNodeType = {
  id: string,
  type: 'resource'
  position: {
    x: number,
    y: number
  },
  status: 'add' | 'remove' | 'edit' | 'comfirm',
  data: {
    type: 'Compute' | 'Database' | 'BlockStorage' | 'ObjectStorage' | 'FireWall',
    status: 'add' | 'remove' | 'edit' | 'comfirm',
    spec: ComputeSpecType | DatabaseSpecType | BlockStorageSpecType | ObjectStorageSpecType | FirewallSpecType
  }
}

type ProjectTemplate = {
  id: string,
  name: string,
  description: string,
  initial_resources: ResourceConfig[]
}

type ComputeSpecType = {
  plan: string,
  status: string,
  region: string,
  ip_address: string,
  vcpu: string,
  ram: string,
  disk: string,
  bandwidth: string,
  label: string,
  os: string,
  auto_backups: boolean
  monthly_cost: string
}

type DatabaseSpecType = {
  status: string,
  plan: string,
  db_engine: string,
  latest_backup: string,
  replica_nodes: string,
  vcpu_count: string, 
  ram: string, 
  disk: string,
  region: string,
  label: string,
  monthly_cost: string
}

type BlockStorageSpecType = {
  id: string,
  region: string,
  type: string,
  mount_id: string,
  attached_to: string,
  size: string,
  label: string,
  date_created: string
}

type ObjectStorageSpecType = {
  id: string,
  plan: string,
  label: string,
  region: string,
  price: string,
  storage_price: string,
  transfer_price: string
}

type FirewallSpecType = {
  label: string
}

type SpecValueType = string | number | boolean | null
type NodeChangeStatus = 'added' | 'removed' | 'modified' | 'unchanged'
type ProjectChanges = {
  [noedId: string]: {
    userId: string,
    userName: string,
    status: NodeChangeStatus,
    label: string,
    specChanges: {
      [key: string] : {
        prevValue: SpecValueType,
        currValue: SpecValueType,
      } 
    }
  }
}

const PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    id: "9cd47912-c94a-451f-a1a2-ec5b2097c461",
    name: "Shopify+",
    description: "e-commerce platform infrastructure design",
    initial_resources: [
      {
        id: "compute-1",
        type: "Compute",
        position: { x: 500, y: 250 },
        status: 'add', 
        spec: {
          plan: 'vc2-2c-2gb',
          status: "running",
          region: "New Jersey (ewr)",
          ip_address: "64.176.217.21",
          vcpu: "1",
          ram: "1024.00",
          disk: "25",
          bandwidth: "0.34",
          label: "Shopify-Web-Server",
          os: "Ubuntu 22.04 x64",
          auto_backups: false,
          monthly_cost: "0"
        }
      },
      {
        id: "storage-1",
        type: "ObjectStorage",
        position: { x: 350, y: 400 },
        status: 'add',
        spec: {
          id: "2",
          label: "Shopify-Asset-Storage",
          region: "New Jersey (ewr)",
          plan: "Standard",
          price: "18.00",
          storage_price: "0.018",
          transfer_price: "0.018"
        }
      },
      {
        id: "block-1",
        type: "BlockStorage",
        position: { x: 500, y: 400 },
        status: 'add',
        spec: {
          id: "999c0000-0000-0000-0000-0000000001",
          region: "New Jersey (ewr)",
          type: "NVMe",
          mount_id: "ewr-a23cda1547af4b",
          attached_to: "compute-1",
          size: "1",
          label: "Shopify-Data-Volume",
          date_created: "04/15/2024 14:49:20"
        }
      },
      {
        id: "db-1",
        type: "Database",
        position: { x: 650, y: 400 },
        status: 'add',
        spec: {
          status: "pending",
          plan: "vultur-dbaas-startup-cc-1-55-2",
          db_engine: "PostgreSQL",
          latest_backup: "2 hours ago",
          vcpu_count: "1", 
          ram: "1024", 
          disk: "25",
          replica_nodes: "1",
          region: "New Jersey (ewr)",
          label: "Shopify-PostgreSQL-DB",
          monthly_cost: "0"
        }
      },
      {
        id: "firewall-1",
        type: "FireWall",
        position: { x: 500, y: 100 },
        status: 'add',
        spec: {
          label: "allow"
        }
      }
    ]
  },

  {
    id: "8ab36845-d77c-482f-b9e3-5a4c31f89d52",
    name: "Shopify+ HA",
    description: "e-commerce platform infrastructure design with high availability",
    initial_resources: [
      {
        id: "compute-1",
        type: "Compute",
        position: { x: 400, y: 150 },
        status: 'add', 
        spec: {
          plan: 'vc2-4c-8gb',
          status: "running",
          region: "Chicago (ord)",
          ip_address: "192.168.1.101",
          vcpu: "4",
          ram: "8192.00",
          disk: "80",
          bandwidth: "5.0",
          label: "Shopify-Web-Server-Primary",
          os: "Ubuntu 22.04 x64",
          auto_backups: true,
          monthly_cost: "0"
        }
      },
      {
        id: "compute-2",
        type: "Compute",
        position: { x: 600, y: 150 },
        status: 'add', 
        spec: {
          plan: 'vc2-4c-8gb',
          status: "running",
          region: "Chicago (ord)",
          ip_address: "192.168.1.102",
          vcpu: "4",
          ram: "8192.00",
          disk: "80",
          bandwidth: "5.0",
          label: "Shopify-Web-Server-Secondary",
          os: "Ubuntu 22.04 x64",
          auto_backups: true,
          monthly_cost: "0"
        }
      },
      {
        id: "block-1",
        type: "BlockStorage",
        position: { x: 400, y: 300 },
        status: 'add',
        spec: {
          id: "bs-chi-001",
          region: "Chicago (ord)",
          type: "NVMe",
          mount_id: "ord-b47cda1547af9c",
          attached_to: "compute-1",
          size: "500",
          label: "Shopify-Data-Primary",
          date_created: "06/10/2024 09:12:45"
        }
      },
      {
        id: "block-2",
        type: "BlockStorage",
        position: { x: 600, y: 300 },
        status: 'add',
        spec: {
          id: "bs-chi-002",
          region: "Chicago (ord)",
          type: "NVMe",
          mount_id: "ord-c58eda1896af3d",
          attached_to: "compute-2",
          size: "500",
          label: "Shopify-Data-Secondary",
          date_created: "06/10/2024 09:15:32"
        }
      },
      {
        id: "db-1",
        type: "Database",
        position: { x: 500, y: 450 },
        status: 'add',
        spec: {
          status: "running",
          plan: "vultur-dbaas-business-cc-4-16-4",
          db_engine: "PostgreSQL",
          latest_backup: "3 hours ago",
          vcpu_count: "1", 
          ram: "1024", 
          disk: "25",
          replica_nodes: "2",
          region: "Chicago (ord)",
          label: "Shopify-PostgreSQL-Cluster",
          monthly_cost: "0"
        }
      },
      {
        id: "firewall-1",
        type: "FireWall",
        position: { x: 500, y: 50 },
        status: 'add',
        spec: {
          label: "HA-Protection-Layer"
        }
      },
      {
        id: "storage-1",
        type: "ObjectStorage",
        position: { x: 300, y: 450 },
        status: 'add',
        spec: {
          label: "Shopify-Asset-Storage-HA",
          region: "Chicago (ord)",
          plan: "Performance",
          price: "50.00",
          storage_price: "0.023",
          transfer_price: "0.020"
        }
      }
    ]
  },
  
  {
    id: "5cd92f34-a17b-429d-8e35-9bf72c680d13",
    name: "Shopify+ Microservices",
    description: "e-commerce platform infrastructure design with microservices architecture",
    initial_resources: [
      {
        id: "compute-1",
        type: "Compute",
        position: { x: 400, y: 200 },
        status: 'add', 
        spec: {
          plan: 'vc2-2c-4gb',
          status: "running",
          region: "Seattle (sea)",
          ip_address: "10.0.1.101",
          vcpu: "2",
          ram: "4096.00",
          disk: "50",
          bandwidth: "3.0",
          label: "Shopify-API-Gateway",
          os: "Ubuntu 22.04 x64",
          auto_backups: true,
          monthly_cost: "0"
        }
      },
      {
        id: "compute-2",
        type: "Compute",
        position: { x: 600, y: 200 },
        status: 'add', 
        spec: {
          plan: 'vc2-2c-4gb',
          status: "running",
          region: "Seattle (sea)",
          ip_address: "10.0.1.102",
          vcpu: "2",
          ram: "4096.00",
          disk: "50",
          bandwidth: "3.0",
          label: "Shopify-Auth-Service",
          os: "Ubuntu 22.04 x64",
          auto_backups: true,
          monthly_cost: "0"
        }
      },
      {
        id: "db-1",
        type: "Database",
        position: { x: 400, y: 380 },
        status: 'add',
        spec: {
          status: "running",
          plan: "vultur-dbaas-business-cc-2-8-2",
          db_engine: "PostgreSQL",
          latest_backup: "1 hour ago",
          vcpu_count: "1", 
          ram: "1024", 
          disk: "25",
          replica_nodes: "1",
          region: "Seattle (sea)",
          label: "Shopify-Product-DB",
          monthly_cost: "0"
        }
      },
      {
        id: "db-2",
        type: "Database",
        position: { x: 600, y: 380 },
        status: 'add',
        spec: {
          status: "running",
          plan: "vultur-dbaas-business-cc-2-8-2",
          db_engine: "PostgreSQL",
          latest_backup: "1 hour ago",
          vcpu_count: "1", 
          ram: "1024", 
          disk: "25",
          replica_nodes: "1",
          region: "Seattle (sea)",
          label: "Shopify-Order-DB",
          monthly_cost: "0"
        }
      },
      {
        id: "storage-1",
        type: "ObjectStorage",
        position: { x: 500, y: 550 },
        status: 'add',
        spec: {
          label: "Shopify-Media-Storage",
          region: "Seattle (sea)",
          plan: "Premium",
          price: "36.00",
          storage_price: "0.020",
          transfer_price: "0.019"
        }
      },
      {
        id: "firewall-1",
        type: "FireWall",
        position: { x: 500, y: 100 },
        status: 'add',
        spec: {
          label: "API-Gateway-Protection"
        }
      }
    ]
  }
]

// 프로젝트 관련 함수들
export function getProjectById(id: string) {
  return PROJECT_TEMPLATES.find((p) => p.id === id) || null;
}

export function getProjects() {
  return PROJECT_TEMPLATES.map(project => ({
    id: project.id,
    name: project.name,
    description: project.description
  }));
}

export { 
  type ProjectTemplate, 
  type ResourceConfig, 
  type ResourceNodeType,
  type ComputeSpecType,
  type DatabaseSpecType,
  type BlockStorageSpecType,
  type ObjectStorageSpecType,
  type FirewallSpecType,
  type SpecValueType,
  type NodeChangeStatus, 
  type ProjectChanges,
}
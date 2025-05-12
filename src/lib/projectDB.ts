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
  id: string,
  status: string,
  location: string,
  ip_address: string,
  vcpu: string,
  ram: string,
  storage: string,
  bandwidth: string,
  label: string,
  os: string,
  auto_backups: boolean
}

type DatabaseSpecType = {
  status: string,
  id: string,
  node_plan: string,
  cluster_created: string,
  db_engine: string,
  latest_backup: string,
  replica_nodes: boolean,
  location: string,
  label: string,
  tag: string
}

type BlockStorageSpecType = {
  id: string,
  location: string,
  type: string,
  mount_id: string,
  attached_to: string,
  size: string,
  label: string,
  date_created: string
}

type ObjectStorageSpecType = {
  label: string,
  location: string,
  tier: string,
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
    description: "AWS based e-commerce platform infrastructure design",
    initial_resources: [
      {
        id: "compute-1",
        type: "Compute",
        position: { x: 500, y: 250 },
        status: 'add', 
        spec: {
          id: 'vc2-2c-2gb',
          status: "running",
          location: "New Jersey (ewr)",
          ip_address: "64.176.217.21",
          vcpu: "1 vCPU",
          ram: "1024.00 MB",
          storage: "25 GB SSD",
          bandwidth: "0.34 GB",
          label: "Shopify-Web-Server",
          os: "Ubuntu 22.04 x64",
          auto_backups: false
        }
      },
      {
        id: "storage-1",
        type: "ObjectStorage",
        position: { x: 350, y: 400 },
        status: 'add',
        spec: {
          label: "Shopify-Asset-Storage",
          location: "New Jersey (ewr)",
          tier: "Standard",
          storage_price: "$0.018/GB",
          transfer_price: "$0.018/GB"
        }
      },
      {
        id: "block-1",
        type: "BlockStorage",
        position: { x: 500, y: 400 },
        status: 'add',
        spec: {
          id: "999c0000-0000-0000-0000-0000000001",
          location: "New Jersey (ewr)",
          type: "NVMe",
          mount_id: "ewr-a23cda1547af4b",
          attached_to: "compute-1",
          size: "1GB",
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
          id: "999c0000-0000-0000-0000-0000000002",
          node_plan: "vultur-dbaas-startup-cc-1-55-2",
          cluster_created: "3 hours ago",
          db_engine: "PostgreSQL",
          latest_backup: "2 hours ago",
          replica_nodes: false,
          location: "New Jersey (ewr)",
          label: "Shopify-PostgreSQL-DB",
          tag: "production"
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
    id: "8fd32a45-b12c-4e8f-9d23-ff4a98b3d789",
    name: "TensorHub",
    description: "Cloud pipeline for machine learning model training and inference",
    initial_resources: [
      {
        id: "compute-1",
        type: "Compute",
        position: { x: 400, y: 200 },
        status: 'add',
        spec: {
          id: 'vc2-2c-2gb',
          status: "running",
          location: "Silicon Valley",
          ip_address: "64.176.217.22",
          vcpu: "4 vCPU",
          ram: "8192.00 MB",
          storage: "100 GB SSD",
          bandwidth: "4.00 GB",
          label: "TensorHub-Training-Server",
          os: "Ubuntu 22.04 x64",
          auto_backups: true
        }
      },
      {
        id: "compute-2",
        type: "Compute",
        position: { x: 600, y: 200 },
        status: 'add',
        spec: {
          id: 'vc2-2c-2gb',
          status: "running",
          location: "Silicon Valley",
          ip_address: "64.176.217.23",
          vcpu: "4 vCPU",
          ram: "8192.00 MB",
          storage: "100 GB SSD",
          bandwidth: "4.00 GB",
          label: "TensorHub-Inference-Server",
          os: "Ubuntu 22.04 x64",
          auto_backups: true
        }
      },
      {
        id: "storage-1",
        type: "ObjectStorage",
        position: { x: 400, y: 350 },
        status: 'add',
        spec: {
          label: "TensorHub-Model-Storage",
          location: "Silicon Valley",
          tier: "Premium",
          storage_price: "$0.023/GB",
          transfer_price: "$0.023/GB"
        }
      },
      {
        id: "block-1",
        type: "BlockStorage",
        position: { x: 600, y: 350 },
        status: 'add',
        spec: {
          id: "999c0000-0000-0000-0000-0000000003",
          location: "Silicon Valley",
          type: "NVMe",
          mount_id: "sjc-b23cda1547af4b",
          attached_to: "8192.00 MB Ubuntu 22.04 LTS",
          size: "500GB",
          label: "TensorHub-Dataset-Volume",
          date_created: "04/15/2024 14:49:20"
        }
      },
      {
        id: "firewall-1",
        type: "FireWall",
        position: { x: 500, y: 50 },
        status: 'add',
        spec: {
          label: "allow"
        }
      }
    ]
  },
  {
    id: "7ae91b23-d45f-4c12-b890-cd3456e78901",
    name: "MicroFlow",
    description: "Backend system diagram based on microservices architecture",
    initial_resources: [
      {
        id: "firewall-1",
        type: "FireWall",
        position: { x: 500, y: 150 },
        status: 'add',
        spec: { label: "allow" }
      },
      {
        id: "compute-1",
        type: "Compute",
        position: { x: 350, y: 300 },
        status: 'add',
        spec: {
          id: 'vc2-2c-2gb',
          status: "running",
          location: "Dublin",
          ip_address: "64.176.217.24",
          vcpu: "2 vCPU",
          ram: "4096.00 MB",
          storage: "50 GB SSD",
          bandwidth: "2.00 GB",
          label: "MicroFlow-API-Gateway",
          os: "Ubuntu 20.04 LTS",
          auto_backups: false
        }
      },
      {
        id: "compute-2",
        type: "Compute",
        position: { x: 650, y: 300 },
        status: 'add',
        spec: {
          id: 'vc2-2c-2gb',
          status: "running",
          location: "Dublin",
          ip_address: "64.176.217.25",
          vcpu: "2 vCPU",
          ram: "4096.00 MB",
          storage: "50 GB SSD",
          bandwidth: "2.00 GB",
          label: "MicroFlow-Auth-Service",
          os: "Ubuntu 20.04 LTS",
          auto_backups: false
        }
      },
      {
        id: "block-1",
        type: "BlockStorage",
        position: { x: 350, y: 450 },
        status: 'add',
        spec: {
          id: "999c0000-0000-0000-0000-0000000004",
          location: "Dublin",
          type: "NVMe",
          mount_id: "dub-c23cda1547af4b",
          attached_to: "4096.00 MB Ubuntu 20.04 LTS",
          size: "100GB",
          label: "MicroFlow-Config-Volume",
          date_created: "04/15/2024 14:49:20"
        }
      },
      {
        id: "db-1",
        type: "Database",
        position: { x: 500, y: 450 },
        status: 'add',
        spec: {
          status: "running",
          id: "999c0000-0000-0000-0000-0000000005",
          node_plan: "vultur-dbaas-business-cc-2-80-4",
          cluster_created: "5 hours ago",
          db_engine: "PostgreSQL",
          latest_backup: "1 hour ago",
          replica_nodes: true,
          location: "Dublin",
          label: "MicroFlow-User-DB",
          tag: "staging"
        }
      },
      {
        id: "storage-1",
        type: "ObjectStorage",
        position: { x: 650, y: 450 },
        status: 'add',
        spec: {
          label: "MicroFlow-Logs-Storage",
          location: "Dublin",
          tier: "Standard",
          storage_price: "$0.020/GB",
          transfer_price: "$0.020/GB"
        }
      }
    ]

  },
  {
    id: "5ab34c67-f12b-4d56-e789-de1234f56789",
    name: "GameCore",
    description: "Real-time game server infrastructure configuration",
    initial_resources: [
      {
        id: "firewall-1",
        type: "FireWall",
        position: { x: 500, y: 100 },
        status: 'add',
        spec: { label: "allow" }
      },
      {
        id: "compute-1",
        type: "Compute",
        position: { x: 400, y: 250 },
        status: 'add',
        spec: {
          id: 'vc2-2c-2gb',
          status: "running",
          location: "Tokyo",
          ip_address: "64.176.217.26",
          vcpu: "8 vCPU",
          ram: "16384.00 MB",
          storage: "200 GB SSD",
          bandwidth: "6.00 GB",
          label: "GameCore-Match-Server",
          os: "Amazon Linux 2",
          auto_backups: true
        }
      },
      {
        id: "compute-2",
        type: "Compute",
        position: { x: 600, y: 250 },
        status: 'add',
        spec: {
          id: 'vc2-2c-2gb',
          status: "running",
          location: "Tokyo",
          ip_address: "64.176.217.27",
          vcpu: "8 vCPU",
          ram: "16384.00 MB",
          storage: "200 GB SSD",
          bandwidth: "6.00 GB",
          label: "GameCore-User-Server",
          os: "Amazon Linux 2",
          auto_backups: true
        }
      },
      {
        id: "db-1",
        type: "Database",
        position: { x: 400, y: 400 },
        status: 'add',
        spec: {
          status: "running",
          id: "999c0000-0000-0000-0000-0000000006",
          node_plan: "vultur-dbaas-enterprise-cc-4-160-8",
          cluster_created: "2 hours ago",
          db_engine: "PostgreSQL",
          latest_backup: "30 mins ago",
          replica_nodes: true,
          location: "Tokyo",
          label: "GameCore-Player-DB",
          tag: "production"
        }
      },
      {
        id: "block-1",
        type: "BlockStorage",
        position: { x: 500, y: 400 },
        status: 'add',
        spec: {
          id: "999c0000-0000-0000-0000-0000000007",
          location: "Tokyo",
          type: "NVMe",
          mount_id: "nrt-d23cda1547af4b",
          attached_to: "16384.00 MB Amazon Linux 2",
          size: "1TB",
          label: "GameCore-Assets-Volume",
          date_created: "04/15/2024 14:49:20"
        }
      },
      {
        id: "storage-1",
        type: "ObjectStorage",
        position: { x: 600, y: 400 },
        status: 'add',
        spec: {
          label: "GameCore-Media-Storage",
          location: "Tokyo",
          tier: "Premium",
          storage_price: "$0.025/GB",
          transfer_price: "$0.025/GB"
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

// 리소스별 기본값
export const DEFAULT_RESOURCES = {
  Compute: {
    id: '',
    status: '',
    location: '',
    ip_address: '64.176.217.21',
    vcpu: '',
    ram: '',
    storage: '',
    bandwidth: '',
    label: '',
    os: '',
    auto_backups: false
  },
  Database: {
    id: '',
    status: '',
    node_plan: '',
    cluster_created: '',
    db_engine: '',
    latest_backup: '',
    replica_nodes: false,
    location: '',
    label: '',
    tag: ''
  },
  BlockStorage: {
    id: '',
    location: '',
    type: '',
    mount_id: '',
    attached_to: '',
    size: '',
    label: '',
    date_created: ''
  },
  ObjectStorage: {
    label: '',
    location: '',
    tier: '',
    storage_price: '',
    transfer_price: ''
  },
  FireWall: {
    label: ''
  }
};

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
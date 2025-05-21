type ResourceConfig = {
  id: string,
  type: 'Compute' | 'Database' | 'BlockStorage' | 'ObjectStorage' | 'FireWall',
  position: {
    x: number,
    y: number
  },
  status: 'add' | 'remove' | 'edit' | 'comfirm',
  attribute: ComputeAttributeConfig | DatabaseAttributeConfig | ObjectStorageAttributConfig  
  | BlockStorageAttributeConfig | FirewallAttributeType
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
    attribute: ComputeAttributeConfig | DatabaseAttributeConfig | ObjectStorageAttributConfig  
    | BlockStorageAttributeConfig | FirewallAttributeType
  }
}

type ProjectTemplate = {
  id: string,
  name: string,
  description: string,
  initial_resources: ResourceConfig[]
}

type ComputeAttributeConfig = {
  plan: string,
  status: string,
  region_id: string,
  ip_address: string,
  label: string,
  os_id: string,
  auto_backups: string,
  group_id?: string
}

type DatabaseAttributeConfig = {
  status: string,
  plan: string,
  db_engine: string,
  db_version: string,
  latest_backup: string,
  region_id: string,
  label: string,
}

type ObjectStorageAttributConfig = {
  cluster_id: string,
  tier_id: string,
  label: string,
}

type BlockStorageAttributeConfig = {
  region_id: string,
  type: string,
  mount_id: string,
  attached_to: string,
  size: string,
  label: string,
}

type ComputeAttributeType = {
  plan: string,
  status: string,
  region_id: string,
  region: string,
  ip_address: string,
  vcpu: string,
  ram: string,
  disk: string,
  bandwidth: string,
  label: string,
  os_id: string,
  os: string,
  auto_backups: string,
  monthly_cost: string,
  group_id?: string
}

type DatabaseAttributeType = {
  status: string,
  plan: string,
  db_engine: string,
  db_version: string,
  latest_backup: string,
  replica_nodes: string,
  vcpu: string, 
  ram: string, 
  disk: string,
  region_id: string,
  region: string,
  label: string,
  monthly_cost: string
}

type BlockStorageAttributeType = {
  region_id: string,
  region: string,
  type: string,
  mount_id: string,
  attached_to: string,
  size: string,
  label: string,
}

type ObjectStorageAttributeType = {
  cluster_id: string,
  tier_id: string,
  plan: string,
  label: string,
  region: string,
  price: string,
  ratelimit_ops_secs: string,
  ratelimit_ops_bytes: string,
  disk_gb_price: string,
  bw_gb_price: string,
}

type FirewallAttributeType = {
  label: string
  rules: FirewallRuleType[]
}

type FirewallRuleType = {
  rule_id: string
  action?: string
  port: string
  ip_type: string
  protocol: string
  subnet: string
  subnet_size: number
  notes: string
}

type AttributeValueType = string | number | boolean | null
type NodeChangeStatus = 'added' | 'removed' | 'modified' | 'unchanged'
type ProjectChanges = {
  [noedId: string]: {
    userId: string,
    userName: string,
    status: NodeChangeStatus,
    label: string,
    attributeChanges: {
      [key: string] : {
        prevValue: AttributeValueType,
        currValue: AttributeValueType,
      } 
    }
  }
}

type CreateInstanceType = {
  data: {
    region: string,
    plan: string,
    label: string,
    os_id: number,
    backups: string,
    hostname: string,
  }
}

type UpdateInstanceType = {
  data: {
    id: string,
    backups: string,
    firewall_group_id: string,
    os_id: number,
    plan: string,
    ddos_protection: boolean,
    label: string
  }
}

type DeleteInstanceType = {
  data: {
    id: string
  }
}

type CreateManagedDatabaseType = {
  data: {
      database_engine: DatabaseEngineType,
      database_engine_version: number
      region: string,
      plan: string,
      label: string,
  }
}
enum DatabaseEngineType {
    mysql,
    pg
}

type UpdateManagedDatabaseType = {
  data: {
    id: string,
    plan: string,
    label: string,
  }
}

type DeleteManagedDatabaseType = {
  data: {
    id: string,
  }
}

type CreateObjectStorageType = {
  data: {
      cluster_id: number,
      tier_id: number,
      label: string,
  }
}

type UpdateObjectStorageType = {
  data: {
    id: string,
    label: string,
  }
}

type DeleteObjectStorageType = {
  data: {
    id: string,
  }
}

type CreateBlockStorageType = {
  data: {
    region: string,
    size_gb: number,
    label: string,
  }
}

type UpdateBlockStorageType = {
  data: {
    id: string,
    region: string,
    size_gb: number,
    label: string,
  }
}

type DeleteBlockStorageType = {
  data: {
    id: string,
  }
}

type CreateFirewallGroupType = {
  data: {
    description: string
  }
}

type UpdateFirewallGroupType = {
  data: {
    id: string,
    description: string
  }
}

type DeleteFirewallGroupType = {
  data: {
    id: string,
  }
}


type CreateFirewallRule = {
  data: {
    fire_wall_group_id: string,
    ip_type: string,
    protocol: string,
    port: string,
    subent: string,
    subnet_size: number,
    notes: string
  }
}

type DeleteFirewallRule = {
  data: {
    fire_wall_group_id: string,
    fire_wall_rule_id: number
  }
}

type CommandItem = {
  command_name: string,
  position?: { x: number,y: number },
  data: CreateInstanceType | UpdateInstanceType | DeleteInstanceType |
        CreateManagedDatabaseType | UpdateManagedDatabaseType | DeleteManagedDatabaseType |
        CreateObjectStorageType | UpdateObjectStorageType | DeleteObjectStorageType |
        CreateBlockStorageType | UpdateBlockStorageType | DeleteObjectStorageType |
        CreateFirewallGroupType | UpdateFirewallGroupType | DeleteFirewallGroupType |
        CreateFirewallRule | DeleteFirewallRule
}

type CommandList = CommandItem[]

const PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    id: "37bfb83b-dd64-410b-81c5-7374b0c453e0",
    name: "Shopify+",
    description: "e-commerce platform infrastructure design",
    initial_resources: [
      {
        id: "compute-1",
        type: "Compute",
        position: { x: 500, y: 250 },
        status: 'add', 
        attribute: {
          plan: 'vc2-2c-2gb',
          status: "running",
          region_id: "ewr",
          ip_address: "64.176.217.21",
          label: "Shopify-Web-Server",
          os_id: "2571",
          auto_backups: "enable",
          group_id: "firewall-1"
        }
      },
      {
        id: "storage-1",
        type: "ObjectStorage",
        position: { x: 350, y: 400 },
        status: 'add',
        attribute: {
          cluster_id: "2",
          tier_id: "2",
          label: "Shopify-Asset-Storage",
        }
      },
      {
        id: "block-1",
        type: "BlockStorage",
        position: { x: 500, y: 400 },
        status: 'add',
        attribute: {
          region_id: "ewr",
          type: "NVMe",
          mount_id: "ewr-a23cda1547af4b",
          attached_to: "compute-1",
          size: "1",
          label: "Shopify-Data-Volume",
        }
      },
      {
        id: "db-1",
        type: "Database",
        position: { x: 650, y: 400 },
        status: 'add',
        attribute: {
          status: "pending",
          plan: "vultr-dbaas-hobbyist-cc-1-25-1",
          db_engine: "pg",
          db_version: "15",
          latest_backup: "2 hours ago",
          region_id: "ewr",
          label: "Shopify-PostgreSQL-DB",
        }
      },
      {
        id: "firewall-1",
        type: "FireWall",
        position: { x: 500, y: 100 },
        status: 'add',
        attribute: {
          label: "Allow HTTP",
          rules: [
            {
              rule_id: "1",
              action: "accept",
              port: "80",
              ip_type: "v4",
              protocol: "tcp",
              subnet: "0.0.0.0",
              subnet_size: 0,
              notes: "Public HTTP access"
            },
            {
              rule_id: "2",
              action: "accept",
              port: "443",
              ip_type: "v4",
              protocol: "tcp",
              subnet: "0.0.0.0",
              subnet_size: 0,
              notes: "Public HTTPS access"
            }
          ]
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
        position: { x: 500, y: 250 },
        status: 'add', 
        attribute: {
          plan: 'vc2-2c-2gb',
          status: "running",
          region_id: "ewr",
          ip_address: "64.176.217.21",
          label: "Shopify-Web-Server",
          os_id: "2571",
          auto_backups: "enable",
          group_id: "firewall-1"
        }
      },
      {
        id: "compute-2",
        type: "Compute",
        position: { x: 600, y: 150 },
        status: 'add', 
        attribute: {
          plan: 'vc2-4c-8gb',
          status: "running",
          region_id: "ord",
          ip_address: "192.168.1.102",
          label: "Shopify-Web-Server-Secondary",
          os_id: "2571",
          auto_backups: "disable",
          group_id: "firewall-1"
        }
      },
      {
        id: "block-1",
        type: "BlockStorage",
        position: { x: 400, y: 300 },
        status: 'add',
        attribute: {
          region_id: "ord",
          type: "NVMe",
          mount_id: "ord-b47cda1547af9c",
          attached_to: "compute-1",
          size: "500",
          label: "Shopify-Data-Primary",
        }
      },
      {
        id: "block-2",
        type: "BlockStorage",
        position: { x: 600, y: 300 },
        status: 'add',
        attribute: {
          region_id: "ord",
          type: "NVMe",
          mount_id: "ord-c58eda1896af3d",
          attached_to: "compute-2",
          size: "500",
          label: "Shopify-Data-Secondary",
        }
      },
      {
        id: "db-1",
        type: "Database",
        position: { x: 500, y: 450 },
        status: 'add',
        attribute: {
          status: "running",
          plan: "vultur-dbaas-business-cc-4-16-4",
          db_engine: "pg",
          db_version: "15",
          latest_backup: "3 hours ago",
          region_id: "ord",
          label: "Shopify-PostgreSQL-Cluster",
        }
      },
      {
        id: "firewall-1",
        type: "FireWall",
        position: { x: 500, y: 50 },
        status: 'add',
        attribute: {
          label: "HA-Protection-Layer",
          rules: [
            {
              rule_id: "1",
              action: "accept",
              port: "80,443",
              ip_type: "v4",
              protocol: "tcp",
              subnet: "0.0.0.0",
              subnet_size: 0,
              notes: "Load Balancer Access"
            }
          ]
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
        attribute: {
          plan: 'vc2-2c-4gb',
          status: "running",
          region_id: "sea",
          ip_address: "10.0.1.101",
          label: "Shopify-API-Gateway",
          os_id: "2571",
          auto_backups: "enable",
          group_id: "firewall-1"
        }
      },
      {
        id: "compute-2",
        type: "Compute",
        position: { x: 600, y: 200 },
        status: 'add', 
        attribute: {
          plan: 'vc2-2c-4gb',
          status: "running",
          region_id: "sea",
          ip_address: "10.0.1.102",
          label: "Shopify-Auth-Service",
          os_id: "2571",
          auto_backups: "enable",
          group_id: "firewall-1"
        }
      },
      {
        id: "db-1",
        type: "Database",
        position: { x: 400, y: 380 },
        status: 'add',
        attribute: {
          status: "running",
          plan: "vultur-dbaas-business-cc-2-8-2",
          db_engine: "pg",
          db_version: "15",
          latest_backup: "1 hour ago",
          region_id: "sea",
          label: "Shopify-Product-DB",
        }
      },
      {
        id: "db-2",
        type: "Database",
        position: { x: 600, y: 380 },
        status: 'add',
        attribute: {
          status: "running",
          plan: "vultur-dbaas-business-cc-2-8-2",
          db_engine: "pg",
          db_version: "15",
          latest_backup: "1 hour ago",
          region_id: "sea",
          label: "Shopify-Order-DB",
        }
      },
      {
        id: "storage-1",
        type: "ObjectStorage",
        position: { x: 500, y: 550 },
        status: 'add',
        attribute: {
          cluster_id: "2",
          tier_id: "3",
          label: "Shopify-Media-Storage",
        }
      },
      {
        id: "firewall-1",
        type: "FireWall",
        position: { x: 500, y: 100 },
        status: 'add',
        attribute: {
          label: "API-Gateway-Protection",
          rules: [
            {
              rule_id: "1",
              action: "accept",
              port: "443",
              ip_type: "v4",
              protocol: "tcp",
              subnet: "0.0.0.0",
              subnet_size: 0,
              notes: "API Gateway Access"
            }
          ]
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
    description: project.description,
    initial_resources: project.initial_resources
  }));
}

export { 
  type ProjectTemplate, 
  type ResourceConfig, 
  type ResourceNodeType,
  type ComputeAttributeConfig,
  type DatabaseAttributeConfig,
  type ObjectStorageAttributConfig, 
  type BlockStorageAttributeConfig, 
  type ComputeAttributeType,
  type DatabaseAttributeType,
  type BlockStorageAttributeType,
  type ObjectStorageAttributeType,
  type FirewallAttributeType,
  type FirewallRuleType,
  type AttributeValueType,
  type NodeChangeStatus, 
  type ProjectChanges,
  type CreateInstanceType,
  type UpdateInstanceType,
  type DeleteInstanceType,
  type CreateManagedDatabaseType,
  type UpdateManagedDatabaseType,
  type DeleteManagedDatabaseType,
  type CreateBlockStorageType,
  type UpdateBlockStorageType,
  type DeleteBlockStorageType,
  type CreateObjectStorageType,
  type UpdateObjectStorageType,
  type DeleteObjectStorageType,
  type CreateFirewallGroupType,
  type UpdateFirewallGroupType,
  type DeleteFirewallGroupType,
  type CreateFirewallRule,
  type DeleteFirewallRule,
  type CommandList,
  type CommandItem
}
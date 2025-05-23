type ResourceConfig = {
  id: string,
  temp_id: string,
  type: 'Compute' | 'ManagedDatabase' | 'BlockStorage' | 'ObjectStorage' | 'FirewallGroup' | 'FirewallRule'

  position: {
    x: number,
    y: number
  },
  status: 'add' | 'remove' | 'edit' | 'comfirm',
  attribute: ComputeAttributeConfig | DatabaseAttributeConfig | ObjectStorageAttributConfig  
  | BlockStorageAttributeConfig | FirewallAttributeType | FirewallRuleType
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
    uu_id: string
    type: 'Compute' | 'ManagedDatabase' | 'BlockStorage' | 'ObjectStorage' | 'FirewallGroup',
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
  main_ip: string,
  label: string,
  os_id: string,
  auto_backups: string,
  firewall_group_id?: string
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
  attached_to_instance: string,
  size_gb: string,
  label: string,
}

type ComputeAttributeType = {
  plan: string,
  status: string,
  region_id: string,
  region: string,
  main_ip: string,
  vcpu: string,
  ram: string,
  disk: string,
  bandwidth: string,
  label: string,
  os_id: string,
  os: string,
  auto_backups: string,
  disk_type: string,
  monthly_cost: string,
  firewall_group_id?: string
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
  attached_to_instance: string,
  size_gb: string,
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
  description: string
  rules: FirewallRuleType[]
  label?: string
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
  label?: string
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
  id?: string,
  region: string,
  plan: string,
  label: string,
  os_id: number,
  backups: string,
  hostname: string,
}

type UpdateInstanceType = {
  id?: string,
  backups: string,
  firewall_group_id: string,
  os_id: number,
  plan: string,
  ddos_protection: boolean,
  label: string
}

type DeleteInstanceType = {
  id?: string,
}

type CreateManagedDatabaseType = {
    id?: string,
    database_engine: DatabaseEngineType,
    database_engine_version: number
    region: string,
    plan: string,
    label: string,
}
enum DatabaseEngineType {
    mysql,
    pg
}

type UpdateManagedDatabaseType = {
  id?: string,
  plan: string,
  label: string,
}

type DeleteManagedDatabaseType = {
  id?: string,
}

type CreateObjectStorageType = {
  id?: string,
  cluster_id: number,
  tier_id: number,
  label: string,
}

type UpdateObjectStorageType = {
  id?: string,
  label: string,
}

type DeleteObjectStorageType = {
  id?: string,
}

type CreateBlockStorageType = {
  id?: string,
  region: string,
  size_gb: number,
  label: string,
}

type UpdateBlockStorageType = {
  id?: string,
  region: string,
  size_gb: number,
  label: string,
}

type DeleteBlockStorageType = {
  id?: string,
}

type CreateFirewallGroupType = {
  id?: string
  description: string
}

type UpdateFirewallGroupType = {
  id?: string,
  description: string
}

type DeleteFirewallGroupType = {
  id?: string,
}


type CreateFirewallRule = {
  firewall_group_id: string,
  ip_type: string,
  protocol: string,
  port: string,
  subnet: string,
  subnet_size: number,
  notes: string
}

type DeleteFirewallRule = {
  firewall_group_id: string,
  firewall_rule_id: number
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
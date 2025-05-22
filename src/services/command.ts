import { Node } from "reactflow"
import { 
  CreateInstanceType, UpdateInstanceType, DeleteInstanceType,
  CreateManagedDatabaseType, UpdateManagedDatabaseType, DeleteManagedDatabaseType,
  CreateObjectStorageType, UpdateObjectStorageType, DeleteObjectStorageType,
  CreateBlockStorageType, UpdateBlockStorageType, DeleteBlockStorageType,
  CreateFirewallGroupType, UpdateFirewallGroupType, DeleteFirewallGroupType,
  CreateFirewallRule,
  DeleteFirewallRule,
} from "@/types/type"


export const CommandService = {
  createComputeCommand: (node: Node, userId: string) => {
    const createInstance: CreateInstanceType = {
      region: node.data.attribute.region_id,
      plan: node.data.attribute.plan,
      label: node.data.attribute.label,
      os_id: node.data.attribute.os,
      backups: node.data.attribute.auto_backups,
      hostname: userId
    }
    
    return {
      command_name: "CreateInstance",
      position: { x: node.position.x, y: node.position.y },
      data: createInstance
    }
  },

  updateComputeCommand: (node: Node) => {
    let temp_id = node.id
    if(node.id.split('-')[0] === 'instance') {
      temp_id = ''
    }
    const updateInstance: UpdateInstanceType = {
      id: temp_id,
      backups: node.data.attribute.auto_backups,
      firewall_group_id: node.data.attribute.firewall_group_id,
      os_id: node.data.attribute.os_id,
      plan: node.data.attribute.plan,
      ddos_protection: true,
      label: node.data.attribute.label
    }
    return {
      command_name: "UpdateInstance",
      position: { x: node.position.x, y: node.position.y },
      data: updateInstance
    }
  },

  deleteComputeCommand: (node: Node) => {
    let temp_id = node.id
    if(node.id.split('-')[0] === 'instance') {
      temp_id = ''
    }
    const deleteInstance: DeleteInstanceType = {
      id: temp_id,
    }
    return {
      command_name: "DeleteInstance",
      data: deleteInstance
    }
  },

  createDBCommand: (node: Node) => {
    const createManagedDatabase: CreateManagedDatabaseType = {
      database_engine: node.data.attribute.db_engine,
      database_engine_version: node.data.attribute.db_version,
      region: node.data.attribute.region_id,
      plan: node.data.attribute.plan,
      label: node.data.attribute.label,
    }
    
    return {
      command_name: "CreateManagedDatabase",
      position: { x: node.position.x, y: node.position.y },
      data: createManagedDatabase
    }
  },

  updateDBCommand: (node: Node) => {
    let temp_id = node.id
    if(node.id.split('-')[0] === 'database') {
      temp_id = ''
    }
    const updateManagedDatabase: UpdateManagedDatabaseType = {
      id: temp_id,
      plan: node.data.attribute.plan,
      label: node.data.attribute.label
    }
    return {
      command_name: "UpdateManagedDatabase",
      position: { x: node.position.x, y: node.position.y },
      data: updateManagedDatabase
    }
  },

  deleteDBCommand: (node: Node) => {
    let temp_id = node.id
    if(node.id.split('-')[0] === 'database') {
      temp_id = ''
    }
    const deleteManagedDatabase: DeleteManagedDatabaseType = {
      id: temp_id,
    }
    return {
      command_name: "DeleteManagedDatabase",
      data: deleteManagedDatabase
    }
  },

  createObjectCommand: (node: Node) => {
    const createObjectStorage: CreateObjectStorageType = {
      cluster_id: node.data.attribute.cluster_id,
      tier_id: node.data.attribute.tier_id,
      label: node.data.attribute.label,
    }
    
    return {
      command_name: "CreateObjectStorage",
      position: { x: node.position.x, y: node.position.y },
      data: createObjectStorage
    }
  },

  updateObjectCommand: (node: Node) => {
    let temp_id = node.id
    if(node.id.split('-')[0] === 'objectstorage') {
      temp_id = ''
    }
    const updateObjectStorage: UpdateObjectStorageType = {
      id: temp_id,
      label: node.data.attribute.label
    }
    return {
      command_name: "UpdateObjectStorage",
      position: { x: node.position.x, y: node.position.y },
      data: updateObjectStorage
    }
  },

  deleteObjectCommand: (node: Node) => {
    let temp_id = node.id
    if(node.id.split('-')[0] === 'objectstorage') {
      temp_id = ''
    }
    const deleteObjectStorage: DeleteObjectStorageType = {
      id: temp_id,
    }
    return {
      command_name: "DeleteObjectStorage",
      data: deleteObjectStorage
    }
  },

  createBlockCommand: (node: Node) => {
    const createBlockStorage: CreateBlockStorageType = {
      region: node.data.attribute.region_id,
      size_gb: node.data.attribute.size,
      label: node.data.attribute.label,
    }
    
    return {
      command_name: "CreateBlockStorage",
      position: { x: node.position.x, y: node.position.y },
      data: createBlockStorage
    }
  },

  updateBlockCommand: (node: Node) => {
    let temp_id = node.id
    if(node.id.split('-')[0] === 'blockstorage') {
      temp_id = ''
    }
    const updateBlockStorage: UpdateBlockStorageType = {
      id: temp_id,
      region: node.data.attribute.region_id,
      size_gb: node.data.attribute.size,
      label: node.data.attribute.label,
    }
    return {
      command_name: "UpdateBlockStorage",
      position: { x: node.position.x, y: node.position.y },
      data: updateBlockStorage
    }
  },

  deleteBlockCommand: (node: Node) => {
    let temp_id = node.id
    if(node.id.split('-')[0] === 'blockstorage') {
      temp_id = ''
    }
    const deleteBlockStorage: DeleteBlockStorageType = {
      id: temp_id,
    }
    return {
      command_name: "DeleteBlockStorage",
      data: deleteBlockStorage
    }
  },

  attachCommand: (node: Node, attached_to: string) => {
    const attachedTo = {
      id: node.id,
      instance_id: attached_to,
      live: true
    }
    return {
      command_name: "AttachBlockStorageToInstance",
      data: attachedTo
    }
  },

  detachCommand: (node: Node) => {
    const detachFrom = {
      id: node.id,
      live: true
    }
    return {
      command_name: "DetachBlockStorageFromInstance",
      data: detachFrom
    }
  },

  createFirewallCommand: (node: Node) => {
    const createFirewall: CreateFirewallGroupType = {
      description: node.data.attribute.label
    }
    return {
      command_name: "CreateFirewallGroup",
      position: { x: node.position.x, y: node.position.y },
      data: createFirewall
    }
  },

  updateFirewallCommand: (node: Node) => {
    let temp_id = node.id
    if(node.id.split('-')[0] === 'firewall') {
      temp_id = ''
    }
    const updateFirewall: UpdateFirewallGroupType = {
      id: temp_id,
      description: node.data.attribute.label
    }
    return {
      command_name: "UpdateFirewallGroup",
      position: { x: node.position.x, y: node.position.y },
      data: updateFirewall
    }
  },

  deleteFirewallCommand: (node: Node) => {
    let temp_id = node.id
    if(node.id.split('-')[0] === 'firewall') {
      temp_id = ''
    }
    const deleteFirewall: DeleteFirewallGroupType = {
      id: temp_id
    }
    return {
      command_name: "DeleteDirewallGroup",
      data: deleteFirewall
    }
  },

  createRuleCommands: (node: Node) => {
    const rules = node.data.attribute.rules || []
      return rules.map((rule: CreateFirewallRule) => ({
        command_name: "CreateFirewallRule",
        data: {
          fire_wall_group_id: node.id,
          ip_type: rule.ip_type,
          protocol: rule.protocol,
          port: rule.port,
          subent: rule.subent,
          subnet_size: rule.subnet_size,
          notes: rule.notes
        }
    }))
  },
  
  deleteRuleCommand: (node: Node) => {
    const deleteRuel: DeleteFirewallRule = {
      fire_wall_group_id: node.id,
      fire_wall_rule_id: node.data.attribute.rules.rule_id
    }
    return {
      command_name: "DeleteFirewallRule",
      data: deleteRuel
    }
  },

}
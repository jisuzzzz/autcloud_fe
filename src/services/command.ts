import { Node } from "reactflow"
import { 
  CreateInstanceType, UpdateInstanceType, DeleteInstanceType,
  CreateManagedDatabaseType, UpdateManagedDatabaseType, DeleteManagedDatabaseType,
  CreateObjectStorageType, UpdateObjectStorageType, DeleteObjectStorageType,
  CreateBlockStorageType, UpdateBlockStorageType, DeleteBlockStorageType,
  CreateFirewallGroupType, UpdateFirewallGroupType, DeleteFirewallGroupType,
  CreateFirewallRule,
  DeleteFirewallRule,
} from "@/lib/projectDB"


export const CommandService = {
  createComputeCommand: (node: Node, userId: string) => {
    const createInstance: CreateInstanceType = {
      data: {
        region: node.data.spec.region_id,
        plan: node.data.spec.plan,
        label: node.data.spec.label,
        os_id: node.data.spec.os,
        backups: node.data.spec.auto_backups,
        hostname: userId
      }
    }
    
    return {
      command_name: "CreateInstance",
      position: { x: node.position.x, y: node.position.y },
      data: createInstance
    }
  },

  updateComputeCommand: (node: Node) => {
    const updateInstance: UpdateInstanceType = {
      data: {
        id: node.id,
        backups: node.data.spec.auto_backups,
        firewall_group_id: node.data.spec.firewall_group_id,
        os_id: node.data.spec.os_id,
        plan: node.data.spec.plan,
        ddos_protection: true,
        label: node.data.spec.label
      }
    }
    return {
      command_name: "UpdateInstance",
      position: { x: node.position.x, y: node.position.y },
      data: updateInstance
    }
  },

  deleteComputeCommand: (node: Node) => {
    const deleteInstance: DeleteInstanceType = {
      data: {
        id: node.id,
      }
    }
    return {
      command_name: "DeleteInstance",
      data: deleteInstance
    }
  },

  createDBCommand: (node: Node) => {
    const createManagedDatabase: CreateManagedDatabaseType = {
      data: {
        database_engine: node.data.spec.db_engine,
        database_engine_version: node.data.spec.db_version,
        region: node.data.spec.region_id,
        plan: node.data.spec.plan,
        label: node.data.spec.label,
      }
    }
    
    return {
      command_name: "CreateManagedDatabase",
      position: { x: node.position.x, y: node.position.y },
      data: createManagedDatabase
    }
  },

  updateDBCommand: (node: Node) => {
    const updateManagedDatabase: UpdateManagedDatabaseType = {
      data: {
        id: node.id,
        plan: node.data.spec.plan,
        label: node.data.spec.label
      }
    }
    return {
      command_name: "UpdateManagedDatabase",
      position: { x: node.position.x, y: node.position.y },
      data: updateManagedDatabase
    }
  },

  deleteDBCommand: (node: Node) => {
    const deleteManagedDatabase: DeleteManagedDatabaseType = {
      data: {
        id: node.id,
      }
    }
    return {
      command_name: "DeleteManagedDatabase",
      data: deleteManagedDatabase
    }
  },

  createObjectCommand: (node: Node) => {
    const createObjectStorage: CreateObjectStorageType = {
      data: {
        cluster_id: node.data.spec.cluster_id,
        tier_id: node.data.spec.tier_id,
        label: node.data.spec.label,
      }
    }
    
    return {
      command_name: "CreateObjectStorage",
      position: { x: node.position.x, y: node.position.y },
      data: createObjectStorage
    }
  },

  updateObjectCommand: (node: Node) => {
    const updateObjectStorage: UpdateObjectStorageType = {
      data: {
        id: node.id,
        label: node.data.spec.label
      }
    }
    return {
      command_name: "UpdateObjectStorage",
      position: { x: node.position.x, y: node.position.y },
      data: updateObjectStorage
    }
  },

  deleteObjectCommand: (node: Node) => {
    const deleteObjectStorage: DeleteObjectStorageType = {
      data: {
        id: node.id,
      }
    }
    return {
      command_name: "DeleteObjectStorage",
      data: deleteObjectStorage
    }
  },

  createBlockCommand: (node: Node) => {
    const createBlockStorage: CreateBlockStorageType = {
      data: {
        region: node.data.spec.region_id,
        size_gb: node.data.spec.size,
        label: node.data.spec.label,
      }
    }
    
    return {
      command_name: "CreateBlockStorage",
      position: { x: node.position.x, y: node.position.y },
      data: createBlockStorage
    }
  },

  updateBlockCommand: (node: Node) => {
    const updateBlockStorage: UpdateBlockStorageType = {
      data: {
        id: node.id,
        region: node.data.spec.region_id,
        size_gb: node.data.spec.size,
        label: node.data.spec.label,
      }
    }
    return {
      command_name: "UpdateBlockStorage",
      position: { x: node.position.x, y: node.position.y },
      data: updateBlockStorage
    }
  },

  deleteBlockCommand: (node: Node) => {
    const deleteBlockStorage: DeleteBlockStorageType = {
      data: {
        id: node.id,
      }
    }
    return {
      command_name: "DeleteBlockStorage",
      data: deleteBlockStorage
    }
  },

  attachCommand: (node: Node, attached_to: string) => {
    const attachedTo = {
      data: {
        id: node.id,
        instance_id: attached_to,
        live: true
      }
    }
    return {
      command_name: "AttachBlockStorageToInstance",
      data: attachedTo
    }
  },

  detachCommand: (node: Node) => {
    const detachFrom = {
      data: {
        id: node.id,
        live: true
      }
    }
    return {
      command_name: "DetachBlockStorageFromInstance",
      data: detachFrom
    }
  },

  createFirewallCommand: (node: Node) => {
    const createFirewall: CreateFirewallGroupType = {
      data: {
        description: node.data.spec.label
      }
    }
    return {
      command_name: "CreateFirewallGroup",
      position: { x: node.position.x, y: node.position.y },
      data: createFirewall
    }
  },

  updateFirewallCommand: (node: Node) => {
    const updateFirewall: UpdateFirewallGroupType = {
      data: {
        id: node.id,
        description: node.data.spec.label
      }
    }
    return {
      command_name: "UpdateFirewallGroup",
      position: { x: node.position.x, y: node.position.y },
      data: updateFirewall
    }
  },

  deleteFirewallCommand: (node: Node) => {
    const deleteFirewall: DeleteFirewallGroupType = {
      data: {
        id: node.id
      }
    }
    return {
      command_name: "DeleteDirewallGroup",
      data: deleteFirewall
    }
  },

  createRuleCommands: (node: Node) => {
  const rules = node.data.spec.rules || []
    return rules.map((rule: CreateFirewallRule['data']) => ({
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
      data: {
        fire_wall_group_id: node.id,
        fire_wall_rule_id: node.data.spec.rules.rule_id
      }
    }
    return {
      command_name: "DeleteFirewallRule",
      data: deleteRuel
    }
  },

}
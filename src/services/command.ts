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
      id: node.data.uu_id,
      region: node.data.attribute.region_id,
      plan: node.data.attribute.plan,
      label: node.data.attribute.label,
      os_id: node.data.attribute.os_id,
      backups: node.data.attribute.auto_backups,
      hostname: userId
    }
    
    return {
      temp_id: node.id,
      command_name: "CreateCompute",
      position: { x: node.position.x, y: node.position.y },
      data: createInstance
    }
  },

  updateComputeCommand: (node: Node) => {

    const updateInstance: UpdateInstanceType = {
      id: node.data.uu_id ? node.data.uu_id : node.data.id,
      backups: node.data.attribute.auto_backups,
      firewall_group_id: node.data.attribute.firewall_group_id,
      os_id: node.data.attribute.os_id,
      plan: node.data.attribute.plan,
      ddos_protection: true,
      label: node.data.attribute.label
    }
    return {
      temp_id: "",
      command_name: "UpdateCompute",
      position: { x: node.position.x, y: node.position.y },
      data: updateInstance
    }
  },

  deleteComputeCommand: (node: Node) => {
    const deleteInstance: DeleteInstanceType = {
      id: node.data.uu_id ? node.data.uu_id : node.id,
    }
    return {
      temp_id: "",
      command_name: "DeleteCompute",
      position: { x: node.position.x, y: node.position.y },
      data: deleteInstance
    }
  },

  createDBCommand: (node: Node) => {
    const createManagedDatabase: CreateManagedDatabaseType = {
      id: node.data.uu_id,
      database_engine: node.data.attribute.db_engine,
      database_engine_version: node.data.attribute.db_version,
      region: node.data.attribute.region_id,
      plan: node.data.attribute.plan,
      label: node.data.attribute.label,
    }
    
    return {
      temp_id: node.id,
      command_name: "CreateManagedDatabase",
      position: { x: node.position.x, y: node.position.y },
      data: createManagedDatabase
    }
  },

  updateDBCommand: (node: Node) => {
    const updateManagedDatabase: UpdateManagedDatabaseType = {
      id: node.data.uu_id ? node.data.uu_id : node.id,
      plan: node.data.attribute.plan,
      label: node.data.attribute.label
    }
    return {
      temp_id: "",
      command_name: "UpdateManagedDatabase",
      position: { x: node.position.x, y: node.position.y },
      data: updateManagedDatabase
    }
  },

  deleteDBCommand: (node: Node) => {
    const deleteManagedDatabase: DeleteManagedDatabaseType = {
      id: node.data.uu_id ? node.data.uu_id : node.id,
    }
    return {
      temp_id: "",
      command_name: "DeleteManagedDatabase",
      position: { x: node.position.x, y: node.position.y },
      data: deleteManagedDatabase
    }
  },

  createObjectCommand: (node: Node) => {
    const createObjectStorage: CreateObjectStorageType = {
      id: node.data.uu_id ? node.data.uu_id : node.id,
      cluster_id: node.data.attribute.cluster_id,
      tier_id: node.data.attribute.tier_id,
      label: node.data.attribute.label,
    }
    
    return {
      temp_id: "",
      command_name: "CreateObjectStorage",
      position: { x: node.position.x, y: node.position.y },
      data: createObjectStorage
    }
  },

  updateObjectCommand: (node: Node) => {
    const updateObjectStorage: UpdateObjectStorageType = {
      id: node.data.uu_id ? node.data.uu_id : node.id,
      label: node.data.attribute.label
    }
    return {
      temp_id: "",
      command_name: "UpdateObjectStorage",
      position: { x: node.position.x, y: node.position.y },
      data: updateObjectStorage
    }
  },

  deleteObjectCommand: (node: Node) => {
    const deleteObjectStorage: DeleteObjectStorageType = {
      id: node.data.uu_id ? node.data.uu_id : node.id,
    }
    return {
      temp_id: "",
      command_name: "DeleteObjectStorage",
      position: { x: node.position.x, y: node.position.y },
      data: deleteObjectStorage
    }
  },

  createBlockCommand: (node: Node) => {
    const createBlockStorage: CreateBlockStorageType = {
      id: node.data.uu_id ? node.data.uu_id : node.id,
      region: node.data.attribute.region_id,
      size_gb: node.data.attribute.size_gb,
      label: node.data.attribute.label,
    }
    
    return {
      temp_id: "",
      command_name: "CreateBlockStorage",
      position: { x: node.position.x, y: node.position.y },
      data: createBlockStorage
    }
  },

  updateBlockCommand: (node: Node) => {
    const updateBlockStorage: UpdateBlockStorageType = {
      id: node.data.uu_id ? node.data.uu_id : node.id,
      region: node.data.attribute.region_id,
      size_gb: node.data.attribute.size_gb,
      label: node.data.attribute.label,
    }
    return {
      temp_id: "",
      command_name: "UpdateBlockStorage",
      position: { x: node.position.x, y: node.position.y },
      data: updateBlockStorage
    }
  },

  deleteBlockCommand: (node: Node) => {
    const deleteBlockStorage: DeleteBlockStorageType = {
      id: node.data.uu_id ? node.data.uu_id : node.id,
    }
    return {
      temp_id: "",
      command_name: "DeleteBlockStorage",
      position: { x: node.position.x, y: node.position.y },
      data: deleteBlockStorage
    }
  },

  attachCommand: (node: Node, attached_to: string) => {
    const attachedTo = {
      id: node.data.uu_id,
      attached_to_instance: attached_to,
      live: true
    }
    return {
      temp_id: node.id,
      command_name: "AttachBlockStorageToCompute",
      position: { x: node.position.x, y: node.position.y },
      data: attachedTo
    }
  },

  detachCommand: (node: Node) => {
    const detachFrom = {
      id: node.data.uu_id,
      live: true
    }
    return {
      temp_id: node.id,
      command_name: "DetachBlockStorageFromCompute",
      position: { x: node.position.x, y: node.position.y },
      data: detachFrom
    }
  },

  createFirewallCommand: (node: Node) => {
    const createFirewall: CreateFirewallGroupType = {
      id: node.data.uu_id,
      description: node.data.attribute.label
    }
    return {
      temp_id: node.id,
      command_name: "CreateFirewallGroup",
      position: { x: node.position.x, y: node.position.y },
      data: createFirewall
    }
  },

  updateFirewallCommand: (node: Node) => {
    const updateFirewall: UpdateFirewallGroupType = {
      id: node.data.uu_id ? node.data.uu_id : node.id,
      description: node.data.attribute.label
    }
    return {
      temp_id: "",
      command_name: "UpdateFirewallGroup",
      position: { x: node.position.x, y: node.position.y },
      data: updateFirewall
    }
  },

  deleteFirewallCommand: (node: Node) => {
    const deleteFirewall: DeleteFirewallGroupType = {
      id: node.data.uu_id ? node.data.uu_id : node.id,
    }
    return {
      temp_id: node.id,
      command_name: "DeleteDirewallGroup",
      position: { x: node.position.x, y: node.position.y },
      data: deleteFirewall
    }
  },

  createRuleCommands: (node: Node) => {
    const rules = node.data.attribute.rules || []
      return rules.map((rule: CreateFirewallRule) => ({
        temp_id: node.id,
        command_name: "CreateFirewallRule",
        position: { x: node.position.x, y: node.position.y },
        data: {
          firewall_group_id: node.id,
          ip_type: rule.ip_type,
          protocol: rule.protocol,
          port: rule.port,
          subnet: rule.subnet,
          subnet_size: rule.subnet_size,
          notes: rule.notes
        }
    }))
  },
  
  deleteRuleCommand: (node: Node) => {
    const deleteRuel: DeleteFirewallRule = {
      firewall_group_id: node.id,
      firewall_rule_id: node.data.attribute.rules.rule_id
    }
    return {
      command_name: "DeleteFirewallRule",
      data: deleteRuel
    }
  },

}
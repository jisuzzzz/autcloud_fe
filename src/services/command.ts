import { Node } from "reactflow"
import { 
  CreateInstanceType, UpdateInstanceType, DeleteInstanceType,
  CreateManagedDatabaseType, UpdateManagedDatabaseType, DeleteManagedDatabaseType,
  CreateObjectStorageType, UpdateObjectStorageType, DeleteObjectStorageType,
  CreateBlockStorageType, UpdateBlockStorageType, DeleteBlockStorageType,
  CreateFirewallGroupType, UpdateFirewallGroupType, DeleteFirewallGroupType
} from "@/lib/projectDB"


export const CommandService = {
  createComputeCommand: (node: Node, userId: string) => {
    const createInstance: CreateInstanceType = {
      data: {
        region: node.data.spec.region.split(' ')[1].replace(/[()]/g, ''),
        plan: node.data.spec.plan,
        label: node.data.spec.label,
        os_id: node.data.spec.os,
        backups: node.data.spec.auto_backups ? "enabled" : "disabled",
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
        firewall_group_id: "",
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
        database_engine_version: 1,
        region: node.data.spec.region.split(' ')[1].replace(/[()]/g, ''),
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
    const deleteManagedDatabase: DeleteInstanceType = {
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
        cluster_id: 1,
        tier_id: node.data.spec.id,
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
        region: node.data.spec.region.split(' ')[1].replace(/[()]/g, ''),
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
        region: node.data.spec.region.split(' ')[1].replace(/[()]/g, ''),
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

}
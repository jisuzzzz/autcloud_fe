import { ComputeOptions } from "@/options/computeOptions"
import { DatabasePlans } from "@/options/dbOptions"
import { ObjectStorageOptions } from "@/options/objectStorageOptions"
import { OSArray, RegionsArray } from "@/options/resourceOptions"

const mappingRegion = (region_id: string) => {
  const region = RegionsArray.find(r => r.id === region_id)
  if(!region) return
  return region.city
}

const mappingOs = (os_id: string) => {
  const os = OSArray.find(o => String(o.id) === os_id)
  if(!os) return
  return os.name
}

export const AttributeService = {
  getComputeAttribute: (resourceAttribute: any) => {
    const filteredByRegion = ComputeOptions.filter(
      option => option.regions.includes(resourceAttribute.region_id)
    )

    const attribute = filteredByRegion.find(option => option.plan === resourceAttribute.plan)

    return attribute ? {
      plan: resourceAttribute.plan,
      region_id: resourceAttribute.region_id,
      region: mappingRegion(resourceAttribute.region_id),
      status: resourceAttribute.status,
      main_ip: resourceAttribute.main_ip,
      vcpu: attribute.vcpu_count,
      ram: attribute.ram,
      disk: attribute.disk,
      bandwidth: attribute.bandwidth,
      monthly_cost: attribute.monthly_cost,
      disk_type: attribute.disk_type,
      label: resourceAttribute.label,
      os_id: resourceAttribute.os_id,
      os: mappingOs(resourceAttribute.os_id),
      auto_backups: resourceAttribute.auto_backups,
      firewall_group_id: resourceAttribute.firewall_group_id,
    } : undefined
  },

  getDatabaseAttribute: (resourceAttribute: any) => {
    const filteredByRegion = DatabasePlans.filter(
      option => option.regions.includes(resourceAttribute.region_id)
    )
    const attribute = filteredByRegion.find(option => option.plan ===resourceAttribute.plan)
    return attribute ? {
      plan: resourceAttribute.plan,
      region_id: resourceAttribute.region_id,
      region: mappingRegion(resourceAttribute.region_id),
      status: resourceAttribute.status,
      db_engine: resourceAttribute.db_engine,
      db_version: resourceAttribute.db_version,
      vcpu: attribute.attribute.vcpu_count,
      ram: attribute.attribute.ram,
      disk: attribute.attribute.disk,
      monthly_cost: attribute.monthly_cost,
      replica_nodes: attribute.numbers_of_node,
      label: resourceAttribute.label,
      latest_backup: resourceAttribute.latest_backup
    } : undefined
  },

  getObjectStorageAttribute: (resourceAttribute: any) => {
    const filteredByPlan = ObjectStorageOptions.filter(
      option => String(option.tier_id) === String(resourceAttribute.tier_id)
    )
    const attribute = filteredByPlan.find(option => String(option.cluster_id) === String(resourceAttribute.cluster_id))

    return attribute ? {
      cluster_id: resourceAttribute.cluster_id,
      tier_id: resourceAttribute.tier_id,
      region: attribute.city,
      plan: attribute.sales_name,
      price: attribute.price,
      ratelimit_ops_secs: attribute.ratelimit_ops_secs,
      ratelimit_ops_bytes: attribute.ratelimit_ops_bytes,
      disk_gb_price: attribute.disk_gb_price,
      bw_gb_price: attribute.bw_gb_price,
      label: resourceAttribute.label
    } : undefined
  },

  getBlockStorageAttribute: (resourceAttribute: any) => {

    const attribute = {
      region: mappingRegion(resourceAttribute.region_id),
      region_id: resourceAttribute.region_id,
      type: resourceAttribute.type,
      mount_id: resourceAttribute.mount_id,
      attached_to_instance: resourceAttribute.attached_to_instance,
      size_gb: resourceAttribute.size_gb,
      label: resourceAttribute.label
    }

    return attribute ?  attribute : undefined
  },

}

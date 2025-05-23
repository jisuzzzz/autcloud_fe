import { ComputeOptions } from "@/options/computeOptions"
import { DatabasePlans } from "@/options/dbOptions"
import { ObjectStorageOptions } from "@/options/objectStorageOptions"

export function getFilteredOptions(type: string, region_id: string, plan: string): number | undefined {
  switch (type) {
    case 'Compute': {
      const option = ComputeOptions
        .filter(option => option.regions.includes(region_id))
        .find(option => option.plan === plan)
      return option?.monthly_cost
    }

    case 'ManagedDatabase': {
      const option = DatabasePlans
        .filter(option => option.regions.includes(region_id))
        .find(option => option.plan === plan)
      return option?.monthly_cost
    }

    case 'ObjectStorage': {
      const option = ObjectStorageOptions
        .filter(option => option.tier_id === plan)
        .find(option => option.cluster_id === region_id)
      return option ? Number(option.price) : undefined
    }

    default:
      return undefined
  }
}
import { RegionsArray } from '@/options/resourceOptions'

export function getRegionFlag(region_id: string): { flag: string } {
  const region = RegionsArray.find(r => r.id === region_id)

  return {
    flag: region?.flag || '/flag-usa.svg',
  }
}
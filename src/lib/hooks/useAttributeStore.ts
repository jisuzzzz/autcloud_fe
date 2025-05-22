import { useMutation } from "@liveblocks/react/suspense"
import { LiveMap } from "@liveblocks/client"
import { AttributeService } from "@/services/attribute"
import { 
BlockStorageAttributeType, 
ComputeAttributeType, 
DatabaseAttributeType, 
ObjectStorageAttributeType
} from "@/types/type"

export function useAttributeStore() {

  const storeComputeAttribute = useMutation(({ storage }) => {
    const attributeStore= storage.get("attributeStore") as LiveMap<string, any>

    return ({ resourceAttribute, resourceId }: { resourceAttribute: ComputeAttributeType, resourceId: string }) => {
      const id = resourceId
      const attribute = AttributeService.getComputeAttribute(resourceAttribute)
      if (attribute) {
        attributeStore.set(id, attribute)
      }
    }
  }, [])

  const storeDatabaseAttribute = useMutation(({ storage }) => {
    const attributeStore = storage.get("attributeStore") as LiveMap<string, any>

    return ({ resourceAttribute, resourceId }: { resourceAttribute: DatabaseAttributeType, resourceId: string }) => {
      const id = resourceId
      const attribute = AttributeService.getDatabaseAttribute(resourceAttribute)
      if (attribute) {
        attributeStore.set(id, attribute)
      }
    }
  }, [])

  const storeObjectStorageAttribute = useMutation(({ storage }) => {
    const attributeStore = storage.get("attributeStore") as LiveMap<string, any>

    return ({ resourceAttribute, resourceId }: { resourceAttribute: ObjectStorageAttributeType, resourceId:string }) => {
      const id = resourceId
      const attribute = AttributeService.getObjectStorageAttribute(resourceAttribute)
      if (attribute) {
        attributeStore.set(id, attribute)
      }
    }
  }, [])

  const storeBlockStorageAttribute = useMutation(({ storage }) => {
    const attributeStore = storage.get("attributeStore") as LiveMap<string, any>

    return ({ resourceAttribute, resourceId }: { resourceAttribute: BlockStorageAttributeType, resourceId:string }) => {
      const id = resourceId
      const attribute = AttributeService.getBlockStorageAttribute(resourceAttribute)
      if (attribute) {
        attributeStore.set(id, attribute)
      }
    }
  }, [])

  return {
    storeComputeAttribute,
    storeDatabaseAttribute,
    storeObjectStorageAttribute,
    storeBlockStorageAttribute,
  }
}
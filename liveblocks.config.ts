import { LiveMap } from "@liveblocks/client";

declare global {
  interface Liveblocks {
    Presence: {
      selectedNodes?: string[];
      editingNodeId?: string | null;
      presence?: undefined;
    };

    Storage: {
      attributeStore: LiveMap<string, any>;
    };

    UserMeta: {
      id: string;
      info: {
        id: string;
        name: string;
        avatar: string;
        color: string;
        role: string;
      };
    };
  }
}

export {};

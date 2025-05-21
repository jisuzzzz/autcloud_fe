"use client";

import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";
import { ReactNode } from "react";
import { LiveMap } from "@liveblocks/core";
import Loading from "../../custom/panel/loading";

export function Room({ children, projectId }: { children: ReactNode, projectId:string }) {
  const roomId = `proejct-${projectId}`

  return (
    <RoomProvider
      id={roomId}
      initialPresence={{ presence: undefined }}
      initialStorage={{ attributeStore: new LiveMap() }}
    >
      <ClientSideSuspense fallback={<Loading />}>{children}</ClientSideSuspense>
    </RoomProvider>
  );
}
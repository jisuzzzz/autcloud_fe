"use client";

import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";
import { ReactNode, useMemo } from "react";
import { LiveMap } from "@liveblocks/core";
import Loading from "../custom/loading";

export function Room({ children, projectId }: { children: ReactNode, projectId:string }) {
  const roomId = `proejct-${projectId}`

  return (
    <RoomProvider
      id={roomId}
      initialPresence={{ presence: undefined }}
      initialStorage={{ records: new LiveMap() }}
    >
      <ClientSideSuspense fallback={<Loading />}>{children}</ClientSideSuspense>
    </RoomProvider>
  );
}
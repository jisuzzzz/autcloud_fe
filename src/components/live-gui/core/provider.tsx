"use client";

import { LiveblocksProvider } from "@liveblocks/react";
import { PropsWithChildren } from "react";

export function Providers({ children }: PropsWithChildren) {
  return (
    <LiveblocksProvider authEndpoint="/api/auth/live-auth" throttle={16}>
      {children}
    </LiveblocksProvider>
  );
}

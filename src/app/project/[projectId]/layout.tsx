import { Providers } from "@/components/live-gui/core/provider";
import { Suspense } from "react";

export default function LiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <Providers>{children}</Providers>
    </Suspense>
  )
}
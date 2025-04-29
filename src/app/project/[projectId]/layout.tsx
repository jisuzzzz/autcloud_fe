import { Providers } from "@/components/live-gui/provider";
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
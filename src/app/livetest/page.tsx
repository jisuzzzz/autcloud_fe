"use client";
import { Room } from "@/components/live/room";
import { YjsReactFlow } from "@/components/live/yjsRflow";
/**
 * IMPORTANT: LICENSE REQUIRED
 * To use tldraw commercially, you must first purchase a license
 * Learn more: https://tldraw.dev/community/license
 */

export default function Home() {
  return (
    <Room>
      <YjsReactFlow />
    </Room>
  );
}

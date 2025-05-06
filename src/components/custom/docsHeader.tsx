'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DocsHeader() {
  return (
    <header className="w-full bg-[#F6F5FD] py-6 px-6 flex items-center justify-between border-b border-gray-100">
      <h1 className="text-2xl font-bold text-[#7868E6]">AutCloud</h1>
      <nav className="hidden md:flex items-center space-x-20 text-sm text-gray-500">
        <Link href="#">Products</Link>
        <Link href="#">Solutions</Link>
        <Link href="#">Developer</Link>
        <Link href="#">Partner</Link>
        <Link href="#">Pricing</Link>
      </nav>

      <Link href="/auth/signup">
        <Button className="rounded-full bg-[#7868E6] text-white px-6 py-2 text-sm font-medium hover:bg-[#6b5fde]">
          Get started
        </Button>
      </Link>
    </header>
  );
}

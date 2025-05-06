import Link from 'next/link';
import { cn } from '@/lib/utils';
import { LayoutGrid, Folder, ChartPie, Box } from 'lucide-react';

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  active?: boolean;
}

function NavItem({ href, icon, children, active }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-lg',
        active && 'bg-gray-100'
      )}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}

function FolderItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
    >
      <Folder size={16} className="text-gray-500" />
      <span>{children}</span>
    </Link>
  );
}

export default function SideBar() {
  return (
    <div className="w-64 border-r bg-white">
      <div className="p-4">
        <h1 className="text-xl font-bold">AutCloud</h1>
      </div>
      <nav className="space-y-1 px-2">
        <NavItem href="#" icon={<LayoutGrid size={16} />} active>
          All content
        </NavItem>
        <NavItem href="#" icon={<Box size={16} />}>
          Visibility
        </NavItem>
        <NavItem href="#" icon={<ChartPie size={16} />}>
          Analytics
        </NavItem>
        <div className="py-3">
          <div className="px-3 text-xs font-medium uppercase text-gray-500">
            Collections
          </div>
          <div className="mt-2">
            <FolderItem href="#">Product Demos</FolderItem>
            <FolderItem href="#">Case Studies</FolderItem>
            <FolderItem href="#">Sales Collateral</FolderItem>
            <FolderItem href="#">Training Materials</FolderItem>
          </div>
        </div>
      </nav>
    </div>
  );
}

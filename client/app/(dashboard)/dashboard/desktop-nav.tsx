'use client';
import {
  Contact,
  Home,
  LineChart,
  Package,
  Settings,
  Users2,
  ChevronLeft,
  ChevronRight,
  PanelLeft, ShoppingCart
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import Link from 'next/link';
import { useState, memo } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

const NavItem = memo(({ href, label, icon, expanded }: { href: string; label: string; icon: React.ReactNode; expanded: boolean }) => {
  return (
    <Link
      href={href}
      className="flex items-center w-full gap-4 p-2 text-muted-foreground hover:bg-primary hover:text-white rounded-md transition-colors"
    >
      <span className="flex items-center">{icon}</span>
      <span
        className={`text-sm transition-opacity duration-200 ${expanded ? 'opacity-100 delay-150' : 'opacity-0 delay-0'}`}
      >
        {label}
      </span>
    </Link>
  );
});

export function DesktopNav() {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  return (
    <aside
      className={`flex flex-col border-r bg-background transition-[width] duration-300 ${
        expanded ? 'w-48' : 'w-14'
      }`}
    >
      <div className="flex items-center justify-center py-3">
        <button
          onClick={toggleExpanded}
          className="flex items-center justify-center w-10 h-10 text-muted-foreground hover:text-foreground transition-colors"
        >
          {expanded ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          <span className="sr-only">Toggle Sidebar</span>
        </button>
      </div>

      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <NavItem
          href="#"
          label="Dashboard"
          icon={<Home className="h-5 w-5" />}
          expanded={expanded}
        />
        <NavItem
          href="/dashboard/projects"
          label="Projects"
          icon={<Package className="h-5 w-5" />}
          expanded={expanded}
        />
        <NavItem
          href="/dashboard/users"
          label="Users"
          icon={<Users2 className="h-5 w-5" />}
          expanded={expanded}
        />
        <NavItem
          href="/dashboard/customers"
          label="Customers"
          icon={<Contact className="h-5 w-5" />}
          expanded={expanded}
        />
        <NavItem
          href="#"
          label="Analytics"
          icon={<LineChart className="h-5 w-5" />}
          expanded={expanded}
        />
      </nav>

      <div className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
            >
              <Settings className="h-5 w-5" />
              {expanded && <span className="ml-3">Settings</span>}
            </Link>
          </TooltipTrigger>
          {!expanded && <TooltipContent side="right">Settings</TooltipContent>}
        </Tooltip>
      </div>
    </aside>
  );
}


export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="sm:hidden"
        >
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="sm:max-w-xs"
      >
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="#"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground"
          >
            <Package className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">Vercel</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <ShoppingCart className="h-5 w-5" />
            Orders
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-foreground"
          >
            <Package className="h-5 w-5" />
            Products
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Users2 className="h-5 w-5" />
            Customers
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <LineChart className="h-5 w-5" />
            Settings
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export function DashboardBreadcrumb() {
  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="#">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="#">Projects</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>All Projects</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

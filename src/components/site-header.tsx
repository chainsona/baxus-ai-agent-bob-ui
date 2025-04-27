'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Github, Menu, ExternalLink, Home } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close menu when path changes (important for mobile navigation)
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Sponsored links
  const sponsoredLinks = [
    { href: 'https://breakout.maikers.com', label: 'SOLANA BREAKOUT' },
  ];

  // External links data
  const externalLinks = [
    {
      href: 'https://baxus.co',
      label: 'Baxus',
      icon: <Home className="size-4" />,
    },
    {
      href: 'https://github.com/chainsona/baxus-ai-agent-BOB',
      label: 'GitHub',
      icon: <Github className="size-4" />,
    },
  ];

  return (
    <header className="border-b border-border/20 bg-background backdrop-blur-md sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between py-2">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold tracking-tight text-foreground">
              B A <span className="text-primary">X</span> U S
            </span>
            <span className="ml-2 px-2 py-1 bg-primary/10 border border-primary/20 rounded text-xs font-medium text-primary">
              BOB
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-6">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center space-x-6 text-sm font-medium">
              {sponsoredLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    'transition-colors hover:text-primary',
                    pathname === link.href && 'text-primary font-semibold'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="h-4 border-l border-muted-foreground/20" />

            <nav className="flex items-center space-x-6 text-sm font-medium">
              {externalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="transition-colors hover:text-primary flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon && link.icon}
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Menu"
                  className="hover:bg-primary/10"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="bottom"
                className="border-t border-border rounded-t-2xl pt-6 pb-8 h-[80vh] overflow-y-auto"
                style={{ backgroundColor: 'var(--baxus-background, #F8F6F1)' }}
              >
                <SheetHeader className="sr-only">
                  <SheetTitle>Navigation Menu</SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-8 px-2">
                  <Link
                    href="/"
                    className="flex items-center justify-center mt-2 mb-4 transition-transform active:scale-95"
                    onClick={() => setOpen(false)}
                  >
                    <span className="text-2xl font-bold tracking-tight text-foreground">
                      B A <span className="text-primary">X</span> U S
                    </span>
                    <span className="ml-2 px-2 py-1 bg-primary/10 border border-primary/20 rounded text-xs font-medium text-primary">
                      BOB
                    </span>
                  </Link>

                  <div className="space-y-4">
                    <h3 className="text-base font-semibold text-primary px-1 mb-3 uppercase tracking-wide">
                      Sponsored
                    </h3>
                    <nav className="flex flex-col">
                      {sponsoredLinks.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className={cn(
                            'flex items-center gap-2 py-3 px-4 rounded-xl transition-all active:scale-95',
                            pathname === link.href
                              ? 'text-primary font-medium bg-primary/15 shadow-sm'
                              : 'text-foreground hover:bg-primary/5'
                          )}
                          onClick={() => setOpen(false)}
                        >
                          <ExternalLink className="size-5 text-primary/75" />
                          <span>{link.label}</span>
                        </Link>
                      ))}
                    </nav>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-base font-semibold text-primary px-1 mb-3 uppercase tracking-wide">
                      Menu
                    </h3>
                    <nav className="flex flex-col">
                      {externalLinks.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className="flex items-center gap-3 py-3 px-4 rounded-xl transition-all hover:bg-primary/5 active:scale-95"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setOpen(false)}
                        >
                          <span className="bg-primary/15 rounded-full p-2 text-primary">
                            {link.icon || <ExternalLink className="size-4" />}
                          </span>
                          <span>{link.label}</span>
                        </Link>
                      ))}
                    </nav>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

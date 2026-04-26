import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useGame } from '@/contexts/GameContext';

interface AppLayoutProps {
  children: ReactNode;
  showNav?: boolean;
}

export default function AppLayout({ children, showNav = true }: AppLayoutProps) {
  const [location] = useLocation();
  const { profile } = useGame();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { href: '/dashboard', label: 'Inicio', icon: '⚡' },
    { href: '/modules', label: 'Módulos', icon: '🎯' },
    { href: '/profile', label: 'Perfil', icon: '👤' },
    { href: '/about', label: 'Proyecto', icon: 'ℹ️' },
  ];

  const isActive = (href: string) => location === href;

  if (!showNav) return <>{children}</>;

  return (
    <div className="min-h-dvh flex flex-col" style={{ background: 'hsl(222 47% 11%)' }}>
      {/* Top navbar */}
      <header className="sticky top-0 z-50 border-b" style={{
        background: 'hsl(222 50% 9% / 0.95)',
        backdropFilter: 'blur(12px)',
        borderColor: 'hsl(222 30% 22%)',
      }}>
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href="/dashboard">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center relative" style={{
                background: 'linear-gradient(135deg, hsl(186 100% 40%), hsl(258 85% 55%))',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-label="Radar Digital logo">
                  <path d="M3 3v18M3 6l8-3 4 2 6-2v12l-6 2-4-2-8 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="2" fill="white"/>
                </svg>
              </div>
              <div>
                <span className="font-bold text-sm tracking-tight" style={{ color: 'hsl(186 100% 60%)' }}>Radar</span><span className="font-bold text-sm tracking-tight text-white"> Digital</span>
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <Link key={item.href} href={item.href}>
                <div className={`px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition-all ${
                  isActive(item.href) ? 'nav-item-active' : 'text-muted-foreground hover:text-white hover:bg-white/5'
                }`} style={isActive(item.href) ? { color: 'hsl(186 100% 60%)' } : {}}>
                  {item.label}
                </div>
              </Link>
            ))}
          </nav>

          {/* XP badge */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold" style={{
              background: 'hsl(186 100% 50% / 0.1)',
              border: '1px solid hsl(186 100% 50% / 0.2)',
              color: 'hsl(186 100% 60%)',
            }}>
              <span>⚡</span>
              <span>{profile.totalXP} XP</span>
              <span className="opacity-60">·</span>
              <span>Nv. {profile.level}</span>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: 'hsl(215 20% 65%)' }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menú"
              data-testid="button-mobile-menu"
            >
              {menuOpen
                ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
              }
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t px-4 py-3 space-y-1 animate-fade-in" style={{
            background: 'hsl(222 50% 9%)',
            borderColor: 'hsl(222 30% 22%)',
          }}>
            {navItems.map(item => (
              <Link key={item.href} href={item.href}>
                <div
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-all ${
                    isActive(item.href) ? 'nav-item-active' : 'text-muted-foreground'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>


    </div>
  );
}

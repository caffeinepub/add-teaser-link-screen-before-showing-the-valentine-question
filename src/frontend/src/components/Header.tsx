import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

export function Header() {
  const { identity, login, clear, isLoggingIn, loginStatus } = useInternetIdentity();
  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-rose-200/50 dark:border-rose-800/50 bg-white/80 dark:bg-rose-950/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="/assets/generated/valentine-vibes-logo-transparent.dim_200x200.png" 
            alt="Valentine Vibes Logo" 
            className="h-10 w-10 object-contain"
          />
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-red-600 dark:from-rose-400 dark:via-pink-400 dark:to-red-400 bg-clip-text text-transparent">
              Valentine Vibes
            </h1>
            <Heart className="h-5 w-5 text-rose-500 dark:text-rose-400 fill-rose-500 dark:fill-rose-400 animate-pulse" />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground hidden sm:inline">
                Connected
              </span>
              <Button 
                onClick={clear} 
                variant="outline"
                className="border-rose-300 dark:border-rose-700 hover:bg-rose-50 dark:hover:bg-rose-900"
              >
                Disconnect
              </Button>
            </div>
          ) : (
            <Button 
              onClick={login} 
              disabled={isLoggingIn || loginStatus === 'initializing'}
              className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white"
            >
              {isLoggingIn ? 'Connecting...' : 'Connect'}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-rose-200/50 dark:border-rose-800/50 bg-white/50 dark:bg-rose-950/50 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            © 2025. Built with{' '}
            <Heart className="h-4 w-4 text-rose-500 dark:text-rose-400 fill-rose-500 dark:fill-rose-400 inline animate-pulse" />
            {' '}using{' '}
            <a 
              href="https://caffeine.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 font-medium transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

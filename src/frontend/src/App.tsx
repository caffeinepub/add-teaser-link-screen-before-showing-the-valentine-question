import { Header } from './components/Header';
import { ValentineProposal } from './components/ValentineProposal';
import { Footer } from './components/Footer';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 dark:from-rose-950 dark:via-pink-950 dark:to-red-950">
        <Header />
        <main className="flex-1">
          <ValentineProposal />
        </main>
        <Footer />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Sparkles } from 'lucide-react';
import { ShareSection } from './ShareSection';

const NO_MESSAGES = [
  "Are you sure?",
  "Maybe try again?",
  "Come on, give me a chance 😜",
  "Please reconsider! 🥺",
  "Don't break my heart! 💔",
  "Think about it... 💭",
  "You know you want to! 😊",
  "Pretty please? 🙏",
];

export function ValentineProposal() {
  const [revealed, setRevealed] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [noClickCount, setNoClickCount] = useState(0);
  const [noMessage, setNoMessage] = useState("No");
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isNoButtonMoving, setIsNoButtonMoving] = useState(false);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Shuffle and get a random message
  const getRandomNoMessage = () => {
    const randomIndex = Math.floor(Math.random() * NO_MESSAGES.length);
    return NO_MESSAGES[randomIndex];
  };

  const handleYesClick = () => {
    setAccepted(true);
    // Create heart animation effect
    const hearts = document.createElement('div');
    hearts.className = 'fixed inset-0 pointer-events-none z-50';
    hearts.innerHTML = Array(20).fill(0).map((_, i) => 
      `<div class="absolute animate-float-up" style="left: ${Math.random() * 100}%; animation-delay: ${i * 0.1}s;">❤️</div>`
    ).join('');
    document.body.appendChild(hearts);
    setTimeout(() => hearts.remove(), 3000);
  };

  const moveNoButton = () => {
    if (!containerRef.current || !noButtonRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();
    
    // Calculate safe boundaries
    const maxX = container.width - button.width - 40;
    const maxY = container.height - button.height - 40;
    
    // Generate random position
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    setNoButtonPosition({ x: newX, y: newY });
  };

  const handleNoClick = () => {
    const newCount = noClickCount + 1;
    setNoClickCount(newCount);
    setNoMessage(getRandomNoMessage());

    // After 3 clicks, start moving the button
    if (newCount >= 3) {
      setIsNoButtonMoving(true);
      moveNoButton();
    }
  };

  const handleNoHover = () => {
    // After 5 clicks, move button on hover too
    if (noClickCount >= 5 && isNoButtonMoving) {
      moveNoButton();
    }
  };

  // Add floating animation styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float-up {
        0% {
          transform: translateY(0) scale(1);
          opacity: 1;
        }
        100% {
          transform: translateY(-100vh) scale(1.5);
          opacity: 0;
        }
      }
      .animate-float-up {
        animation: float-up 3s ease-out forwards;
        font-size: 2rem;
      }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  // Initial teaser screen
  if (!revealed) {
    return (
      <section className="container mx-auto px-4 py-12 md:py-20 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-center space-y-8 animate-in fade-in duration-700">
          <div className="flex justify-center mb-6">
            <Heart className="h-24 w-24 text-rose-500 dark:text-rose-400 fill-rose-500 dark:fill-rose-400 animate-pulse" />
          </div>
          
          <Button
            onClick={() => setRevealed(true)}
            size="lg"
            variant="link"
            className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-rose-600 via-pink-600 to-red-600 dark:from-rose-400 dark:via-pink-400 dark:to-red-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 underline decoration-rose-400 dark:decoration-rose-500 underline-offset-8 h-auto py-4"
          >
            Click here for a surprise
          </Button>
        </div>
      </section>
    );
  }

  if (accepted) {
    return (
      <section className="container mx-auto px-4 py-12 md:py-20 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Card className="max-w-2xl w-full border-rose-300 dark:border-rose-700 shadow-2xl bg-white/90 dark:bg-rose-950/90 backdrop-blur-sm animate-in fade-in zoom-in duration-500">
          <CardContent className="pt-12 pb-12 text-center space-y-6">
            <div className="flex justify-center gap-2 mb-4">
              <Heart className="h-16 w-16 text-rose-500 dark:text-rose-400 fill-rose-500 dark:fill-rose-400 animate-pulse" />
              <Sparkles className="h-16 w-16 text-pink-500 dark:text-pink-400 animate-pulse" />
              <Heart className="h-16 w-16 text-rose-500 dark:text-rose-400 fill-rose-500 dark:fill-rose-400 animate-pulse" />
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-red-600 dark:from-rose-400 dark:via-pink-400 dark:to-red-400 bg-clip-text text-transparent animate-pulse">
              Yay! You're my Valentine 💞
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground">
              I knew you'd say yes! 🥰
            </p>
            
            <div className="pt-6 flex justify-center gap-3">
              {['❤️', '💕', '💖', '💗', '💝', '💘'].map((emoji, i) => (
                <span 
                  key={i} 
                  className="text-4xl animate-bounce" 
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {emoji}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section 
      ref={containerRef}
      className="container mx-auto px-4 py-12 md:py-20 flex flex-col items-center justify-center min-h-[calc(100vh-200px)] relative gap-8"
    >
      <Card className="max-w-2xl w-full border-rose-300 dark:border-rose-700 shadow-2xl bg-white/90 dark:bg-rose-950/90 backdrop-blur-sm animate-in fade-in zoom-in duration-500">
        <CardContent className="pt-12 pb-12 text-center space-y-8">
          <div className="flex justify-center mb-6">
            <Heart className="h-20 w-20 text-rose-500 dark:text-rose-400 fill-rose-500 dark:fill-rose-400 animate-pulse" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-red-600 dark:from-rose-400 dark:via-pink-400 dark:to-red-400 bg-clip-text text-transparent">
            Will you be my Valentine, Keya?
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto">
            I've been thinking about this for a while... 💭
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 relative min-h-[80px]">
            <Button
              onClick={handleYesClick}
              size="lg"
              className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white text-xl px-12 py-6 h-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <Heart className="mr-2 h-6 w-6 fill-white" />
              Yes! 💕
            </Button>
            
            <Button
              ref={noButtonRef}
              onClick={handleNoClick}
              onMouseEnter={handleNoHover}
              variant="outline"
              size="lg"
              className={`border-rose-300 dark:border-rose-700 hover:bg-rose-50 dark:hover:bg-rose-900 text-xl px-12 py-6 h-auto transition-all duration-300 ${
                isNoButtonMoving ? 'absolute' : ''
              }`}
              style={isNoButtonMoving ? {
                left: `${noButtonPosition.x}px`,
                top: `${noButtonPosition.y}px`,
                transition: 'all 0.3s ease-out'
              } : {}}
            >
              {noMessage}
            </Button>
          </div>
          
          {noClickCount > 0 && (
            <p className="text-sm text-muted-foreground italic animate-pulse">
              {noClickCount >= 5 
                ? "The button is getting shy! 🙈" 
                : noClickCount >= 3 
                ? "Oops, the button is running away! 😅"
                : "Think carefully... 🤔"}
            </p>
          )}
        </CardContent>
      </Card>
      
      <ShareSection />
    </section>
  );
}

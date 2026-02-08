import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link, Copy, Check } from 'lucide-react';

export function ShareSection() {
  const [linkCopied, setLinkCopied] = useState(false);
  const [messageCopied, setMessageCopied] = useState(false);

  const handleCopyLink = async () => {
    const url = window.location.href;
    
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleCopyMessage = async () => {
    const url = window.location.href;
    const message = `Hey Keya, click here for a surprise! 💕\n${url}`;
    
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(message);
        setMessageCopied(true);
        setTimeout(() => setMessageCopied(false), 2000);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = message;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setMessageCopied(true);
        setTimeout(() => setMessageCopied(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy message:', err);
    }
  };

  return (
    <Card className="max-w-md w-full border-rose-200 dark:border-rose-800 bg-white/80 dark:bg-rose-950/80 backdrop-blur-sm">
      <CardContent className="pt-6 pb-6">
        <h3 className="text-lg font-semibold text-center mb-4 text-rose-900 dark:text-rose-100">
          Share this with Keya
        </h3>
        <div className="flex flex-col gap-3">
          <Button
            onClick={handleCopyLink}
            variant="outline"
            className="w-full border-rose-300 dark:border-rose-700 hover:bg-rose-50 dark:hover:bg-rose-900"
          >
            {linkCopied ? (
              <>
                <Check className="mr-2 h-4 w-4 text-green-600 dark:text-green-400" />
                Link Copied!
              </>
            ) : (
              <>
                <Link className="mr-2 h-4 w-4" />
                Copy Link
              </>
            )}
          </Button>
          
          <Button
            onClick={handleCopyMessage}
            variant="outline"
            className="w-full border-rose-300 dark:border-rose-700 hover:bg-rose-50 dark:hover:bg-rose-900"
          >
            {messageCopied ? (
              <>
                <Check className="mr-2 h-4 w-4 text-green-600 dark:text-green-400" />
                Message Copied!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy Message
              </>
            )}
          </Button>
        </div>
        {(linkCopied || messageCopied) && (
          <p className="text-sm text-center mt-3 text-green-600 dark:text-green-400 animate-pulse">
            ✓ Copied to clipboard!
          </p>
        )}
      </CardContent>
    </Card>
  );
}

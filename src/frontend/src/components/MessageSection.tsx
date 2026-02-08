import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Heart, Send, Sparkles, MessageCircleHeart } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useAddMessage, useGetMessage, useGetMessageCount } from '../hooks/useQueries';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

export function MessageSection() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();
  const [message, setMessage] = useState('');
  
  const { data: userMessage, isLoading: isLoadingMessage } = useGetMessage();
  const { data: messageCount, isLoading: isLoadingCount } = useGetMessageCount();
  const addMessageMutation = useAddMessage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast.error('Please write a message');
      return;
    }

    if (!isAuthenticated) {
      toast.error('Please connect your identity first');
      return;
    }

    try {
      await addMessageMutation.mutateAsync(message);
      toast.success('Your message has been saved! 💕');
      setMessage('');
    } catch (error) {
      toast.error('Failed to save message. Please try again.');
      console.error('Error saving message:', error);
    }
  };

  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Stats Card */}
        <Card className="border-rose-200 dark:border-rose-800 bg-white/50 dark:bg-rose-950/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center gap-3">
              <MessageCircleHeart className="h-8 w-8 text-rose-500 dark:text-rose-400" />
              <div className="text-center">
                <p className="text-3xl font-bold text-rose-600 dark:text-rose-400">
                  {isLoadingCount ? (
                    <Skeleton className="h-9 w-16 inline-block" />
                  ) : (
                    messageCount?.toString() || '0'
                  )}
                </p>
                <p className="text-sm text-muted-foreground">
                  {messageCount === 1n ? 'Love Message' : 'Love Messages'} Shared
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Message Form */}
        <Card className="border-rose-200 dark:border-rose-800 shadow-xl">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-rose-500 dark:text-rose-400 fill-rose-500 dark:fill-rose-400" />
              <CardTitle className="text-2xl bg-gradient-to-r from-rose-600 to-pink-600 dark:from-rose-400 dark:to-pink-400 bg-clip-text text-transparent">
                Your Love Message
              </CardTitle>
            </div>
            <CardDescription>
              {isAuthenticated 
                ? 'Share your heartfelt message with the world' 
                : 'Connect your identity to share a message'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="message" className="text-base font-medium">
                  Your Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Write something sweet and romantic..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={!isAuthenticated || addMessageMutation.isPending}
                  className="min-h-[150px] resize-none border-rose-200 dark:border-rose-800 focus-visible:ring-rose-500 dark:focus-visible:ring-rose-400"
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={!isAuthenticated || addMessageMutation.isPending || !message.trim()}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white"
              >
                {addMessageMutation.isPending ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                    Sending Love...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Display User's Message */}
        {isAuthenticated && (
          <Card className="border-rose-200 dark:border-rose-800 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/50 dark:to-pink-950/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-rose-500 dark:text-rose-400" />
                <CardTitle className="text-xl">Your Saved Message</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {isLoadingMessage ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ) : userMessage ? (
                <div className="bg-white dark:bg-rose-900/30 rounded-lg p-4 border border-rose-200 dark:border-rose-800">
                  <p className="text-foreground whitespace-pre-wrap">{userMessage}</p>
                </div>
              ) : (
                <p className="text-muted-foreground italic">
                  You haven't saved a message yet. Share your feelings above! 💕
                </p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}

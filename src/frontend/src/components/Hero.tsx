export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <img 
            src="/assets/generated/valentine-hero-banner.dim_800x400.png" 
            alt="Valentine Vibes Hero" 
            className="w-full h-[300px] md:h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-end">
            <div className="p-6 md:p-10 text-white">
              <h2 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-lg">
                Share Your Love
              </h2>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl drop-shadow-md">
                Express your feelings and spread the love this Valentine's Day. 
                Connect your identity and leave a heartfelt message.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

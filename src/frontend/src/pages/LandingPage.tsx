import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Film, Sparkles, Mic, Music, Volume2, FileText, ArrowRight, Clock } from 'lucide-react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

export default function LandingPage() {
  const { identity, login } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const features = [
    {
      icon: FileText,
      title: 'AI Script Writing',
      description: 'Generate professional scripts with customizable tone, pacing, and narrative structure',
      image: '/assets/generated/script-icon.dim_128x128.png',
    },
    {
      icon: Mic,
      title: 'Professional Voiceover',
      description: 'High-quality narration with multiple voices, accents, and tones to choose from',
      image: '/assets/generated/voiceover-icon.dim_128x128.png',
    },
    {
      icon: Volume2,
      title: 'Sound Effects Library',
      description: 'Extensive collection of cinematic sound effects to enhance your video',
      image: '/assets/generated/sound-icon.dim_128x128.png',
    },
    {
      icon: Music,
      title: 'Music Integration',
      description: 'Curated background music tracks categorized by mood, genre, and tempo',
      image: '/assets/generated/music-icon.dim_128x128.png',
    },
    {
      icon: Film,
      title: 'Sora Video Generation',
      description: 'State-of-the-art AI video generation powered by Sora technology',
      image: '/assets/generated/video-icon.dim_128x128.png',
    },
    {
      icon: Sparkles,
      title: 'Cinematic Quality',
      description: 'Professional-grade output with seamless integration of all elements',
      image: '/assets/generated/video-icon.dim_128x128.png',
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(/assets/generated/hero-banner.dim_1920x600.png)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="container mx-auto px-6 py-24 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/20 text-teal text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Powered by Sora AI Technology
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground leading-tight">
              Create Cinematic Videos with{' '}
              <span className="bg-gradient-to-r from-teal to-gold bg-clip-text text-transparent">AI Magic</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Generate professional-quality videos up to 15 minutes long with AI-powered script writing, voiceover,
              sound effects, and music integration.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              {isAuthenticated ? (
                <Link to="/create">
                  <Button size="lg" className="gap-2 text-lg px-8 py-6 bg-gradient-to-r from-teal to-gold hover:opacity-90">
                    Start Creating
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              ) : (
                <Button
                  size="lg"
                  onClick={login}
                  className="gap-2 text-lg px-8 py-6 bg-gradient-to-r from-teal to-gold hover:opacity-90"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Button>
              )}
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-5 h-5" />
                <span className="text-sm font-medium">Up to 15 minutes per video</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Everything You Need</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A complete suite of AI-powered tools to bring your cinematic vision to life
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur-sm"
            >
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-teal/20 to-gold/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-teal" />
                </div>
                <h3 className="text-xl font-serif font-bold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-24">
        <Card className="bg-gradient-to-br from-teal/10 via-background to-gold/10 border-teal/20">
          <CardContent className="p-12 md:p-16 text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
              Ready to Create Your Masterpiece?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join creators worldwide using AI to produce stunning cinematic content
            </p>
            {isAuthenticated ? (
              <Link to="/create">
                <Button size="lg" className="gap-2 text-lg px-8 py-6 bg-gradient-to-r from-teal to-gold hover:opacity-90">
                  Start Your First Project
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            ) : (
              <Button
                size="lg"
                onClick={login}
                className="gap-2 text-lg px-8 py-6 bg-gradient-to-r from-teal to-gold hover:opacity-90"
              >
                Get Started Now
                <ArrowRight className="w-5 h-5" />
              </Button>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

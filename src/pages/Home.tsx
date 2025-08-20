import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Package, Users, Shield, Clock, Zap } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: MapPin,
      title: 'Smart Hub Network',
      description: 'Find the nearest community hub for convenient package pickup and delivery.'
    },
    {
      icon: Package,
      title: 'Secure Storage',
      description: 'Your packages are safe with our QR-verified secure storage system.'
    },
    {
      icon: Users,
      title: 'Community Powered',
      description: 'Local businesses and neighbors helping create efficient delivery solutions.'
    },
    {
      icon: Shield,
      title: 'Verified Partners',
      description: 'All hub partners are verified and maintain high security standards.'
    },
    {
      icon: Clock,
      title: '24/7 Access',
      description: 'Many hubs offer extended hours for maximum convenience.'
    },
    {
      icon: Zap,
      title: 'AI Optimized',
      description: 'Smart recommendations for the best delivery locations based on your needs.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/10 py-20">
        <div className="container text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
            Community-Powered
            <br />
            <span className="text-primary">Last-Mile Delivery</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Connect with local hubs in your neighborhood for convenient package pickup and delivery. 
            Skip the missed deliveries and long waits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg">
              <Link to="/hubs">Find Nearby Hubs</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg">
              <Link to="/register-hub">Become a Hub</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Community Drop?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're revolutionizing last-mile delivery by connecting communities and creating 
              convenient, secure pickup points everywhere.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Simple steps to get your packages delivered conveniently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold">Choose a Hub</h3>
              <p className="text-muted-foreground">
                Select a convenient pickup location near you using our interactive map.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold">Package Delivery</h3>
              <p className="text-muted-foreground">
                Your package is securely delivered to the hub with QR code verification.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold">Easy Pickup</h3>
              <p className="text-muted-foreground">
                Get notified and pick up your package at your convenience with QR scanning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Join the Community?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Whether you need a pickup location or want to become a hub partner, 
            we're here to make delivery simple and convenient.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="secondary" size="lg" className="text-lg">
              <Link to="/hubs">Start Using Hubs</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link to="/register-hub">Partner With Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
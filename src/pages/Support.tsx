import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  Clock, 
  HelpCircle, 
  Package, 
  MapPin, 
  Shield,
  Users,
  Send,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Support = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent Successfully",
        description: "We'll get back to you within 24 hours.",
      });
      setContactForm({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'general'
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const faqItems = [
    {
      question: "How does Community Drop work?",
      answer: "Community Drop connects you with local hubs where you can have packages delivered when you're not home. Simply choose a nearby hub during checkout, and pick up your package at your convenience."
    },
    {
      question: "How do I find hubs near me?",
      answer: "Use our hub finder on the 'Find Hubs' page. You can search by address or use your current location to see all available hubs with their operating hours and capacity."
    },
    {
      question: "Is my package secure at the hub?",
      answer: "Yes! All hubs are verified partners with secure storage areas. Packages are tracked with QR codes and require verification for pickup. We also provide full insurance coverage."
    },
    {
      question: "How long can I leave my package at a hub?",
      answer: "Packages can typically be stored for up to 7 days. You'll receive notifications when your package arrives and reminders before the storage period expires."
    },
    {
      question: "What if I can't find my QR code?",
      answer: "You can retrieve your QR code from the tracking page using your tracking number. If you still have issues, contact the hub directly or use our support chat."
    },
    {
      question: "How do I become a hub partner?",
      answer: "Visit our 'Become a Hub' page to fill out an application. We'll review your location and setup, then provide training and equipment to get you started."
    },
    {
      question: "What are the fees for using Community Drop?",
      answer: "Community Drop is completely free for customers! There are no additional fees beyond standard shipping costs from retailers."
    },
    {
      question: "Can I track my package in real-time?",
      answer: "Yes! Use our tracking page or scan QR codes to get real-time updates on your package location and status."
    }
  ];

  const supportCategories = [
    {
      title: "Package Tracking",
      description: "Track packages, QR codes, pickup issues",
      icon: Package,
      color: "bg-blue-100 text-blue-700"
    },
    {
      title: "Hub Locations",
      description: "Find hubs, operating hours, directions",
      icon: MapPin,
      color: "bg-green-100 text-green-700"
    },
    {
      title: "Account & Security",
      description: "Login issues, account settings, security",
      icon: Shield,
      color: "bg-purple-100 text-purple-700"
    },
    {
      title: "Partner Support",
      description: "Hub management, earnings, partner tools",
      icon: Users,
      color: "bg-orange-100 text-orange-700"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <HelpCircle className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4">Help & Support</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get help with Community Drop services. Find answers to common questions or reach out to our support team.
          </p>
        </div>

        <Tabs defaultValue="faq" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="contact">Contact Us</TabsTrigger>
            <TabsTrigger value="categories">Help Topics</TabsTrigger>
            <TabsTrigger value="status">Service Status</TabsTrigger>
          </TabsList>

          {/* FAQ Tab */}
          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                        required
                      />
                    </div>
                    
                    <Button type="submit" disabled={isSubmitting} className="w-full">
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Get in Touch</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <MessageCircle className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Live Chat</p>
                        <p className="text-sm text-muted-foreground">
                          Available 24/7 via the chat widget
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">support@communitydrop.com</p>
                        <p className="text-sm text-muted-foreground">
                          Response within 24 hours
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">1-800-DROP-HUB</p>
                        <p className="text-sm text-muted-foreground">
                          Mon-Fri 9AM-6PM EST
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Support Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Live Chat</span>
                        <span className="text-success font-medium">24/7</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Phone Support</span>
                        <span>Mon-Fri 9AM-6PM EST</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Email Support</span>
                        <span>24-48 hour response</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Help Categories Tab */}
          <TabsContent value="categories">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {supportCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${category.color}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">{category.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {category.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Service Status Tab */}
          <TabsContent value="status">
            <Card>
              <CardHeader>
                <CardTitle>Service Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <div>
                        <p className="font-medium">Hub Network</p>
                        <p className="text-sm text-muted-foreground">All systems operational</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-success text-success-foreground">
                      Operational
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <div>
                        <p className="font-medium">Package Tracking</p>
                        <p className="text-sm text-muted-foreground">Real-time updates available</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-success text-success-foreground">
                      Operational
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <div>
                        <p className="font-medium">QR Code System</p>
                        <p className="text-sm text-muted-foreground">Scanning and generation working</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-success text-success-foreground">
                      Operational
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-success" />
                      <div>
                        <p className="font-medium">Partner Dashboard</p>
                        <p className="text-sm text-muted-foreground">Hub management tools active</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-success text-success-foreground">
                      Operational
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Support;
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Bot, User, X, MapPin, Package, Clock } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const Chatbot = ({ isOpen, onClose }: ChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hi! I\'m your Community Drop assistant. I can help you find nearby hubs, track packages, or answer questions about our service. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
      suggestions: ['Find nearby hubs', 'Track my package', 'How does it work?', 'Become a hub partner']
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const getBotResponse = (userMessage: string): { content: string; suggestions?: string[] } => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hub') && (message.includes('find') || message.includes('nearby') || message.includes('locate'))) {
      return {
        content: 'I can help you find nearby hubs! Based on your location, here are some options:\n\n📍 Downtown Mini Mart (0.3 miles) - Open 7AM-11PM\n📍 Community Warehouse (1.2 miles) - Open 6AM-10PM\n📍 Sarah\'s Home Hub (0.8 miles) - Open 9AM-6PM\n\nWould you like directions to any of these locations?',
        suggestions: ['Get directions', 'Check hub capacity', 'See operating hours']
      };
    }
    
    if (message.includes('track') || message.includes('package')) {
      return {
        content: 'To track your package, I\'ll need your tracking number. You can find it in your confirmation email or text message.\n\nAlternatively, you can scan the QR code on your pickup notification. Would you like me to guide you through the QR scanning process?',
        suggestions: ['Enter tracking number', 'Scan QR code', 'Package status']
      };
    }
    
    if (message.includes('how') && message.includes('work')) {
      return {
        content: 'Here\'s how Community Drop works:\n\n1️⃣ Choose a nearby hub when placing an order\n2️⃣ Your package is delivered to the secure hub\n3️⃣ You get a notification with QR code\n4️⃣ Visit the hub and scan QR to pick up\n\nIt\'s that simple! Any specific questions about the process?',
        suggestions: ['Security features', 'Pickup process', 'Hub locations']
      };
    }
    
    if (message.includes('partner') || message.includes('become') || message.includes('register')) {
      return {
        content: 'Great! Becoming a hub partner is a fantastic way to earn extra income. Here\'s what you need to know:\n\n✅ Earn money for each package stored\n✅ Set your own operating hours\n✅ Full insurance coverage included\n✅ Easy setup process\n\nWould you like me to guide you through the registration process?',
        suggestions: ['Start registration', 'Partner benefits', 'Requirements']
      };
    }
    
    if (message.includes('qr') || message.includes('scan')) {
      return {
        content: 'Our QR system ensures secure package pickup:\n\n📱 You receive a unique QR code via email/SMS\n🔒 Present code at the hub for verification\n📦 Hub partner scans to release your package\n✅ Transaction is logged for security\n\nDo you need help with scanning or have issues with your QR code?',
        suggestions: ['QR code issues', 'Pickup process', 'Contact hub']
      };
    }
    
    if (message.includes('hours') || message.includes('time') || message.includes('open')) {
      return {
        content: 'Hub operating hours vary by location:\n\n🏪 Retail hubs: Usually 7AM-11PM\n🏭 Warehouses: Typically 6AM-10PM\n🏠 Home hubs: Often 9AM-6PM\n\nMany hubs offer after-hours pickup with advance notice. Would you like specific hours for a particular hub?',
        suggestions: ['Find hub hours', 'After-hours pickup', 'Weekend availability']
      };
    }
    
    if (message.includes('cost') || message.includes('price') || message.includes('fee')) {
      return {
        content: 'Community Drop is free for customers! 🎉\n\nThere are no additional fees for using our hub network. You only pay the standard shipping costs from the retailer. Hub partners earn a small fee from us for each package handled.\n\nWant to know more about our service?',
        suggestions: ['Hub partner earnings', 'Premium features', 'Business accounts']
      };
    }
    
    // Default response
    return {
      content: 'I\'m here to help with Community Drop services! I can assist with:\n\n🗺️ Finding nearby hubs\n📦 Package tracking\n🤝 Hub partnership info\n🔒 QR code assistance\n❓ General questions\n\nWhat would you like to know more about?',
      suggestions: ['Find hubs', 'Track package', 'Become partner', 'Contact support']
    };
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = getBotResponse(content);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: response.suggestions
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md h-[600px] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Bot className="h-4 w-4 text-primary-foreground" />
            </div>
            <CardTitle className="text-lg">Community Drop Assistant</CardTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col space-y-4">
          <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user' ? 'bg-primary' : 'bg-muted'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="h-4 w-4 text-primary-foreground" />
                      ) : (
                        <Bot className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className={`rounded-lg p-3 ${
                        message.sender === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                      </div>
                      {message.suggestions && (
                        <div className="flex flex-wrap gap-1">
                          {message.suggestions.map((suggestion, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="cursor-pointer hover:bg-primary hover:text-primary-foreground text-xs"
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              {suggestion}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={!inputValue.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chatbot;
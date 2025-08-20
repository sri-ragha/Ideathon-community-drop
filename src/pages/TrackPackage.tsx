import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Search, Package, MapPin, Clock, CheckCircle, QrCode } from 'lucide-react';
import QRScanner from '@/components/tracking/QRScanner';

interface PackageStatus {
  id: string;
  status: 'in-transit' | 'at-hub' | 'ready-pickup' | 'delivered';
  location: string;
  timestamp: string;
  description: string;
}

interface TrackingInfo {
  trackingNumber: string;
  recipient: string;
  hubName: string;
  hubAddress: string;
  estimatedPickup: string;
  qrCode: string;
  statusHistory: PackageStatus[];
}

const TrackPackage = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);

  // Check for code parameter in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      setTrackingNumber(code);
      // Auto-track if code is provided
      setTimeout(() => {
        const info = mockTrackingData[code];
        setTrackingInfo(info || null);
      }, 500);
    }
  }, []);

  // Mock tracking data
  const mockTrackingData: Record<string, TrackingInfo> = {
    'CD123456789': {
      trackingNumber: 'CD123456789',
      recipient: 'John Doe',
      hubName: 'Downtown Mini Mart',
      hubAddress: '123 Main St, Downtown',
      estimatedPickup: '2024-01-20T14:00:00Z',
      qrCode: 'CD123456789-QR',
      statusHistory: [
        {
          id: '1',
          status: 'ready-pickup',
          location: 'Downtown Mini Mart',
          timestamp: '2024-01-20T10:30:00Z',
          description: 'Package ready for pickup at hub'
        },
        {
          id: '2',
          status: 'at-hub',
          location: 'Downtown Mini Mart',
          timestamp: '2024-01-20T09:15:00Z',
          description: 'Package delivered to hub'
        },
        {
          id: '3',
          status: 'in-transit',
          location: 'Sorting Center',
          timestamp: '2024-01-19T16:45:00Z',
          description: 'Package in transit to hub'
        }
      ]
    }
  };

  const handleTrack = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const info = mockTrackingData[trackingNumber];
      setTrackingInfo(info || null);
      setLoading(false);
    }, 1000);
  };

  const handleQRResult = (result: string) => {
    setTrackingNumber(result);
    setShowQRScanner(false);
    // Auto-track after QR scan
    setTimeout(() => handleTrack(), 500);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'ready-pickup':
        return <Package className="h-4 w-4 text-primary" />;
      case 'at-hub':
        return <MapPin className="h-4 w-4 text-warning" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-success text-success-foreground';
      case 'ready-pickup':
        return 'bg-primary text-primary-foreground';
      case 'at-hub':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Track Your Package</h1>
          <p className="text-muted-foreground">
            Enter your tracking number or scan the QR code to track your package
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Track Package
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Enter tracking number (try: CD123456789)"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="flex-1"
              />
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setShowQRScanner(true)}
              >
                <QrCode className="h-4 w-4" />
              </Button>
              <Button onClick={handleTrack} disabled={!trackingNumber || loading}>
                {loading ? 'Tracking...' : 'Track'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {showQRScanner && (
          <QRScanner
            onResult={handleQRResult}
            onClose={() => setShowQRScanner(false)}
          />
        )}

        {trackingInfo && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Package Details</span>
                  <Badge className={getStatusColor(trackingInfo.statusHistory[0].status)}>
                    {trackingInfo.statusHistory[0].status.replace('-', ' ').toUpperCase()}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Tracking Number</p>
                    <p className="font-mono">{trackingInfo.trackingNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Recipient</p>
                    <p>{trackingInfo.recipient}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Hub Location</p>
                    <p>{trackingInfo.hubName}</p>
                    <p className="text-sm text-muted-foreground">{trackingInfo.hubAddress}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Estimated Pickup</p>
                    <p>{new Date(trackingInfo.estimatedPickup).toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tracking History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trackingInfo.statusHistory.map((status, index) => (
                    <div key={status.id} className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        {getStatusIcon(status.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{status.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(status.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground">{status.location}</p>
                      </div>
                      {index < trackingInfo.statusHistory.length - 1 && (
                        <Separator className="ml-2 mt-4" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {trackingNumber && !trackingInfo && !loading && (
          <Card>
            <CardContent className="text-center py-8">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Package Not Found</h3>
              <p className="text-muted-foreground">
                No package found with tracking number: {trackingNumber}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TrackPackage;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { QrCode, Package, ArrowRight, Scan, Camera } from 'lucide-react';
import QRScanner from '@/components/tracking/QRScanner';
import { useToast } from '@/hooks/use-toast';

const QRScannerPage = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [scannedResult, setScannedResult] = useState('');
  const [manualCode, setManualCode] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleQRResult = (result: string) => {
    setScannedResult(result);
    setShowScanner(false);
    
    toast({
      title: "QR Code Scanned Successfully",
      description: `Scanned: ${result}`,
    });

    // Auto-redirect to tracking if it looks like a tracking number
    if (result.match(/^CD\d+$/)) {
      setTimeout(() => {
        navigate(`/track?code=${result}`);
      }, 1500);
    }
  };

  const handleManualSubmit = () => {
    if (!manualCode.trim()) return;
    
    setScannedResult(manualCode);
    toast({
      title: "Code Entered",
      description: `Processing: ${manualCode}`,
    });

    // Auto-redirect to tracking if it looks like a tracking number
    if (manualCode.match(/^CD\d+$/)) {
      setTimeout(() => {
        navigate(`/track?code=${manualCode}`);
      }, 1500);
    }
  };

  const trackPackage = () => {
    if (scannedResult) {
      navigate(`/track?code=${scannedResult}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <QrCode className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4">QR Code Scanner</h1>
          <p className="text-muted-foreground">
            Scan QR codes for package tracking, hub check-in, or pickup verification
          </p>
        </div>

        <div className="space-y-6">
          {/* Scanner Options */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scan className="h-5 w-5" />
                Scan QR Code
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={() => setShowScanner(true)}
                className="w-full flex items-center gap-2"
                size="lg"
              >
                <Camera className="h-5 w-5" />
                Open Camera Scanner
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-muted" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="manual-code">Enter Code Manually</Label>
                <div className="flex gap-2">
                  <Input
                    id="manual-code"
                    placeholder="Enter QR code or tracking number"
                    value={manualCode}
                    onChange={(e) => setManualCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleManualSubmit} disabled={!manualCode.trim()}>
                    Submit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scanned Result */}
          {scannedResult && (
            <Card className="border-primary">
              <CardHeader>
                <CardTitle className="text-primary">Scan Result</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-mono text-lg">{scannedResult}</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button onClick={trackPackage} className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Track Package
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setScannedResult('')}
                  >
                    Clear Result
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Usage Guide */}
          <Card>
            <CardHeader>
              <CardTitle>How to Use</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">1</Badge>
                  <div>
                    <h4 className="font-semibold">Package Tracking</h4>
                    <p className="text-sm text-muted-foreground">
                      Scan the QR code from your delivery notification email or SMS
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">2</Badge>
                  <div>
                    <h4 className="font-semibold">Hub Check-in</h4>
                    <p className="text-sm text-muted-foreground">
                      Scan QR codes at hub locations to check in packages
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">3</Badge>
                  <div>
                    <h4 className="font-semibold">Pickup Verification</h4>
                    <p className="text-sm text-muted-foreground">
                      Present your QR code to hub partners for package pickup
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* QR Scanner Modal */}
        {showScanner && (
          <QRScanner
            onResult={handleQRResult}
            onClose={() => setShowScanner(false)}
          />
        )}
      </div>
    </div>
  );
};

export default QRScannerPage;
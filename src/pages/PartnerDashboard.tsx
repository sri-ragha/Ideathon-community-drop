import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Package, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  CheckCircle, 
  AlertCircle,
  Settings,
  QrCode
} from 'lucide-react';

interface Package {
  id: string;
  trackingNumber: string;
  recipient: string;
  arrivalTime: string;
  pickupCode: string;
  status: 'pending' | 'ready' | 'picked-up';
  size: 'small' | 'medium' | 'large';
}

interface HubStats {
  totalPackages: number;
  pendingPickups: number;
  monthlyEarnings: number;
  averageRating: number;
}

const PartnerDashboard = () => {
  const [hubStatus, setHubStatus] = useState(true);
  
  // Mock data
  const hubStats: HubStats = {
    totalPackages: 247,
    pendingPickups: 12,
    monthlyEarnings: 485.50,
    averageRating: 4.8
  };

  const packages: Package[] = [
    {
      id: '1',
      trackingNumber: 'CD123456789',
      recipient: 'John Doe',
      arrivalTime: '2024-01-20T10:30:00Z',
      pickupCode: 'ABC123',
      status: 'ready',
      size: 'medium'
    },
    {
      id: '2',
      trackingNumber: 'CD987654321',
      recipient: 'Jane Smith',
      arrivalTime: '2024-01-20T14:15:00Z',
      pickupCode: 'XYZ789',
      status: 'pending',
      size: 'small'
    },
    {
      id: '3',
      trackingNumber: 'CD456789123',
      recipient: 'Bob Johnson',
      arrivalTime: '2024-01-19T16:45:00Z',
      pickupCode: 'DEF456',
      status: 'picked-up',
      size: 'large'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'picked-up':
        return 'bg-success text-success-foreground';
      case 'ready':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-warning text-warning-foreground';
    }
  };

  const confirmPickup = (packageId: string) => {
    // Mock confirmation logic
    console.log('Package picked up:', packageId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Partner Dashboard</h1>
            <p className="text-muted-foreground">Manage your hub and track packages</p>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="hub-status">Hub Active</Label>
            <Switch
              id="hub-status"
              checked={hubStatus}
              onCheckedChange={setHubStatus}
            />
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Packages</p>
                  <p className="text-2xl font-bold">{hubStats.totalPackages}</p>
                </div>
                <Package className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Pickups</p>
                  <p className="text-2xl font-bold">{hubStats.pendingPickups}</p>
                </div>
                <Clock className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Monthly Earnings</p>
                  <p className="text-2xl font-bold">${hubStats.monthlyEarnings}</p>
                </div>
                <DollarSign className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Rating</p>
                  <p className="text-2xl font-bold">{hubStats.averageRating}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="packages" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="packages">Package Management</TabsTrigger>
            <TabsTrigger value="settings">Hub Settings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="packages">
            <Card>
              <CardHeader>
                <CardTitle>Package Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tracking Number</TableHead>
                      <TableHead>Recipient</TableHead>
                      <TableHead>Arrival Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Pickup Code</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {packages.map((pkg) => (
                      <TableRow key={pkg.id}>
                        <TableCell className="font-mono">{pkg.trackingNumber}</TableCell>
                        <TableCell>{pkg.recipient}</TableCell>
                        <TableCell>{new Date(pkg.arrivalTime).toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(pkg.status)}>
                            {pkg.status.replace('-', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono">{pkg.pickupCode}</TableCell>
                        <TableCell>
                          {pkg.status === 'ready' && (
                            <Button
                              size="sm"
                              onClick={() => confirmPickup(pkg.id)}
                              className="flex items-center gap-1"
                            >
                              <CheckCircle className="h-3 w-3" />
                              Confirm Pickup
                            </Button>
                          )}
                          {pkg.status === 'pending' && (
                            <Button size="sm" variant="outline">
                              <QrCode className="h-3 w-3 mr-1" />
                              Generate QR
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Hub Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="hub-name">Hub Name</Label>
                    <Input id="hub-name" defaultValue="Downtown Mini Mart" />
                  </div>
                  <div>
                    <Label htmlFor="hub-address">Address</Label>
                    <Input id="hub-address" defaultValue="123 Main St, Downtown" />
                  </div>
                  <div>
                    <Label htmlFor="hub-capacity">Storage Capacity</Label>
                    <Input id="hub-capacity" type="number" defaultValue="50" />
                  </div>
                  <Button>Update Information</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Operating Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="open-time">Opening Time</Label>
                      <Input id="open-time" type="time" defaultValue="07:00" />
                    </div>
                    <div>
                      <Label htmlFor="close-time">Closing Time</Label>
                      <Input id="close-time" type="time" defaultValue="23:00" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="weekend-open" />
                    <Label htmlFor="weekend-open">Open on weekends</Label>
                  </div>
                  <Button>Update Hours</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Packages Handled</span>
                      <span className="font-semibold">247</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Average Daily Volume</span>
                      <span className="font-semibold">12.4</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">On-time Pickup Rate</span>
                      <span className="font-semibold">96.8%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Customer Satisfaction</span>
                      <span className="font-semibold">4.8/5.0</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Earnings Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Package Storage Fees</span>
                      <span className="font-semibold">$425.50</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Bonus Payments</span>
                      <span className="font-semibold">$45.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Quality Bonus</span>
                      <span className="font-semibold">$15.00</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between items-center font-semibold">
                        <span>Total Earnings</span>
                        <span>$485.50</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PartnerDashboard;
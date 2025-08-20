import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Map from '@/components/ui/map';
import { MapPin, Clock, Star, Filter, Search } from 'lucide-react';

interface Hub {
  id: string;
  name: string;
  type: 'warehouse' | 'shop' | 'home';
  address: string;
  position: [number, number];
  rating: number;
  operatingHours: string;
  capacity: number;
  amenities: string[];
  distance?: number;
}

const Hubs = () => {
  const [hubs] = useState<Hub[]>([
    {
      id: '1',
      name: 'Downtown Mini Mart',
      type: 'shop',
      address: '123 Main St, Downtown',
      position: [40.7128, -74.0060],
      rating: 4.8,
      operatingHours: '7:00 AM - 11:00 PM',
      capacity: 50,
      amenities: ['24/7 Access', 'Climate Controlled', 'CCTV'],
      distance: 0.3
    },
    {
      id: '2',
      name: 'Community Warehouse',
      type: 'warehouse',
      address: '456 Industrial Ave',
      position: [40.7589, -73.9851],
      rating: 4.9,
      operatingHours: '6:00 AM - 10:00 PM',
      capacity: 200,
      amenities: ['Large Packages', 'Loading Dock', 'Secure Storage'],
      distance: 1.2
    },
    {
      id: '3',
      name: 'Sarah\'s Home Hub',
      type: 'home',
      address: '789 Residential Blvd',
      position: [40.7505, -73.9934],
      rating: 4.6,
      operatingHours: '9:00 AM - 6:00 PM',
      capacity: 15,
      amenities: ['Personal Service', 'Flexible Hours'],
      distance: 0.8
    }
  ]);

  const [filteredHubs, setFilteredHubs] = useState<Hub[]>(hubs);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedHub, setSelectedHub] = useState<string | null>(null);

  useEffect(() => {
    let filtered = hubs;

    if (searchTerm) {
      filtered = filtered.filter(hub =>
        hub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hub.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(hub => hub.type === typeFilter);
    }

    setFilteredHubs(filtered);
  }, [searchTerm, typeFilter, hubs]);

  const handleMarkerClick = (hubId: string) => {
    setSelectedHub(hubId);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'warehouse': return 'bg-blue-100 text-blue-800';
      case 'shop': return 'bg-green-100 text-green-800';
      case 'home': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'warehouse': return 'Warehouse';
      case 'shop': return 'Local Shop';
      case 'home': return 'Home Hub';
      default: return type;
    }
  };

  const mapMarkers = filteredHubs.map(hub => ({
    id: hub.id,
    position: hub.position,
    title: hub.name,
    description: hub.address,
    type: hub.type
  }));

  return (
    <div className="container py-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Find Pickup Hubs</h1>
        <p className="text-lg text-muted-foreground">
          Discover convenient pickup locations in your area
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full md:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="warehouse">Warehouses</SelectItem>
            <SelectItem value="shop">Local Shops</SelectItem>
            <SelectItem value="home">Home Hubs</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Map */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Map View</h2>
          <Map
            center={[40.7128, -74.0060]}
            zoom={13}
            markers={mapMarkers}
            onMarkerClick={handleMarkerClick}
            className="h-96 lg:h-[600px]"
          />
        </div>

        {/* Hub List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Available Hubs ({filteredHubs.length})</h2>
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {filteredHubs.map((hub) => (
              <Card 
                key={hub.id} 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedHub === hub.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedHub(hub.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{hub.name}</CardTitle>
                      <CardDescription className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{hub.address}</span>
                      </CardDescription>
                    </div>
                    <Badge className={getTypeColor(hub.type)}>
                      {getTypeLabel(hub.type)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{hub.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{hub.operatingHours}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">Capacity:</span> {hub.capacity} packages
                    </div>
                    {hub.distance && (
                      <div className="text-sm">
                        <span className="font-medium">Distance:</span> {hub.distance} miles
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {hub.amenities.map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">
                      Select Hub
                    </Button>
                    <Button variant="outline">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hubs;
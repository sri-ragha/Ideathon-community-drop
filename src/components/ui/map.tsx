import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapProps {
  center?: [number, number];
  zoom?: number;
  markers?: Array<{
    id: string;
    position: [number, number];
    title: string;
    description?: string;
    type?: 'warehouse' | 'shop' | 'home';
  }>;
  onMarkerClick?: (markerId: string) => void;
  className?: string;
}

const Map = ({ 
  center = [40.7128, -74.0060], 
  zoom = 12, 
  markers = [], 
  onMarkerClick,
  className = "h-96 w-full rounded-lg"
}: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    mapInstanceRef.current = L.map(mapRef.current).setView(center, zoom);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapInstanceRef.current);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => {
      mapInstanceRef.current?.removeLayer(marker);
    });
    markersRef.current = [];

    // Add new markers
    markers.forEach(markerData => {
      if (!mapInstanceRef.current) return;

      const icon = L.divIcon({
        html: `
          <div class="flex items-center justify-center w-8 h-8 rounded-full ${
            markerData.type === 'warehouse' ? 'bg-blue-500' :
            markerData.type === 'shop' ? 'bg-green-500' :
            'bg-purple-500'
          } text-white shadow-lg border-2 border-white">
            ${markerData.type === 'warehouse' ? '🏭' :
              markerData.type === 'shop' ? '🏪' :
              '🏠'}
          </div>
        `,
        className: 'custom-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker(markerData.position, { icon })
        .addTo(mapInstanceRef.current!)
        .bindPopup(`
          <div class="p-2">
            <h3 class="font-semibold text-sm mb-1">${markerData.title}</h3>
            ${markerData.description ? `<p class="text-xs text-gray-600">${markerData.description}</p>` : ''}
          </div>
        `);

      if (onMarkerClick) {
        marker.on('click', () => onMarkerClick(markerData.id));
      }

      markersRef.current.push(marker);
    });

    // Fit map to markers if available
    if (markers.length > 0) {
      const group = L.featureGroup(markersRef.current);
      mapInstanceRef.current.fitBounds(group.getBounds(), { padding: [20, 20] });
    }
  }, [markers, onMarkerClick]);

  return <div ref={mapRef} className={className} />;
};

export default Map;
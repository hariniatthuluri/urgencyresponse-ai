
import React, { useCallback, useMemo } from 'react';
import { GoogleMap, useJsApiLoader, HeatmapLayer, MarkerF } from '@react-google-maps/api';
import { MOCK_ISSUES } from '@/src/constants';
import { Map as MapIcon, Loader2, AlertTriangle } from 'lucide-react';

const LIBRARIES: ("visualization" | "drawing" | "places")[] = ['visualization'];
const GOOGLE_MAPS_API_KEY = (import.meta as any).env.VITE_GOOGLE_MAPS_API_KEY || '';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 12.9716,
  lng: 77.5946
};

export function UrgencyHeatmap({ onMarkerClick }: { onMarkerClick?: (issueId: string) => void }) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY || 'MISSING_KEY', // Avoid empty string that causes 'NoApiKeys' console spam
    libraries: LIBRARIES,
  });

  const heatmapPoints = useMemo(() => {
    if (!window.google) return [];
    return MOCK_ISSUES.map(issue => {
      const weight = issue.urgencyLevel === 'Critical' ? 5 : issue.urgencyLevel === 'High' ? 3 : 1;
      return {
        location: new window.google.maps.LatLng(issue.location.lat, issue.location.lng),
        weight
      };
    });
  }, [isLoaded]);

  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  // Priority: If key is explicitly missing, show configuration error
  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-bento-bg text-bento-text-dim p-8 text-center border border-bento-border">
        <div className="w-16 h-16 bg-blue-900/10 text-bento-accent rounded-full flex items-center justify-center mb-4 border border-bento-border">
          <MapIcon size={32} />
        </div>
        <h3 className="text-lg font-bold text-bento-text-main">Map Service Required</h3>
        <p className="text-sm mt-2 max-w-xs">
          The Tactical Heatmap requires a Google Maps API Key to visualize real-time urgency data.
        </p>
        <div className="mt-6 p-4 bg-bento-card rounded-2xl border border-bento-border text-left w-full max-w-md">
           <p className="text-[10px] font-black uppercase text-bento-accent mb-2">Setup Required</p>
           <p className="text-xs leading-relaxed text-bento-text-main">
             Please add <code className="bg-bento-bg px-1 rounded text-pink-400">VITE_GOOGLE_MAPS_API_KEY</code> to your **Secrets** in the AI Studio settings to enable this feature.
           </p>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-bento-bg text-bento-text-dim p-8 text-center border border-bento-border">
        <div className="w-16 h-16 bg-red-900/20 text-bento-urgent rounded-full flex items-center justify-center mb-4 border border-red-900/50">
          <AlertTriangle size={32} />
        </div>
        <h3 className="text-lg font-bold text-bento-text-main">Map Service Error</h3>
        <p className="text-sm mt-2 max-w-xs">
          The Google Maps integration failed to load. Ensure your <code className="bg-bento-card px-1 rounded text-bento-urgent">VITE_GOOGLE_MAPS_API_KEY</code> is correctly configured in your environment secrets.
        </p>
      </div>
    );
  }

  if (!isLoaded || !GOOGLE_MAPS_API_KEY) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-bento-bg border border-bento-border">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-baseline gap-1 animate-pulse">
            <span className="text-2xl font-black text-bento-text-main">UR</span>
            <span className="text-xs font-bold text-bento-accent">SYNC</span>
          </div>
          <div className="flex items-center gap-2 text-bento-text-dim">
            <Loader2 size={16} className="animate-spin text-bento-accent" />
            <span className="text-[10px] font-bold uppercase tracking-widest italic">Authenticating Secure Nodes...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        disableDefaultUI: true,
        styles: [
          {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#7c93a3" }, { "lightness": "-10" }]
          },
          // ... more styles for a clean "technical" look
        ]
      }}
    >
      <HeatmapLayer
        data={heatmapPoints}
        options={{
          radius: 30,
          opacity: 0.6
        }}
      />
      {MOCK_ISSUES.map(issue => (
        <MarkerF
          key={issue.id}
          position={issue.location}
          onClick={() => onMarkerClick?.(issue.id)}
          icon={{
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: issue.urgencyLevel === 'Critical' ? '#FF4B4B' : '#FF9F43',
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: '#0C0E12',
            scale: 8,
          }}
        />
      ))}
    </GoogleMap>
  );
}

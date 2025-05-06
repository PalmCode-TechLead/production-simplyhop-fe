"use client";
import {
  GoogleMap,
  useLoadScript,
  Polyline,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useContext, useEffect, useRef, useState } from "react";
import { decode } from "@googlemaps/polyline-codec";
import { ENVIRONMENTS } from "@/core/environments";
import { PlanRideTripContext } from "../../context";
import { MapInfoWindow } from "@/core/components/map_info_window";
import { getDictionaries } from "../../i18n";
import useGeolocation from "@/core/utils/map/hooks/useGeoLocation";
import { libraries } from "@/core/utils/map/constants";

export const MapPlanRideTrip = () => {
  const apiKey = ENVIRONMENTS.GOOGLE_MAP_API_KEY;
  const dictionaries = getDictionaries();
  const { state } = useContext(PlanRideTripContext);
  useGeolocation();

  if (!apiKey) {
    console.error(
      "🚨 API Key tidak ditemukan! Pastikan sudah diatur di .env.local"
    );
  }

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: libraries,
  });

  const containerStyle = {
    width: "100%",
    height: "calc(100vh - 90px)",
  };

  const [polylinePath, setPolylinePath] = useState<
    { lat: number; lng: number }[]
  >([]);

  const startPoint = { lat: 51.0504, lng: 13.7373 }; // Munich, Germany
  const endPoint = { lat: 51.0504, lng: 13.7373 }; // Berlin, Germany

  useEffect(() => {
    if (!isLoaded || !window.google) return;
    const fetchRoute = async () => {
      const apiKey = ENVIRONMENTS.GOOGLE_MAP_API_KEY;
      const url = `${ENVIRONMENTS.ROUTES_GOOGLE_API_URL}/directions/v2:computeRoutes`;

      const requestBody = {
        origin: {
          location: {
            latLng: { latitude: startPoint.lat, longitude: startPoint.lng },
          },
        },
        destination: {
          location: {
            latLng: { latitude: endPoint.lat, longitude: endPoint.lng },
          },
        },
        travelMode: "DRIVE",
        routingPreference: "TRAFFIC_AWARE",
        computeAlternativeRoutes: false,
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": apiKey!,
            "X-Goog-FieldMask":
              "routes.duration,routes.distanceMeters,routes.polyline",
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error(`Error fetching route: ${response.statusText}`);
        }

        const data = await response.json();

        const encodedPolyline = data.routes[0].polyline.encodedPolyline;
        const decodedPolyline = decode(encodedPolyline).map(([lat, lng]) => ({
          lat,
          lng,
        }));

        setPolylinePath(decodedPolyline);
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };
    fetchRoute();
  }, [isLoaded, endPoint.lat, endPoint.lng, startPoint.lat, startPoint.lng]);

  const mapRef = useRef<google.maps.Map | null>(null);

  // NOTES: readjust map view
  useEffect(() => {
    if (mapRef.current) {
      const bounds = new window.google.maps.LatLngBounds();
      (!state.map.polyline_path.length
        ? polylinePath
        : state.map.polyline_path
      ).forEach((point) => bounds.extend(point));
      mapRef.current.fitBounds(bounds, {
        top: 200,
        bottom: 200,
        left: 200,
        right: 200,
      });
    }
  }, [
    isLoaded,
    polylinePath,
    state.map.polyline_path,
    polylinePath.length,
    state.map.polyline_path.length,
  ]);

  if (!isLoaded) return <div />;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      onLoad={(map) => {
        mapRef.current = map; // Menyimpan referensi tanpa return
      }}
      options={{
        mapTypeControl: false,
        streetViewControl: false,
        cameraControl: false,
        fullscreenControl: false,
      }}
    >
      {/* Start Marker */}
      {!!state.filters.origin.selected.lat_lng && (
        <Marker
          position={state.filters.origin.selected.lat_lng}
          icon={{
            ...dictionaries.map.marker.origin.icon,
            scaledSize: new window.google.maps.Size(32, 56),
          }}
        />
      )}

      {/* Start Info Window */}
      {!!state.filters.origin.selected.item &&
        !!state.filters.origin.selected.lat_lng && (
          <InfoWindow
            position={state.filters.origin.selected.lat_lng}
            options={{
              headerDisabled: true,
            }}
          >
            <MapInfoWindow
              {...dictionaries.map.info_window.origin}
              description={state.filters.origin.selected.item.name}
            />
          </InfoWindow>
        )}

      {/* Destination Marker */}
      {!!state.filters.destination.selected.lat_lng && (
        <Marker
          position={state.filters.destination.selected.lat_lng}
          icon={{
            ...dictionaries.map.marker.destination.icon,
            scaledSize: new window.google.maps.Size(32, 56),
          }}
        />
      )}

      {/* Destination InfoWindow */}
      {!!state.filters.destination.selected.item &&
        !!state.filters.destination.selected.lat_lng && (
          <InfoWindow
            position={state.filters.destination.selected.lat_lng}
            options={{
              headerDisabled: true,
            }}
          >
            <MapInfoWindow
              {...dictionaries.map.info_window.destination}
              description={state.filters.destination.selected.item.name}
            />
          </InfoWindow>
        )}

      {!!state.map.polyline_path.length && (
        <Polyline
          path={state.map.polyline_path}
          options={{
            strokeColor: "#5AC53D",
            strokeOpacity: 0.8,
            strokeWeight: 8,
          }}
        />
      )}
    </GoogleMap>
  );
};

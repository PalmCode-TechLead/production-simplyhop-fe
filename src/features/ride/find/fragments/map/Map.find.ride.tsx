"use client";
import {
  GoogleMap,
  useLoadScript,
  Polyline,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import { decode } from "@googlemaps/polyline-codec";
import clsx from "clsx";
import { ENVIRONMENTS } from "@/core/environments";

const libraries: any = ["places"];

export const MapFindRide = () => {
  const apiKey = ENVIRONMENTS.GOOGLE_MAP_API_KEY;

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

  const startPoint = { lat: 48.1351, lng: 11.5765 }; // Munich, Germany
  const endPoint = { lat: 48.131, lng: 11.577 }; // Berlin, Germany

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
        console.log("🚀 Routes API Response:", data);
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
  }, [isLoaded]);

  const [selectedStartMarker, setSelectedStartMarker] = useState<null | {
    lat: number;
    lng: number;
  }>(null);

  const [selectedEndMarker, setSelectedEndMarker] = useState<null | {
    lat: number;
    lng: number;
  }>(null);

  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      const bounds = new window.google.maps.LatLngBounds();
      polylinePath.forEach((point) => bounds.extend(point));
      mapRef.current.fitBounds(bounds);
    }
  }, [isLoaded, mapRef.current]);

  if (!isLoaded) return <div>Loading...</div>;

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
      }}
    >
      {/* Start Marker */}
      <Marker
        position={startPoint}
        onClick={() => setSelectedStartMarker(startPoint)}
        icon={{
          url: "/icons/map/start_point.svg", // Bisa diganti dengan custom SVG
          scaledSize: new window.google.maps.Size(32, 56),
        }}
      />

      {/* Start Info Window */}
      {selectedStartMarker && (
        <InfoWindow
          position={selectedStartMarker}
          onCloseClick={() => setSelectedStartMarker(null)}
        >
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[0.375rem]"
            )}
          >
            <p
              className={clsx(
                "text-[0.625rem] text-[#232323B2] font-extralight"
              )}
            >
              Start
            </p>
            <p className={clsx("text-[1rem] text-[#232323] font-semibold")}>
              Living Hotel Das Viktual...
            </p>
          </div>
        </InfoWindow>
      )}

      {/* End Marker */}
      <Marker
        position={endPoint}
        onClick={() => setSelectedEndMarker(endPoint)}
        icon={{
          url: "/icons/map/end_point.svg", // Bisa diganti dengan custom SVG
          scaledSize: new window.google.maps.Size(32, 56),
        }}
      />

      {/* End InfoWindow */}
      {selectedEndMarker && (
        <InfoWindow
          position={selectedEndMarker}
          onCloseClick={() => setSelectedEndMarker(null)}
        >
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[0.375rem]"
            )}
          >
            <p
              className={clsx(
                "text-[0.625rem] text-[#232323B2] font-extralight"
              )}
            >
              End
            </p>
            <p className={clsx("text-[1rem] text-[#232323] font-semibold")}>
              Media Markt...
            </p>
          </div>
        </InfoWindow>
      )}
      {polylinePath.length > 0 && (
        <Polyline
          path={polylinePath}
          options={{
            strokeColor: "#5AC53D",
            strokeOpacity: 0.8,
            strokeWeight: 8,
          }}
        />
      )}
      {/* {directions && <DirectionsRenderer directions={directions} />} */}
    </GoogleMap>
  );
};

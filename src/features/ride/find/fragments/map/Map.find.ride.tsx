"use client";
import {
  GoogleMap,
  DirectionsRenderer,
  useLoadScript,
  Polyline
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { decode } from "@googlemaps/polyline-codec";

const libraries: any = ["places"];

export const MapFindRide = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY ?? "";

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

  const center = { lat: 37.7749, lng: -122.4194 };

  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  const [polylinePath, setPolylinePath] = useState<
    { lat: number; lng: number }[]
  >([]);

  useEffect(() => {
    if (!isLoaded || !window.google) return;
    const fetchRoute = async () => {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY;
      const url = `https://routes.googleapis.com/directions/v2:computeRoutes`;

      const requestBody = {
        origin: {
          location: { latLng: { latitude: 37.7749, longitude: -122.4194 } },
        },
        destination: {
          location: { latLng: { latitude: 34.0522, longitude: -118.2437 } },
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

  useEffect(() => {
    if (!isLoaded || !window.google) return;

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: { lat: 37.7749, lng: -122.4194 },
        destination: { lat: 34.0522, lng: -118.2437 },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
        } else {
          console.error(`Error fetching directions: ${status}`);
        }
      }
    );
  }, [isLoaded]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      options={{
        mapTypeControl: false,
        streetViewControl: false,
        cameraControl: false,
      }}
    >
      {polylinePath.length > 0 && (
        <Polyline
          path={polylinePath}
          options={{
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 4,
          }}
        />
      )}
      {/* {directions && <DirectionsRenderer directions={directions} />} */}
    </GoogleMap>
  );
};

"use client";
import {
  GoogleMap,
  DirectionsRenderer,
  useLoadScript,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";

const libraries: any = ["places"];

export const MapFindRide = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY ?? "";

  if (!apiKey) {
    console.error("🚨 API Key tidak ditemukan! Pastikan sudah diatur di .env.local");
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

  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

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
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
};

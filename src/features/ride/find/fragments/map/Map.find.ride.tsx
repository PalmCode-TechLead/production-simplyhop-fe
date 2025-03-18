"use client";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
  useLoadScript,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";

export interface IMapFindRideProps {}

type DirectionsResult = google.maps.DirectionsResult;

declare global {
  interface Window {
    google: typeof google;
  }
}
export const MapFindRide = (props: IMapFindRideProps) => {
  const apiKey: string = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY ?? "";
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  const containerStyle = {
    width: "100%",
    height: "calc(100vh - 90px)",
  };

  const center = {
    lat: 37.7749, // San Francisco
    lng: -122.4194,
  };

  const [directions, setDirections] = useState<DirectionsResult | null>(null);
  console.log(isLoaded, "ini loaded");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const loadDirections = () => {
        if (window.google) {
          const directionsService = new window.google.maps.DirectionsService();
          console.log(directionsService, window.google.maps, "ini apa");
          directionsService.route(
            {
              origin: { lat: 37.7749, lng: -122.4194 }, // Example: San Francisco
              destination: { lat: 34.0522, lng: -118.2437 }, // Example: Los Angeles
              travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
              console.log(result, "ini result");
              if (status === window.google.maps.DirectionsStatus.OK) {
                setDirections(result);
              } else {
                console.error(`Error fetching directions: ${status}`);
              }
            }
          );
        }
      };

      if (window.google) {
        loadDirections();
      }
    }
  }, [isLoaded]);

  return (
    <LoadScript googleMapsApiKey={apiKey}>
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
    </LoadScript>
  );
};

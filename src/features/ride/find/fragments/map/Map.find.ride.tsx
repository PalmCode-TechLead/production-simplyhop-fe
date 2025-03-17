"use client";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
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

  const containerStyle = {
    width: "100%",
    height: "calc(100vh - 90px)",
  };

  const center = {
    lat: 37.7749, // San Francisco
    lng: -122.4194,
  };

  const [directions, setDirections] = useState<DirectionsResult | null>(null);

  useEffect(() => {
    const loadDirections = () => {
      if (window.google) {
        const directionsService = new window.google.maps.DirectionsService();
        console.log(directionsService, "ini apa");
        directionsService.route(
          {
            origin: "San Francisco, CA",
            destination: "Los Angeles, CA",
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
  }, []);
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

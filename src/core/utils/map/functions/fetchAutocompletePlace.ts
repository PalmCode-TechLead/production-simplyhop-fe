export const fetchAutocompletePlace = async (
  input: string,
  // coordinate: { lat: number; lng: number } | null,
  callback: (data: null | google.maps.places.AutocompletePrediction[]) => void
) => {
  if (typeof window !== "undefined" && window.google) {
    // const autocompleteService = new google.maps.places.AutocompleteService();

    // await autocompleteService.getPlacePredictions(
    //   {
    //     input: input,
    //     componentRestrictions: { country: "de" },
    //     types: ["geocode"],
    //     // types: ["establishment", "geocode", "address"],
    //     // locationBias: new google.maps.Circle({
    //     //   center: new google.maps.LatLng(coordinate.lat, coordinate.lng), // Pusat Munich
    //     //   radius: 20000, // Radius 20km dari pusat Munich
    //     // }),
    //   },
    //   (predictions, status) => {
    //     if (
    //       status === google.maps.places.PlacesServiceStatus.OK &&
    //       predictions
    //     ) {
    //       callback(predictions);
    //     } else {
    //       callback(null);
    //     }
    //   }
    // );
    const autocompleteService = new google.maps.places.AutocompleteService();
    let results: google.maps.places.AutocompletePrediction[] = [];

    // 🔹 Ambil hasil dari "establishment"
    autocompleteService.getPlacePredictions(
      {
        input,
        componentRestrictions: { country: "de" },
        types: ["establishment"],
      },
      (businessResults, status) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          businessResults
        ) {
          results = [...results, ...businessResults];
        }

        // 🔹 Ambil hasil dari "geocode" (alamat & kode pos)
        autocompleteService.getPlacePredictions(
          {
            input,
            componentRestrictions: { country: "de" },
            types: ["geocode"],
          },
          (geocodeResults, status) => {
            if (
              status === google.maps.places.PlacesServiceStatus.OK &&
              geocodeResults
            ) {
              results = [...results, ...geocodeResults];
            }

            // 🔹 Kirim hasil gabungan ke callback
            callback(results.length > 0 ? results : []);
          }
        );
      }
    );
  }
};

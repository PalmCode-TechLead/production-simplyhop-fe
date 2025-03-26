export const fetchAutocompletePlace = async (
  input: string,
  // coordinate: { lat: number; lng: number } | null,
  // callback: (data: null | google.maps.places.AutocompletePrediction[]) => void
  callback: (data: null | { description: string; place_id: string }[]) => void
) => {
  if (typeof window !== "undefined" && window.google) {
    const placesService = new google.maps.places.PlacesService(
      document.createElement("div")
    );

    placesService.textSearch(
      {
        query: input,
        region: "de", // 🔹 Batasi pencarian ke Jerman
      },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          const placeList = results.map((place) => ({
            description: place.name ?? "",
            place_id: place.place_id ?? "",
          }));
          callback(placeList);
        } else {
        }
      }
    );
    // const autocompleteService = new google.maps.places.AutocompleteService();
    // let results: google.maps.places.AutocompletePrediction[] = [];

    // // 🔹 Ambil hasil dari "establishment"
    // autocompleteService.getPlacePredictions(
    //   {
    //     input,
    //     componentRestrictions: { country: "de" },
    //     types: ["establishment"],
    //   },
    //   (businessResults, status) => {
    //     if (
    //       status === google.maps.places.PlacesServiceStatus.OK &&
    //       businessResults
    //     ) {
    //       results = [...results, ...businessResults];
    //     }

    //     // 🔹 Ambil hasil dari "geocode" (alamat & kode pos)
    //     autocompleteService.getPlacePredictions(
    //       {
    //         input,
    //         componentRestrictions: { country: "de" },
    //         types: ["geocode"],
    //       },
    //       (geocodeResults, status) => {
    //         if (
    //           status === google.maps.places.PlacesServiceStatus.OK &&
    //           geocodeResults
    //         ) {
    //           results = [...results, ...geocodeResults];
    //         }

    //         // 🔹 Ambil hasil dari "geocode" (alamat & kode pos)
    //         autocompleteService.getPlacePredictions(
    //           {
    //             input,
    //             componentRestrictions: { country: "de" },
    //             types: ["address"],
    //           },
    //           (geocodeResults, status) => {
    //             if (
    //               status === google.maps.places.PlacesServiceStatus.OK &&
    //               geocodeResults
    //             ) {
    //               results = [...results, ...geocodeResults];
    //             }

    //             // 🔹 Kirim hasil gabungan ke callback
    //             callback(results.length > 0 ? results : []);
    //           }
    //         );

    //         // // 🔹 Kirim hasil gabungan ke callback
    //         // callback(results.length > 0 ? results : []);
    //       }
    //     );
    //   }
    // );
  }
};

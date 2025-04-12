export const fetchAutocompleteCityList = async (
  input: string,
  callback: (data: null | google.maps.places.AutocompletePrediction[]) => void
) => {
  if (typeof window !== "undefined" && window.google) {
    const autocompleteService = new google.maps.places.AutocompleteService();

    await autocompleteService.getPlacePredictions(
      {
        input,
        componentRestrictions: { country: "de" },
        types: ["(cities)"],
      },
      (predictions, status) => {
        if (
          status === "OK" &&
          predictions
        ) {
          callback(predictions);
        } else {
          callback(null);
        }
      }
    );
  }
};

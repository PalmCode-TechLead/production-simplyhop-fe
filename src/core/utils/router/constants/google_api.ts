export const RestGoogleAPICollectionURL = {
  routes: {
    getDirections: () => `/directions/v2:computeRoutes`,
  },
  maps: {
    getDistanceMatrix: () => `/maps/api/distancematrix/json`,
    getLocalDistanceMatrix: () => `/api/distance`,
  },
};

export const SimplyHopAPICollectionURL = {
  auth: {
    postLogin: () => `/api/auth/login`,
    postRegister: () => `/api/auth/register`,
  },
  vehicle: {
    postCreate: () => `/api/auth/login`,
  },
  user_profile: {
    postCreate: () => `/api/vehicle`,
  },
  vehicle_brand: {
    getList: () => `/api/vehicle-brand`,
  },
  vehicle_category: {
    getList: () => `/api/vehicle-category`,
  },
};

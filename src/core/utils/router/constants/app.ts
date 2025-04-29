export const AppCollectionURL = {
  public: {
    home: () => "/",
    tripResult: (params?: string) =>
      !params ? `/mitfahrt-suchen/result` : `/mitfahrt-suchen/result?${params}`,
    login: () => "/login",
    register: () => "/register",
  },
  private: {
    chat: (params?: string) => (!params ? "/chat" : `/chat?${params}`),

    myList: (params?: string) =>
      !params ? `/meine-fahrten` : `/meine-fahrten?${params}`,
    myListArchive: (params?: string) =>
      !params ? `/meine-fahrten/archive` : `/meine-fahrten/archive?${params}`,
    profile_registration: () => "/profile-registration",
    support_vehicles: () => `/support/fahrzeuginformationen/`,
    support_vehicle_create: () => `/support/fahrzeuginformationen/create`,
    support_vehicle_detail: (id: string) =>
      `/support/fahrzeuginformationen/detail/${id}`,
    support_account: () => "/support/konto",
    support_account_edit: () => "/support/konto/edit",
  },
};

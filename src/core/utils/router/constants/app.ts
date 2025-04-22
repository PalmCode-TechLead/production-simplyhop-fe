export const AppCollectionURL = {
  public: {
    home: () => "/",
    tripResult: (params?: string) =>
      !params ? `/mitfahrt-suchen/result` : `/mitfahrt-suchen/result?${params}`,
    login: () => "/login",
    register: () => "/register",
  },
  private: {
    chat: () => "/chat",
    myList: (params?: string) =>
      !params ? `/meine-fahrten` : `/meine-fahrten?${params}`,
    profile_registration: () => "/profile-registration",
    support_vehicle_create: () => `/support/fahrzeuginformationen/create/`,
    support_vehicle_detail: (id: string) =>
      `/support/fahrzeuginformationen/detail/${id}`,
    support_account: () => "/support/konto",
    support_account_edit: () => "/support/konto/edit",
  },
};

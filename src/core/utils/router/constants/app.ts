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
    profile_registration: () => "/profile-registration",
    support_account_edit: () => "/support/konto/edit",
  },
};

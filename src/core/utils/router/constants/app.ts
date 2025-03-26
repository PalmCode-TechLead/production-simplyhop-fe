export const AppCollectionURL = {
  public: {
    home: () => "/",
    tripResult: (params?: string) =>
      !params ? `/mitfahrt-suchen/result` : `/mitfahrt-suchen/result?${params}`,
    login: () => "/login",
    register: () => "/register",
  },
  private: {
    profile_registration: () => "/profile-registration",
  },
};

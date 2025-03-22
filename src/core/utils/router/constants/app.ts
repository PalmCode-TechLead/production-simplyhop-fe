export const AppCollectionURL = {
  public: {
    home: () => "/",
    tripResult: (params?: string) =>
      !params
        ? `/mitfahrt-suchen/result`
        : `/mitfahrt-suchen/result?${params}`,
  },
  private: {
    chat: () => "/chat",
    upload: () => "/upload",
  },
};

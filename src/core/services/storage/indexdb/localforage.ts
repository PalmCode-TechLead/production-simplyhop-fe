import localforage from "localforage";

export interface StorageConfigInterface {
  method: "setItem" | "getItem" | "clear" | "removeItem";
  key: string;
  value?: any;
}

export interface StorageServiceResponseInterface<T = any> {
  success: boolean;
  data: T;
}
export const rewriteStorageResponse = (
  response: StorageServiceResponseInterface
) => {
  return {
    success: response.success,
    data: response.data,
  };
};

export const storageService = <T = any>(
  config: StorageConfigInterface
): Promise<StorageServiceResponseInterface<T>> => {
  return new Promise<StorageServiceResponseInterface<any>>((resolve) => {
    if (config.method === "setItem") {
      localforage
        .setItem(config.key, config.value)
        .then((value: any) => {
          const storageResponse = rewriteStorageResponse({
            success: true,
            data: value,
          });
          resolve(storageResponse);
        })
        .catch(() => {
          const storageResponse = rewriteStorageResponse({
            success: false,
            data: null,
          });
          return storageResponse;
        });
    } else if (config.method === "removeItem") {
      localforage
        .removeItem(config.key)
        .then(() => {
          const storageResponse = rewriteStorageResponse({
            success: true,
            data: null,
          });
          resolve(storageResponse);
        })
        .catch(() => {
          const storageResponse = rewriteStorageResponse({
            success: false,
            data: null,
          });
          return storageResponse;
        });
    } else if (config.method === "clear") {
      localforage
        .clear()
        .then(() => {
          const storageResponse = rewriteStorageResponse({
            success: true,
            data: null,
          });
          resolve(storageResponse);
        })
        .catch(() => {
          const storageResponse = rewriteStorageResponse({
            success: false,
            data: null,
          });
          return storageResponse;
        });
    } else {
      localforage
        .getItem(config.key)
        .then((value: any) => {
          const storageResponse = rewriteStorageResponse({
            success: value === null ? false : true,
            data: value,
          });
          resolve(storageResponse);
        })
        .catch(() => {
          const storageResponse = rewriteStorageResponse({
            success: false,
            data: null,
          });
          return storageResponse;
        });
    }
  });
};

export const getError = (payload: {
  errorItems: { id: string; name: string; regex: string }[];
  value: string;
  type?: "required" | "optional";
}) => {
  const errorObj = payload.errorItems.find((item) => {
    return !new RegExp(item.regex).test(payload.value);
  });
  return !errorObj
    ? null
    : payload.type === "optional" && !!payload.value.length
    ? {
        id: errorObj.id,
        name: errorObj.name,
      }
    : payload.type === "optional" && !payload.value.length
    ? null
    : {
        id: errorObj.id,
        name: errorObj.name,
      };
};

export type FormError = null | {
  id: string;
  name: string;
};

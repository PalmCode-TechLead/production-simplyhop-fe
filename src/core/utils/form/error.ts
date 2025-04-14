export const getError = (payload: {
  errorItems: { id: string; name: string; regex: string }[];
  value: string;
}) => {
  const emailObj = payload.errorItems.find((item) => {
    console.log(new RegExp(item.regex).test(payload.value), "ini apa");
    return !new RegExp(item.regex).test(payload.value);
  });
  return !emailObj
    ? null
    : {
        id: emailObj.id,
        name: emailObj.name,
      };
};

export type FormError = null | {
  id: string;
  name: string;
};

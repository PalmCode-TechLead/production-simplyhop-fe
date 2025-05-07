export const formatDisplayName = (data: {
  first_name?: string;
  email?: string;
}) => {
  if (!!data.first_name) return data.first_name;
  if (!!data.email) return data.email;

  return "-";
};

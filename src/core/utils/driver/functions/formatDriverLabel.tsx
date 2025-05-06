export const formatDriverLabel = (
  data: { id: string; name: string }[],
  gender?: string | null
) => {
  if (!gender || gender === "unspecified") {
    return [];
  }
  return [
    {
      id: data.find((item) => item.id === gender)?.id ?? "",
      label: data.find((item) => item.id === gender)?.name ?? "",
      variant: "danger" as "success" | "danger",
    },
  ];
};

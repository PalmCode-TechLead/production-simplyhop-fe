export const formatDriverLabel = (
  data: { id: string; name: string }[],
  gender?: string | null
) => {
  if (gender === "female") {
    return [
      {
        id: data.find((item) => item.id === gender)?.id ?? "",
        label: "Fahrerin (W)",
        variant: "danger" as "success" | "danger",
      },
    ];
  }
  return [];
};

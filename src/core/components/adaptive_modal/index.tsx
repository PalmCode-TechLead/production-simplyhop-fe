import dynamic from "next/dynamic";

export const AdaptiveModal = dynamic(
  () => import("./AdaptiveModal").then((mod) => mod.AdaptiveModal),
  {
    ssr: false,
  }
);

import ReactLoadingSkeleton, {
  SkeletonProps,
  SkeletonTheme,
} from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const Skeleton = (props: SkeletonProps) => {
  return (
    <SkeletonTheme >
      <ReactLoadingSkeleton {...props} />
    </SkeletonTheme>
  );
};

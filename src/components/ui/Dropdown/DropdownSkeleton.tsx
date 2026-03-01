import clsx from "clsx";
import { CgSpinnerTwo } from "react-icons/cg";

interface DropdownSkeletonProps {
  label: string;
}

const DropdownSkeleton = ({ label }: DropdownSkeletonProps) => {
  return (
    <div
      className={clsx(
        "w-full sm:w-48 h-10 px-4 border rounded bg-light-light text-dark-light",
        "flex items-center justify-between gap-2"
      )}
    >
      <span className="text-nowrap truncate">{label}</span>
      <CgSpinnerTwo className="shrink-0 animate-spin" />
    </div>
  );
};

export default DropdownSkeleton;

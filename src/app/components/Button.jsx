import { ChevronRight } from "lucide-react";

export const Button = ({
  ButName,
  handleClick,
  bg,
  text,
  width,
  border,
  borderS,
  borderR,
}) => {
  return (
    <div
      className={` ${bg} ${text} ${width} ${border} ${borderS} ${borderR} flex flex-col py-[10px] px-3`}
    >
      <button
        className="flex justify-center gap-2 items-center"
        onClick={handleClick}
      >
        {ButName}
        <ChevronRight className="text-white w-6 h-6 text-[16px] font-medium" />
      </button>
    </div>
  );
};

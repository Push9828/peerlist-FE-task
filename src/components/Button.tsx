import { ButtonProps } from "@/types/components";

export const Button = ({
  text,
  icon,
  iconPosition,
  isPrimary,
  onClick,
  disabled = false,
}: ButtonProps) => {
  const baseClasses =
    "flex items-center font-semibold text-sm py-2 px-4 rounded-xl";

  const buttonClass = isPrimary
    ? "border border-[#E1E4E8]  py-1.5 px-4 shadow-[0px_3px_3px_-1.5px_rgba(0,_0,_0,_0.031)] hover:shadow-[0px_3px_3px_-1.5px_rgba(0,_0,_0,_0.1)]"
    : "bg-[#00AA45] border-[#1E874B] text-white text-sm py-1.5 px-4 hover:shadow-[0px_12px_12px_-6px_rgba(0,_0,_0,_0.08)] shadow-[0px_6px_6px_-3px_rgba(0,_0,_0,_0.08)]";

  const disabledClass = disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "";

  const iconElement = icon ? (
    <img src={icon} alt="icon" className="w-4 h-4" />
  ) : null;

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${buttonClass} ${disabledClass}`}
      disabled={disabled}
    >
      {iconPosition === "before" && iconElement}
      <span className={iconPosition === "before" ? "ml-2" : "mr-2"}>
        {text}
      </span>
      {iconPosition === "after" && iconElement}
    </button>
  );
};

import React from "react";

interface TooltipProps {
  children: React.ReactNode;
  text: string;
  customStyle?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, text, customStyle }) => {
  return (
    <div className="relative group">
      {children}
      <span
        className={`absolute scale-0 rounded bg-gray-800 p-2 text-xs text-white
    group-hover:scale-100 text-center ${customStyle}`}
      >
        {text}
      </span>
    </div>
  );
};

export default Tooltip;

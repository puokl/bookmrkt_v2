import React, { ReactElement } from "react";

type CustomTextProps = {
  label: string | ReactElement;
  value: string;
  labelFontSize?: string;
  valueFontSize?: string;
};

export const CustomText: React.FC<CustomTextProps> = ({
  label,
  value,
  labelFontSize = "sm",
  valueFontSize = "sm",
}) => {
  const getFontSizeClass = (size: string) => {
    switch (size) {
      case "xs":
        return "text-xs";
      case "sm":
        return "text-sm";
      case "md":
        return "text-base";
      case "lg":
        return "text-lg";
      default:
        return "text-sm";
    }
  };

  return (
    <div className="flex items-center">
      <span className={`${getFontSizeClass(labelFontSize)} mr-2 font-bold`}>
        {label}:
      </span>
      <span className={`${getFontSizeClass(valueFontSize)} italic`}>
        {value}
      </span>
    </div>
  );
};

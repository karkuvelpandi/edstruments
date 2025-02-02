import React, { ReactNode } from "react";

const SectionHeader = ({
  icon,
  title,
  className,
}: {
  icon?: ReactNode;
  title: string;
  className?: string;
}) => {
  return (
    <p className={`flex items-center gap-3 text-xl font-bold ${className}`}>
      {icon && (
        <span className=" rounded-full bg-blue-100 inline-flex h-8 w-8 justify-center items-center pt-1">
          {icon}
        </span>
      )}
      {title}
    </p>
  );
};

export default SectionHeader;

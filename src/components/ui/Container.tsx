import React from 'react';

const Container = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`max-w-[1440px] px-8 w-full !mx-auto ${className}`}>
      {children}
    </div>
  );
};

export default Container;

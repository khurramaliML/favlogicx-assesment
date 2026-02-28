import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <>
      <div className="lg:px-[1%] lg:pt-[1%]">
        {children}
      </div>
    </>
  );
}

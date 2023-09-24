"use client";

const login = ({ children }: { children: React.ReactNode }) => {
  return <main className="unauthorized-layout bg-fixed">{children}</main>;
};

export default login;

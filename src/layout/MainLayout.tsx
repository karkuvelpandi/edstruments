import React, { ReactNode } from "react";
import Navbar from "./components/Navbar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col">
      <Navbar/>
      <main className="flex-grow flex-1">
      {children}
      </main>
      <footer className="text-center py-10">
        Copyright &copy; 2025 All rights reserved
      </footer>
    </div>
  );
};

export default MainLayout;

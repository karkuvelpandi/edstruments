import React, { ReactNode } from "react";
import Navbar from "./components/Navbar";
import Container from "@/components/ui/Container";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Container className="flex-grow flex-1 !pt-15 h-screen">{children}</Container>
      {/* <footer className="text-center py-10">
        Copyright &copy; 2025 All rights reserved
      </footer> */}
    </div>
  );
};

export default MainLayout;

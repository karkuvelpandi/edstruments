"use client";
import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import Container from "@/components/ui/Container";
import { useUser } from "@/context/UserProvider";

const Navbar = () => {
  const { user, logout } = useUser();
  console.log(user);
  return (
    <nav className="fixed top-0 left-0 right-0 !w-full z-50 bg-white shadow-sm shadow-gray-200">
      <Container className="h-16 w-full flex justify-between items-center">
        <span className="text-2xl font-bold">Edstruments</span>
        {user && (
          <div className="flex justify-center gap-2">
            <span className="hidden sm:inline content-center mr-2 border-gray-300 italic !px-2 my-auto rounded-md text-gray-300">
              {user?.name}
            </span>
            <Button
              sx={{ color: "red", border: "1px solid red", gap: 1 }}
              onClick={() => logout(user)}
            >
              <LogoutIcon />
              <span className="hidden sm:inline">Log out</span>
            </Button>
          </div>
        )}
      </Container>
    </nav>
  );
};

export default Navbar;

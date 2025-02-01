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
    <Container className="flex mx-auto container justify-between items-center py-5 border-b border-gray-300">
      <span className="text-2xl font-bold">Edstruments</span>
      {user && (
        <div className="flex justify-center">
          <span className="hidden sm:inline-block mr-2 border-2 border-gray-300 italic px-1 my-auto rounded-md text-gray-300">
            {user?.name}
          </span>
          <Button sx={{ color: "red", border: "1px solid red", gap: 1 }} onClick={() => logout(user)} >
            <LogoutIcon />
            <span className="hidden sm:inline">Log out</span>
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Navbar;

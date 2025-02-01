"use client";
import Container from "@/components/ui/Container";
import { useUser } from "@/context/UserProvider";
import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Dashboard = () => {
  const { user } = useUser();

  return (
    <Container className="!pt-4 !space-y-4">
      <h1 className="text-3xl text-center">
        Welcome, {user?.name || "Guest"}!
      </h1>
      <div className="flex justify-center">
        <Button
          variant="outlined"
          color="primary"
          href="/dashboard/create-invoice"
        >
          Create Invoice
          <ArrowForwardIcon className="!ml-2" />
        </Button>
      </div>
    </Container>
  );
};

export default Dashboard;

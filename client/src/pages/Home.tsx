import { Alert, AlertTitle } from "@mui/material";
import { FC } from "react";

const Home: FC = () => {
  return (
    <div className="mt-20">
      <Alert severity="info">
        <AlertTitle>About this app</AlertTitle>
        This application helps you to manage your income and expenses.
      </Alert>
    </div>
  );
};

export default Home;

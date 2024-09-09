import { Button } from "@mui/material";
import React from "react";
import css from "@/styles/Donate.module.scss";

const DonateButton = () => {
  return (
    <>
      <Button variant="contained" className={css.donate}>
        <i className="fa-solid fa-hand-holding-dollar"></i> Donate
      </Button>
    </>
  );
};

export default DonateButton;

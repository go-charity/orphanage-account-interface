"use client";
import { Box, LinearProgress } from "@mui/material";
import React from "react";
import Logo from "./Logo";

const Loader = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff1f3",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 99,
        gap: "2rem",
      }}
    >
      <div style={{ transform: "scale(1.5)" }}>
        <Logo />
      </div>
      <Box sx={{ width: "300px" }} color={"#8a113c"}>
        <LinearProgress color={"inherit"} />
      </Box>
    </div>
  );
};

export default Loader;

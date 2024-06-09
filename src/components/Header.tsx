"use client";
import React from "react";
import css from "@/styles/Header.module.scss";
import { TextField, InputAdornment } from "@mui/material";
import dummyProfilePic from "@/assets/images/dummy-profile-pic.jpg";
import Image from "next/image";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className={css.header}>
      <Logo />
      <div className={css.right}>
        <div className={css.search_container}>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <i className="fas fa-search" />
                </InputAdornment>
              ),
            }}
            placeholder="Search for orphanages..."
          />
        </div>
        <div className={css.profile_link_container}>
          <Image
            width={35}
            height={35}
            src={dummyProfilePic.src}
            alt="John doe"
            className={css.profile_pic}
            style={{ borderRadius: "50%" }}
          />
          <span>Me</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

"use client";
import React from "react";
import css from "@/styles/Header.module.scss";
import logo from "@/assets/images/logo.png";
import { TextField, InputAdornment } from "@mui/material";
import dummyProfilePic from "@/assets/images/dummy-profile-pic.jpg";
import Image from "next/image";

const Header = () => {
  return (
    <header className={css.header}>
      <a
        href={process.env.NEXT_PUBLIC_HOMEPAGE_HOST}
        target="_blank"
        className={css.logo_container}
      >
        <img src={logo.src} alt="logo" className={css.logo} />
        <span className={css.name}>
          <span>GO</span>
          <span>Charity</span>
        </span>
      </a>
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

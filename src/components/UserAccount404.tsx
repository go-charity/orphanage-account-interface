"use client";
import React from "react";
import css from "@/styles/ErrorPage.module.scss";
import img404 from "@/assets/images/404.png";

const UserAccount404 = () => {
  return (
    <div>
      <img src={img404.src} className={css.error_page} alt="404 image" />
      <div className={css.content}>This page does not exist</div>
    </div>
  );
};

export default UserAccount404;

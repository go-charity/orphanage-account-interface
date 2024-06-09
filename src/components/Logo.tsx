import React from "react";
import css from "@/styles/Logo.module.scss";
import logo from "@/assets/images/logo.png";

const Logo = () => {
  return (
    <>
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
    </>
  );
};

export default Logo;

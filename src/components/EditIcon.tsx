import React from "react";
import css from "@/styles/EditIcon.module.scss";

const EditIcon: React.FC<
  {
    className?: string;
    style?: React.CSSProperties;
    icon?: string;
    iconStyle?: React.CSSProperties;
    background?: boolean;
    inverted?: boolean;
  } & React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
> = ({ className, style, icon, iconStyle, background, inverted, ...props }) => {
  return (
    <div
      className={` ${className} ${css.edit_icon} ${
        background ? css.background : null
      } ${inverted ? css.inverted : null}`}
      style={style}
      {...props}
    >
      <i className={`fas fa-pen edit ${icon}`} style={iconStyle}></i>
    </div>
  );
};

export default EditIcon;

import { DialogProps } from "@mui/material";
import React from "react";

export type SocialMediaHandleTypesType =
  | "twitter"
  | "facebook"
  | "whatsapp"
  | "instagram"
  | "linkedin";

export type ModalReducerType = {
  displayState: boolean;
  children: React.ReactNode | undefined;
  props?: DialogProps;
};

export type SelectorType = {
  modal: ModalReducerType;
};

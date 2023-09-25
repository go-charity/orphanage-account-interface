import { DialogProps } from "@mui/material";
import React from "react";
import { SocialMediaHandleClass } from "./utils/utils";

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

export type DescriptionType = { raw: string; text: string };

export type UserDetailsType = {
  name: string;
  tagline: string;
  phone_number: string;
  website: string;
  image: string;
  metadata: {
    background_cover_image: string;
    about: {
      text: { blocks: any[]; [x: string]: any };
    };
  };
  social_media_handles: SocialMediaHandleClass[];
};

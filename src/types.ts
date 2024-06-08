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
  orphanageDetails: OrphanageDetailsReducerType;
};

export type DescriptionType = { raw: string; text: string };

export type OrphanageDetailsType = {
  fullname: string | undefined;
  tagline: string | undefined;
  phone_number: string | undefined;
  website: string | undefined;
  image: string | undefined;
  location: OrphanageLocationType | undefined;
  metadata: {
    cover_image: string | undefined;
  };
  about:
    | {
        text: string;
        raw: string;
      }
    | undefined;
  social_media_handles: SocialMediaHandleClass[];
};

export type OrphanageDetailsReducerType = {
  details: OrphanageDetailsType;
  metadata: {
    fetching: boolean | undefined;
    errorFetching:
      | {
          state: boolean;
          error: { status: number; message: string } | undefined;
        }
      | undefined;
    isUser: boolean | undefined;
  };
};

export type OrphanageLocationType = {
  lat: number;
  lng: number;
  metadata: {
    address: string;
  };
};

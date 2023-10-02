import { OrphanageDetailsType } from "@/types";
import { SocialMediaHandleClass } from "@/utils/utils";
import { createSlice } from "@reduxjs/toolkit";

const initialState: OrphanageDetailsType = {
  about: { text: "", raw: "" },
  image: "",
  metadata: { cover_image: "" },
  name: "",
  phone_number: "",
  social_media_handles: [],
  tagline: "",
  website: "",
};

const orphanageDetailsSlice = createSlice({
  name: "Orphanage details",
  initialState,
  reducers: {
    fillUserDetails: (
      state,
      { payload }: { payload: OrphanageDetailsType }
    ) => {
      state.about = payload.about;
      state.image = payload.image;
      state.name = payload.name;
      state.phone_number = payload.phone_number;
      state.social_media_handles = payload.social_media_handles;
      state.tagline = payload.tagline;
      state.website = payload.website;
      state.metadata.cover_image = payload.metadata.cover_image;
    },
    editAbout: (state, { payload }: { payload: { text: ""; raw: "" } }) => {
      state.about = payload;
    },
    editImage: (state, { payload }: { payload: string }) => {
      state.image = payload;
    },
    editName: (state, { payload }: { payload: string }) => {
      state.name = payload;
    },
    editPhoneNumber: (state, { payload }: { payload: string }) => {
      state.phone_number = payload;
    },
    editTagline: (state, { payload }: { payload: string }) => {
      state.tagline = payload;
    },
    editWebsite: (state, { payload }: { payload: string }) => {
      state.website = payload;
    },
    editCoverImage: (state, { payload }: { payload: string }) => {
      state.metadata.cover_image = payload;
    },
    addSocialMediaHandle: (
      state,
      { payload }: { payload: SocialMediaHandleClass }
    ) => {
      state.social_media_handles.push(payload);
    },
    editSocialMediaHandle: (
      state,
      { payload }: { payload: SocialMediaHandleClass }
    ) => {
      const index = state.social_media_handles.findIndex(
        (handle) => payload.type === handle.type
      );

      if (index === -1) return;

      state.social_media_handles[index] = {
        type: payload.type,
        link: payload.link,
      };
    },
    deleteSocialMediaHandle: (state, { payload }: { payload: string }) => {
      state.social_media_handles = state.social_media_handles.filter(
        (handle) => handle.type !== payload
      );
    },
  },
});

import {
  AddOrphanageProjectType,
  OrphanageDetailsReducerType,
  OrphanageDetailsType,
  OrphanageLocationType,
} from "@/types";
import { orphanageBackendInstance } from "@/utils/interceptors";
import { SocialMediaHandleClass } from "@/utils/utils";
import { AnyAction, Dispatch, createSlice } from "@reduxjs/toolkit";
import { orphanageDetailsActions } from "./store";

const initialState: OrphanageDetailsReducerType = {
  details: {
    about: undefined,
    image: undefined,
    metadata: { cover_image: undefined },
    fullname: undefined,
    phone_number: undefined,
    social_media_handles: [],
    tagline: undefined,
    website: undefined,
    location: undefined,
    email: undefined,
    projects: [],
  },
  metadata: {
    fetching: undefined,
    errorFetching: undefined,
    isUser: undefined,
  },
};

const orphanageDetailsSlice = createSlice({
  name: "Orphanage details",
  initialState,
  reducers: {
    fillUserDetails: (
      state,
      { payload }: { payload: OrphanageDetailsType }
    ) => {
      state.details.about = payload.about;
      state.details.image = payload.image;
      state.details.fullname = payload.fullname;
      state.details.phone_number = payload.phone_number;
      state.details.social_media_handles = payload.social_media_handles;
      state.details.location = payload.location;
      state.details.tagline = payload.tagline;
      state.details.website = payload.website;
      state.details.metadata.cover_image = payload.metadata.cover_image;
      state.details.projects = payload.projects;
    },
    editAbout: (
      state,
      { payload }: { payload: { text: string; raw: string } }
    ) => {
      state.details.about = payload;
    },
    editImage: (state, { payload }: { payload: string }) => {
      state.details.image = payload;
    },
    editName: (state, { payload }: { payload: string }) => {
      state.details.fullname = payload;
    },
    editPhoneNumber: (state, { payload }: { payload: string }) => {
      state.details.phone_number = payload;
    },
    editTagline: (state, { payload }: { payload: string }) => {
      state.details.tagline = payload;
    },
    editWebsite: (state, { payload }: { payload: string }) => {
      state.details.website = payload;
    },
    editCoverImage: (state, { payload }: { payload: string }) => {
      state.details.metadata.cover_image = payload;
    },
    addSocialMediaHandle: (
      state,
      { payload }: { payload: SocialMediaHandleClass }
    ) => {
      state.details.social_media_handles.push(payload);
    },
    editSocialMediaHandle: (
      state,
      { payload }: { payload: SocialMediaHandleClass }
    ) => {
      const index = state.details.social_media_handles.findIndex(
        (handle) => payload.name === handle.name
      );

      if (index === -1) return;

      state.details.social_media_handles[index] = {
        name: payload.name,
        link: payload.link,
      };
    },
    editLocation: (state, { payload }: { payload: OrphanageLocationType }) => {
      state.details.location = payload;
    },
    deleteSocialMediaHandle: (state, { payload }: { payload: string }) => {
      state.details.social_media_handles =
        state.details.social_media_handles.filter(
          (handle) => handle.name !== payload
        );
    },
    toogleFetching: (state, { payload }: { payload: boolean }) => {
      state.metadata.fetching = payload;
    },
    toogleIsUser: (state, { payload }: { payload: boolean }) => {
      state.metadata.isUser = payload;
    },
    toogleError: (
      state,
      {
        payload,
      }: {
        payload: {
          state: boolean;
          error: { status: number; message: string } | undefined;
        };
      }
    ) => {
      state.metadata.errorFetching = payload;
    },
    addProject: (state, { payload }: { payload: AddOrphanageProjectType }) => {
      state.details.projects.push(payload);
    },
  },
});

export const fetchOrphanageDetailsAction = (id: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    // Set the loading state to true and the error state to false
    dispatch(orphanageDetailsActions.toogleFetching(true));
    dispatch(orphanageDetailsActions.toogleIsUser(false));
    dispatch(
      orphanageDetailsActions.toogleError({ state: false, error: undefined })
    );

    try {
      // Try fetching the data from the endpoint
      const response = await orphanageBackendInstance.get<OrphanageDetailsType>(
        `/v1/${id}`
      );

      // If it returns a success response
      if (response.status === 200) {
        // Set the loading, isUser and error states to false and fill up the orphanage details with the response data
        dispatch(orphanageDetailsActions.fillUserDetails(response.data));
        console.log("Response data", response.data);
        dispatch(orphanageDetailsActions.toogleFetching(false));
        dispatch(
          orphanageDetailsActions.toogleIsUser(
            (response.headers?.["is-user"] === "true" ? true : false) || false
          )
        );
        dispatch(
          orphanageDetailsActions.toogleError({
            state: false,
            error: undefined,
          })
        );
      } else {
        // Set the loading state to false, but the error state to true
        dispatch(orphanageDetailsActions.toogleFetching(false));
        dispatch(orphanageDetailsActions.toogleIsUser(false));
        dispatch(
          orphanageDetailsActions.toogleError({
            state: true,
            error: { status: 500, message: "An error occurred" },
          })
        );
      }
    } catch (error: any) {
      // Set the loading state to false, but the error state to true
      dispatch(orphanageDetailsActions.toogleFetching(false));
      dispatch(orphanageDetailsActions.toogleIsUser(false));
      console.error("ERR: ", error);
      dispatch(
        orphanageDetailsActions.toogleError({
          state: true,
          error: {
            status: error?.response?.status || error?.status || 500,
            message: error?.response?.data || error?.message || error,
          },
        })
      );
    }
  };
};

export default orphanageDetailsSlice;

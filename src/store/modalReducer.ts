import { ModalReducerType } from "@/types";
import { DialogProps } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ModalReducerType = {
  displayState: false,
  children: undefined,
  props: undefined,
};

const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    show: (
      state,
      action: {
        payload:
          | React.ReactNode
          | { children: React.ReactNode; props?: DialogProps };
      }
    ) => {
      state.displayState = true;

      if (typeof action.payload === "object") {
        state.children = (action as any)?.payload?.children;
        state.props = (action as any)?.payload?.props;
      } else {
        state.children = action.payload;
        state.props = undefined;
      }
    },
    hide: (state) => {
      state.displayState = false;
    },
  },
});

export default modalSlice;

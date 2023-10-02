import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modalReducer";
import orphanageDetailsSlice from "./orphanageReducer";

const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
    orphanageDetails: orphanageDetailsSlice.reducer,
  },
});

export const modalActions = modalSlice.actions;
export const orphanageDetailsActions = orphanageDetailsSlice.actions;
export default store;

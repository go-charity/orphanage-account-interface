"use client";
import { modalActions } from "@/store/store";
import { ModalReducerType, SelectorType } from "@/types";
import { Dialog } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

const ModalHOC: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const modal = useSelector<SelectorType>(
    (state) => state.modal
  ) as ModalReducerType;
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(modalActions.hide());
  };

  return (
    <>
      <Dialog
        onClose={closeModal}
        {...(modal.props || {})}
        open={modal.displayState}
      >
        {children}
      </Dialog>
    </>
  );
};

export default ModalHOC;

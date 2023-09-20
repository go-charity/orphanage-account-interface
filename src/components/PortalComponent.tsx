"use client";
import { ModalReducerType, SelectorType } from "@/types";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import ModalHOC from "@/components/ModalHOC";

const PortalComponent = () => {
  const modal = useSelector<SelectorType>(
    (state) => state.modal
  ) as ModalReducerType;
  const [targetNode, setTargetNode] = useState<HTMLDivElement | undefined>(
    undefined
  );

  useEffect(() => {
    setTargetNode(document.getElementById("portal_dest") as HTMLDivElement);

    return () => {
      setTargetNode(undefined);
    };
  }, []);

  return (
    <>
      {modal.displayState &&
        modal.children &&
        targetNode &&
        createPortal(<ModalHOC>{modal.children}</ModalHOC>, targetNode)}
    </>
  );
};

export default PortalComponent;

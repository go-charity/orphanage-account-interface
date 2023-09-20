import { modalActions } from "@/store/store";
import { DescriptionType, ModalReducerType, SelectorType } from "@/types";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import css from "@/styles/EditOrphanageAboutSection.module.scss";
import { Editor, EditorState as EditorStateType } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState,
} from "draft-js";
import htmlToDraft from "html-to-draftjs";

const EditOrphanageAboutSection: React.FC<{
  existingDescription: DescriptionType;
}> = ({ existingDescription }) => {
  const [description, setDescription] = useState<any>(undefined);
  const modal = useSelector<SelectorType>(
    (state) => state.modal
  ) as ModalReducerType;
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(modalActions.hide());
  };

  const onDescriptionChange = (editorState: EditorStateType) => {
    setDescription(editorState);
  };

  const submitHandler = () => {
    const raw = convertToRaw(description.getCurrentContent());
    console.log("RAW: ", raw);
    console.log(
      "ARR: ",
      raw.blocks.map((obj) => obj.text)
    );
    console.log("STR: ", raw.blocks.map((obj) => obj.text).join(""));
    closeModal();
  };

  useEffect(() => {
    if (existingDescription.raw || existingDescription.text) {
      try {
        const contentDraft = JSON.parse(existingDescription.raw);
        const contentState = convertFromRaw(contentDraft);
        setDescription(EditorState.createWithContent(contentState));
      } catch (error: any) {
        const html = `<p>${existingDescription.text}</p>`;
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(
            contentBlock.contentBlocks
          );
          setDescription(EditorState.createWithContent(contentState));
        }
      }
    } else {
      setDescription(EditorState.createEmpty());
    }
  }, [existingDescription]);

  return (
    <>
      <DialogTitle
        sx={{ m: 0, p: 2 }}
        id="customized-dialog-title"
        className={css.edit_description_title}
      >
        Edit description
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={closeModal}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <i className="fas fa-xmark" />
      </IconButton>
      <DialogContent className={css.edit_description_content} dividers>
        {/* EDITOR */}
        <Editor
          editorState={description}
          toolbarClassName="toolbarClassName"
          wrapperClassName="demo-wrapper"
          editorClassName={css.editor}
          onEditorStateChange={onDescriptionChange}
        />
      </DialogContent>
      <DialogActions className={css.edit_description_actions}>
        <Button onClick={closeModal} color="error">
          Cancel
        </Button>
        <Button onClick={submitHandler} color="success">
          Save changes
        </Button>
      </DialogActions>
    </>
  );
};

export default EditOrphanageAboutSection;

import { modalActions } from "@/store/store";
import { DescriptionType, ModalReducerType, SelectorType } from "@/types";
import {
  Alert,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
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
import useAjaxRequest from "use-ajax-request";
import { orphanageBackendInstance } from "@/utils/interceptors";

const EditOrphanageAboutSection: React.FC<{
  existingDescription: DescriptionType;
}> = ({ existingDescription }) => {
  const [description, setDescription] = useState<any>(undefined);
  const [descriptionText, setDescriptionText] = useState("");
  const [descriptionError, setDescriptionError] = useState<{
    state: boolean;
    message: string | undefined;
  }>({ state: false, message: "" });
  const aboutDetailsIsValid =
    descriptionText
      ?.trim()
      ?.split(" ")
      ?.filter((word) => word !== "")?.length >= 50;
  const modal = useSelector<SelectorType>(
    (state) => state.modal
  ) as ModalReducerType;
  const dispatch = useDispatch();
  const {
    sendRequest: updateAboutDetails,
    data,
    isError,
    loading,
    resetData,
    resetError,
  } = useAjaxRequest({
    instance: orphanageBackendInstance,
    config: {
      url: "/v1/edit/about",
      method: "PUT",
    },
  });

  const closeModal = () => {
    dispatch(modalActions.hide());
  };

  const onDescriptionChange = (editorState: EditorStateType) => {
    setDescription(editorState);
    const raw = convertToRaw(editorState.getCurrentContent());
    const text = raw.blocks.map((obj) => obj.text).join("");

    setDescriptionText(text);
  };

  const saveChanges = async () => {
    const raw = convertToRaw(description.getCurrentContent());
    const text = raw.blocks.map((obj) => obj.text).join("");

    if (!aboutDetailsIsValid)
      return setDescriptionError({
        state: true,
        message: "About details must be greater or equal to 50 words",
      });

    if (!loading)
      await updateAboutDetails((res) => closeModal(), undefined, {
        raw: raw,
        text: text,
      });
  };

  useEffect(() => {
    if (existingDescription.raw || existingDescription.text) {
      try {
        const contentDraft = JSON.parse(existingDescription.raw);
        const contentState = convertFromRaw(contentDraft);
        setDescription(EditorState.createWithContent(contentState));
        setDescriptionText(
          contentDraft?.blocks?.map((obj: any) => obj?.text)?.join("")
        );
      } catch (error: any) {
        const html = `<p>${existingDescription.text}</p>`;
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(
            contentBlock.contentBlocks
          );
          setDescription(EditorState.createWithContent(contentState));
          setDescriptionText(existingDescription.text);
        }
      }
    } else {
      setDescription(EditorState.createEmpty());
      setDescriptionText("");
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
        <div className={css.word_count}>
          <span className={`${aboutDetailsIsValid ? css.more : css.less}`}>
            {
              descriptionText
                ?.trim()
                ?.split(" ")
                ?.filter((word) => word !== "")?.length
            }
            /50
          </span>
        </div>
        {descriptionError.state && (
          <div className={css.error}>{descriptionError.message}</div>
        )}
      </DialogContent>
      <DialogActions className={css.edit_description_actions}>
        <Button onClick={closeModal} color="error">
          Cancel
        </Button>
        <Button
          onClick={saveChanges}
          color="success"
          disabled={loading || !aboutDetailsIsValid}
        >
          {loading ? "Saving..." : "Save changes"}
        </Button>
      </DialogActions>
      {data && (
        <Snackbar
          open={data ? true : false}
          autoHideDuration={1000 * 6}
          onClose={resetData}
        >
          <Alert severity="success" onClose={resetData}>
            About details updated successfully{" "}
          </Alert>
        </Snackbar>
      )}
      {isError && (
        <Snackbar
          open={isError}
          autoHideDuration={1000 * 6}
          onClose={resetError}
        >
          <Alert severity="error" onClose={resetError}>
            Error updating about details. Please check your internet connection
            and try again...
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default EditOrphanageAboutSection;

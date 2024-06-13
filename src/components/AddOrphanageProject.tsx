import {
  Alert,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  IconButton,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import css from "@/styles/AddProject.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "@/store/store";
import { useInput } from "use-manage-form";
import {
  DescriptionType,
  ModalReducerType,
  OrphanageProjectImageType,
  SelectorType,
} from "@/types";
import { EditorContentType, ProjectImage } from "@/utils/utils";
import { v4 as uuidV4 } from "uuid";
import { Editor, EditorState as EditorStateType } from "react-draft-wysiwyg";
import {
  ContentState,
  EditorState,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import htmlToDraft from "html-to-draftjs";

const EachImage: FC<{
  image: OrphanageProjectImageType;
  updateImages: React.Dispatch<
    React.SetStateAction<OrphanageProjectImageType[]>
  >;
}> = ({ image, updateImages }) => {
  // * REMOVE THE UPLOADED IMAGE
  const removeImage: React.MouseEventHandler<HTMLButtonElement> = () => {
    updateImages((prevImages) =>
      prevImages.filter((oldImage) => oldImage.id !== image.id)
    );
  };

  return (
    <div className={css.img_container}>
      <img src={URL.createObjectURL(image.file)} alt={image.file.name} />
      <Fab
        size="small"
        color="error"
        aria-label="add"
        className={css.delete}
        onClick={removeImage}
      >
        <i className="fa-solid fa-trash" />
      </Fab>
    </div>
  );
};

const UploadImagesComponent: FC<{
  updateImages: React.Dispatch<
    React.SetStateAction<OrphanageProjectImageType[]>
  >;
  uploadedImages: OrphanageProjectImageType[];
}> = ({ uploadedImages, updateImages }) => {
  const [fileUploadError, setFileUploadError] = useState<{
    display: boolean;
    message: string | undefined;
  }>({ display: false, message: "" });

  // * DISPLAY ERROR IF UPLOADED FILE IS INVALID
  const displayFileUploadError = (message: string) => {
    setFileUploadError({ display: true, message });

    setTimeout(
      () => setFileUploadError({ display: false, message: undefined }),
      1000 * 10
    );
  };
  // * REMOVE DISPLAYED ERROR
  const removeFileUploadError = () => {
    setFileUploadError({ display: false, message: undefined });
  };
  // * VALIDATE THE UPLOADED FILE AND ADD IT TO THE LIST OF UPLOADED FILES IF SUCCESSFULL
  const onUploadFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const splitFileName = file.name.split(".");
    const ext = splitFileName[splitFileName.length - 1];

    const allowedExtensions = ["png", "jpg", "jpeg"];
    // * IF FILE EXTENSION IS INCORRECT, I.E. FILE IS NOT AN IMAGE
    if (!allowedExtensions.includes(ext || "")) {
      // Display error
      displayFileUploadError(
        `File must not be a valid image with any of the following extentions: ${allowedExtensions.join(
          ", "
        )}`
      );
      return;
    }
    // * IF IMAGE SIZE EXCEEDS 2MB
    if (file.size > 2 * 1024 * 1024) {
      // Display file too large error
      displayFileUploadError("Image must not exceed 2MB");
      return;
    }
    if (uploadedImages.length >= 5) {
      // Display file too large error
      displayFileUploadError("Only 5 images can be uploaded");
      return;
    }

    const image = new ProjectImage(uuidV4(), file);

    console.log("uploaded image", image);

    // * Add the uploaded image to the list of uploaded images
    updateImages((prev) => [...prev, image]);
    removeFileUploadError();
  };

  return (
    <>
      <div className={css.upload_image}>
        <div className={css.uploaded_images}>
          {uploadedImages.map((image) => (
            <EachImage
              image={image}
              updateImages={updateImages}
              key={image.id}
            ></EachImage>
          ))}
        </div>
        {uploadedImages.length < 5 && (
          <label htmlFor="addImage" className={css.upload_button}>
            <i className="fa-solid fa-plus"></i>
            <span>Add image</span>
            <input
              type="file"
              name="addImage"
              onChange={onUploadFile}
              id="addImage"
              hidden
            />
          </label>
        )}
      </div>
      {fileUploadError.display && (
        <>
          <Snackbar
            open={fileUploadError.display}
            autoHideDuration={1000 * 10}
            onClose={removeFileUploadError}
          >
            <Alert onClose={removeFileUploadError} severity="error">
              {fileUploadError.message}
            </Alert>
          </Snackbar>
        </>
      )}
    </>
  );
};

const ProjectDescription: FC<{
  existingDescription: DescriptionType | undefined;
  updateDescription: React.Dispatch<React.SetStateAction<DescriptionType>>;
}> = ({ existingDescription, updateDescription }) => {
  const [description, setDescription] = useState<any>(undefined);

  const onDescriptionChange = (editorState: EditorStateType) => {
    setDescription(editorState);
    const raw = convertToRaw(editorState.getCurrentContent());
    const text = raw.blocks.map((obj) => obj.text).join("");

    const modifiedDescription = new EditorContentType(
      JSON.stringify(raw),
      text
    );
    updateDescription(modifiedDescription);
  };

  useEffect(() => {
    if (existingDescription?.raw || existingDescription?.text) {
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
  }, []);

  return (
    <>
      <Editor
        editorState={description}
        toolbarClassName="toolbarClassName"
        wrapperClassName="demo-wrapper"
        editorClassName={css.editor}
        onEditorStateChange={onDescriptionChange}
        placeholder="Describe your project here..."
      />
    </>
  );
};

const AddOrphanageProject = () => {
  const dispatch = useDispatch();
  const {
    value: projectName,
    isValid: projectNameIsValid,
    inputIsInValid: projectNameInputIsInvalid,
    onBlur: onProjectNameBlur,
    onChange: onProjectNameChange,
    reset: resetProjectName,
  } = useInput<string>((value) =>
    value ? true : false && value?.trim() !== ""
  );
  const {
    value: projectGoal,
    isValid: projectGoalIsValid,
    inputIsInValid: projectGoalInputIsInvalid,
    onBlur: onProjectGoalBlur,
    onChange: onProjectGoalChange,
    reset: resetProjectGoal,
  } = useInput<string>((value) =>
    value ? true : false && !isNaN(Number(value))
  );
  const [images, setImages] = useState<OrphanageProjectImageType[]>([]);
  const [projectDescription, setProjectDescription] = useState<DescriptionType>(
    new EditorContentType("", "")
  );
  const descriptionDetailsIsValid =
    projectDescription.text
      ?.trim()
      ?.split(" ")
      ?.filter((word) => word !== "")?.length >= 50;

  const closeModal = () => {
    dispatch(modalActions.hide());
  };

  return (
    <>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Add project
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
      <DialogContent className={css.add_orphanage_project} dividers>
        <UploadImagesComponent
          uploadedImages={images}
          updateImages={setImages}
        />
        <TextField
          label="Name"
          placeholder="Enter the name of the project..."
          variant="filled"
          className={css.input}
          value={projectName}
          onChange={(e) => onProjectNameChange(e.target.value)}
          onBlur={onProjectNameBlur as any}
          error={projectNameInputIsInvalid}
          helperText={projectNameInputIsInvalid && "Input must not be empty"}
        />
        <ProjectDescription
          existingDescription={projectDescription}
          updateDescription={setProjectDescription}
        />
        <TextField
          label="Project goal"
          placeholder="Enter how much you hope to raise for this project..."
          variant="filled"
          className={css.input}
          value={projectGoal}
          type="number"
          onChange={(e) => onProjectGoalChange(e.target.value)}
          onBlur={onProjectGoalBlur as any}
          error={projectGoalInputIsInvalid}
          helperText={projectGoalInputIsInvalid && "Input must be a number"}
        />
      </DialogContent>
      <DialogActions className={css.edit_details_actions}>
        <Button onClick={closeModal} color="error">
          Cancel
        </Button>
        <Button onClick={() => {}} color="success" disabled={false}>
          {false ? "Saving..." : "Save changes"}
        </Button>
      </DialogActions>
    </>
  );
};

export default AddOrphanageProject;

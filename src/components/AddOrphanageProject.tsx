import {
  Alert,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  FormHelperText,
  IconButton,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import css from "@/styles/AddProject.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "@/store/store";
import { useForm, useInput } from "use-manage-form";
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
  error?: boolean;
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
      <div className={`${css.upload_image} ${css.error}`}>
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
        <span className={css.error_msg}>
          {"At least 1 image must be uploaded"}
        </span>
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
  updateDescription: Function;
  error?: boolean;
  descriptionIsValid: boolean;
  onDescriptionBlur: Function;
  toogleClearEditor: boolean;
}> = ({
  existingDescription,
  updateDescription,
  error,
  descriptionIsValid,
  onDescriptionBlur,
  toogleClearEditor,
}) => {
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

  useEffect(() => {
    setDescription(EditorState.createEmpty());
  }, [toogleClearEditor]);

  return (
    <div className={`${css.editor_wrapper} ${error ? css.error : ""}`}>
      <Editor
        editorState={description}
        toolbarClassName="toolbarClassName"
        wrapperClassName="demo-wrapper"
        editorClassName={css.editor}
        onEditorStateChange={onDescriptionChange}
        onBlur={onDescriptionBlur as any}
        placeholder="Describe your project here..."
      />
      <div className={css.sub_content}>
        {error && (
          <span className={css.error_msg}>
            Input must be greater than 50 words
          </span>
        )}
        <span className={css.word_count}>
          <span className={`${descriptionIsValid ? css.more : css.less}`}>
            {
              existingDescription?.text
                ?.trim()
                ?.split(" ")
                ?.filter((word) => word !== "")?.length
            }
            /50
          </span>
        </span>
      </div>
    </div>
  );
};

const AddEditOrphanageProject = () => {
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
  const [imagesIsValid, setImagesIsValid] = useState(images.length > 0);
  const {
    value: projectDescription,
    isValid: projectDescriptionIsValid,
    inputIsInValid: projectDescriptionInputIsInvalid,
    onBlur: onProjectDescriptionBlur,
    onChange: onProjectDescriptionChange,
    reset: resetProjectDescription,
  } = useInput<DescriptionType>({
    validateFunction: (value) =>
      value
        ? value?.text
            ?.trim()
            ?.split(" ")
            ?.filter((word) => word !== "")?.length >= 50
        : false,
    defaultValue: new EditorContentType("", ""),
  });
  const [
    clearDescriptionEditorStateToogle,
    setClearDescriptionEditorStateToogle,
  ] = useState(false);

  const closeModal = () => {
    dispatch(modalActions.hide());
  };

  const { executeBlurHandlers, formIsValid, reset } = useForm({
    blurHandlers: [
      onProjectNameBlur,
      onProjectGoalBlur,
      onProjectDescriptionBlur,
    ],
    resetHandlers: [
      resetProjectName,
      resetProjectGoal,
      resetProjectDescription,
      () => setClearDescriptionEditorStateToogle((prev) => !prev),
      () => setImages([]),
    ],
    validateOptions: () =>
      projectNameIsValid &&
      projectGoalIsValid &&
      projectDescriptionIsValid &&
      imagesIsValid,
  });

  const submitHandler = () => {
    console.log("FORM IS VALID", formIsValid);
    console.log("description text", projectDescription?.text);
    if (!formIsValid) return executeBlurHandlers();

    reset();
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
          error={!imagesIsValid}
        />
        <TextField
          label="Name"
          placeholder="Enter the name of the project..."
          variant="filled"
          className={css.input}
          value={projectName}
          name="name"
          onChange={(e) => onProjectNameChange(e.target.value)}
          onBlur={onProjectNameBlur as any}
          error={projectNameInputIsInvalid}
          helperText={projectNameInputIsInvalid && "Input must not be empty"}
        />
        <ProjectDescription
          existingDescription={projectDescription}
          updateDescription={onProjectDescriptionChange}
          descriptionIsValid={projectDescriptionIsValid}
          onDescriptionBlur={onProjectDescriptionBlur}
          toogleClearEditor={clearDescriptionEditorStateToogle}
          error={projectDescriptionInputIsInvalid}
        />
        <TextField
          label="Project goal"
          placeholder="Enter how much you hope to raise for this project..."
          variant="filled"
          className={css.input}
          value={projectGoal}
          type="number"
          name="amount"
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
        <Button onClick={submitHandler} color="success" disabled={false}>
          {false ? "Adding..." : "Add project"}
        </Button>
      </DialogActions>
    </>
  );
};

export default AddEditOrphanageProject;

// Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, ab saepe, incidunt vitae molestiae quam, impedit quas odio eum aut blanditiis quaerat reiciendis dolores voluptate illo sit. Architecto sed, labore molestias commodi odit consequatur accusantium veritatis debitis laudantium earum laborum neque sapiente pariatur beatae illo ipsum distinctio dolore velit libero dicta? Ut doloremque incidunt ipsa ad possimus eum delectus ullam?

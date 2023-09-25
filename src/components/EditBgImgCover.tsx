import { modalActions } from "@/store/store";
import { ModalReducerType, SelectorType } from "@/types";
import {
  Alert,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import css from "@/styles/EditBgImgCover.module.scss";
import useAjaxRequest from "use-ajax-request";
import { orphanageBackendInstance } from "@/utils/interceptors";

const EditBgImgCover: React.FC<{ existingImg: string }> = ({ existingImg }) => {
  const modal = useSelector<SelectorType>(
    (state) => state.modal
  ) as ModalReducerType;
  const dispatch = useDispatch();
  const [fileUploadError, setFileUploadError] = useState<{
    display: boolean;
    message: string | undefined;
  }>({ display: false, message: "" });
  const [uploadedImage, setUploadedImage] = useState<string | undefined>(
    undefined
  );
  const [uploadedFile, setUploadedFile] = useState<File | undefined>(undefined);
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);
  const {
    sendRequest: updateImage,
    data: updateImageResponse,
    error: updateImageError,
    isError: updateImageHasError,
    loading: updatingImage,
    resetData: resetUpdateImageResponse,
    resetError: resetUpdateImageError,
  } = useAjaxRequest({
    instance: orphanageBackendInstance,
    config: {
      url: "/v1/edit/bg_image",
      method: "POST",
      headers: {
        ["Content-type"]: "multipart/formdata",
      },
    },
    options: {
      resetDataAfterSeconds: 6,
      resetErrorAfterSeconds: 6,
      resetDataOnSend: true,
    },
  });

  const displayFileUploadError = (message: string) => {
    setFileUploadError({ display: true, message });

    setTimeout(
      () => setFileUploadError({ display: false, message: undefined }),
      1000 * 10
    );
  };
  const removeFileUploadError = () => {
    setFileUploadError({ display: false, message: undefined });
  };

  const closeModal = () => {
    dispatch(modalActions.hide());
  };

  const saveChanges = async () => {
    if (uploadedFile && !fileUploadError.display && !updatingImage) {
      const requestData = new FormData();
      requestData.append("image", uploadedFile);
      await updateImage(
        (res) => {
          if (res.status === 200 || res.status === 201) {
            closeModal();
          }
        },
        undefined,
        requestData
      );
    }
  };

  const uploadFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const splitFileName = file.name.split(".");
    const ext = splitFileName[splitFileName.length - 1];

    const allowedExtensions = ["png", "jpg", "jpeg"];
    if (!allowedExtensions.includes(ext || "")) {
      // Display error
      displayFileUploadError(
        `File must not be a valid image with any of the following extentions: ${allowedExtensions.join(
          ", "
        )}`
      );
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      // Display file too large error
      displayFileUploadError("Image must not exceed 2MB");
      return;
    }
    // Convert uploaded file to URL blob
    const objectUrl = URL.createObjectURL(file);

    // Display the uploaded image to the user, clear any error concerning invalid file
    setUploadedImage(objectUrl);
    setUploadedFile(file);
    removeFileUploadError();
  };

  useEffect(() => {
    setIsMobile(window.innerWidth <= 500);
  }, []);

  return (
    <>
      <DialogTitle
        sx={{ m: 0, p: 2 }}
        id="customized-dialog-title"
        className={css.edit_bg_img_cover_title}
      >
        Edit background image cover
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
      <DialogContent className={css.edit_bg_img_cover_content} dividers>
        <img src={uploadedImage || existingImg} alt="bg img cover" />
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
      </DialogContent>
      <DialogActions className={css.edit_bg_img_cover_actions}>
        <Button onClick={closeModal} color="error">
          Cancel
        </Button>

        <div className={css.right}>
          <label htmlFor="upload_img">
            <input
              type="file"
              name="upload_img"
              hidden
              id="upload_img"
              onChange={uploadFile}
            />
            <div role="button" className={css.upload_img}>
              {isMobile ? "Upload" : "Upload file"}
            </div>
          </label>

          <Button
            onClick={saveChanges}
            disabled={
              (uploadedFile ? false : true) ||
              fileUploadError.display ||
              updatingImage
            }
            color="success"
          >
            {updatingImage ? (
              <>{isMobile ? "Saving" : "Saving changes"}</>
            ) : (
              <> {isMobile ? "Save" : "Save changes"}</>
            )}
          </Button>
        </div>
      </DialogActions>
      {updateImageResponse && (
        <Snackbar
          open={updateImageResponse ? true : false}
          autoHideDuration={1000 * 10}
          onClose={resetUpdateImageResponse}
        >
          <Alert onClose={resetUpdateImageResponse} severity="success">
            Image updated successfully
          </Alert>
        </Snackbar>
      )}
      {updateImageError && (
        <Snackbar
          open={updateImageHasError}
          autoHideDuration={1000 * 10}
          onClose={resetUpdateImageError}
        >
          <Alert onClose={resetUpdateImageError} severity="error">
            Image could not be uploaded, check your internet connection and try
            again!
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default EditBgImgCover;

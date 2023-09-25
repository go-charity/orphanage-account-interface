import { modalActions } from "@/store/store";
import {
  ModalReducerType,
  SelectorType,
  SocialMediaHandleTypesType,
} from "@/types";
import {
  Alert,
  Autocomplete,
  Avatar,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import css from "@/styles/EditIOrphanageAccountDetails.module.scss";
import { SocialMediaHandleClass } from "@/utils/utils";
import { useForm, useInput } from "use-manage-form";
import useAjaxRequest from "use-ajax-request";
import { orphanageBackendInstance } from "@/utils/interceptors";

const AddNewSocialMediaHandle: FC = () => {
  const [displayForm, setDisplayForm] = useState(false);
  const {
    value: handleType,
    isValid: typeIsValid,
    inputIsInValid: typeInputIsInvalid,
    onChange: onTypeChange,
    onBlur: onTypeBlur,
    reset: resetType,
  } = useInput<string>((value) =>
    value
      ? /(twitter|facebook|linkedin|whatsapp|instagram)/i.test(value?.trim())
      : false
  );
  const {
    value: link,
    isValid: linkIsValid,
    inputIsInValid: linkInputIsInvalid,
    onChange: onLinkChange,
    onBlur: onLinkBlur,
    reset: resetLink,
  } = useInput<string>((value) =>
    value ? /^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(value?.trim() as any) : false
  );

  const { formIsValid, reset, executeBlurHandlers } = useForm({
    blurHandlers: [onLinkBlur, onTypeBlur],
    resetHandlers: [resetLink, resetType],
    validateOptions: () => typeIsValid && linkIsValid,
  });

  const {
    sendRequest: createHandle,
    data,
    isError,
    loading,
    resetData,
    resetError,
  } = useAjaxRequest({
    instance: orphanageBackendInstance,
    config: {
      method: "PUT",
      url: "/v1/edit/social_media_handle",
      data: [
        {
          type: handleType,
          link: link,
        },
      ],
    },
    options: {
      resetDataAfterSeconds: 6,
      resetErrorAfterSeconds: 6,
    },
  });

  const addHandle = async () => {
    if (!formIsValid) return executeBlurHandlers();

    if (!loading) await createHandle((res) => setDisplayForm(false));
  };

  const availableTypes: SocialMediaHandleTypesType[] = [
    "facebook",
    "instagram",
    "linkedin",
    "twitter",
    "whatsapp",
  ];

  if (!displayForm)
    return (
      <>
        <Button color="primary" onClick={() => setDisplayForm(true)}>
          Add new
        </Button>
      </>
    );

  return (
    <>
      <div className={css.add_new_social_media_handler}>
        <h4>Add handle</h4>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          value={handleType}
          onChange={(e, value) => onTypeChange(value)}
          onBlur={onTypeBlur as any}
          options={availableTypes}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Type"
              placeholder="Enter the type of social media handle..."
              error={typeInputIsInvalid}
              helperText={
                typeInputIsInvalid &&
                "Input must equal one of the available handle types"
              }
            />
          )}
          className={css.input}
        />
        <TextField
          label="URL"
          placeholder="Enter the URL to your handle..."
          variant="outlined"
          type="url"
          className={css.input}
          value={link}
          onChange={(e) => onLinkChange(e.target.value)}
          onBlur={onLinkBlur as any}
          error={linkInputIsInvalid}
          helperText={linkInputIsInvalid && "Input must ba a valid URL"}
        />

        <div className={css.actions}>
          <Button color="error" onClick={() => setDisplayForm(false)}>
            Cancel
          </Button>
          <Button
            color="success"
            disabled={!formIsValid || loading}
            onClick={addHandle}
          >
            {loading ? "Adding..." : "Add"}
          </Button>
        </div>
      </div>
      {data && (
        <Snackbar
          open={data ? true : false}
          autoHideDuration={1000 * 6}
          onClose={resetData}
        >
          <Alert severity="success" onClose={resetData}>
            Handle created successfully{" "}
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
            Error creating handle. Please check your internet connection and try
            again...
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

const SocialMediaHandleItem: FC<{
  socialMediaHandle: SocialMediaHandleClass;
  displayEditComponent: React.Dispatch<
    React.SetStateAction<{
      socialMediaHandle: SocialMediaHandleClass | undefined;
      display: boolean;
    }>
  >;
}> = ({ socialMediaHandle, displayEditComponent }) => {
  const {
    sendRequest: deleteHandle,
    loading: deleting,
    data,
    resetData,
    resetError,
    isError,
  } = useAjaxRequest({
    instance: orphanageBackendInstance,
    config: { url: "/v1/edit/social_media_handle", method: "DELETE" },
  });

  const deleteSocialMediaHandle = async () => {
    if (!deleting) await deleteHandle();
  };

  return (
    <>
      <ListItem
        className={css.list_item}
        secondaryAction={
          <>
            <div className={css.actions}>
              <div
                className={css.edit}
                onClick={() =>
                  displayEditComponent({
                    socialMediaHandle: socialMediaHandle,
                    display: true,
                  })
                }
              >
                <i className="fas fa-pencil" />
              </div>
              <div
                className={css.delete}
                onClick={deleteSocialMediaHandle}
                role="button"
                aria-disabled={deleting}
              >
                {deleting ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  <i className="fas fa-trash" />
                )}
              </div>
            </div>
          </>
        }
      >
        <ListItemAvatar>
          <Avatar className={css.avatar}>
            <i className={`fa-brands fa-${socialMediaHandle.type}`} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={socialMediaHandle.type}
          secondary={socialMediaHandle.link}
        />
      </ListItem>
      {data && (
        <Snackbar
          open={data ? true : false}
          autoHideDuration={1000 * 6}
          onClose={resetData}
        >
          <Alert severity="success" onClose={resetData}>
            Handle deleted successfully{" "}
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
            Error deleting handle. Please check your internet connection and try
            again...
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

const EditSocialMediaHandle: FC<{
  socialMediaHandle: SocialMediaHandleClass;
  displayEditComponent: React.Dispatch<
    React.SetStateAction<{
      socialMediaHandle: SocialMediaHandleClass | undefined;
      display: boolean;
    }>
  >;
}> = ({ displayEditComponent, socialMediaHandle }) => {
  const {
    value: link,
    isValid: linkIsValid,
    inputIsInValid: linkInputIsInvalid,
    onChange: onLinkChange,
    onBlur: onLinkBlur,
    reset: resetLink,
  } = useInput<string>((value) =>
    value
      ? value?.trim() !== socialMediaHandle.link &&
        /^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(value?.trim() as any)
      : false
  );

  const {
    sendRequest: updateHandle,
    data,
    isError,
    loading,
    resetData,
    resetError,
  } = useAjaxRequest({
    instance: orphanageBackendInstance,
    config: {
      method: "PATCH",
      url: "/v1/edit/social_media_handle",
      data: [
        {
          type: socialMediaHandle.type,
          link: socialMediaHandle.link,
        },
      ],
    },
    options: {
      resetDataAfterSeconds: 6,
      resetErrorAfterSeconds: 6,
    },
  });

  const editHandle = async () => {
    if (!linkIsValid) return onLinkBlur();

    if (!loading)
      await updateHandle((res) =>
        displayEditComponent({ socialMediaHandle: undefined, display: false })
      );
  };

  useEffect(() => {
    onLinkChange(socialMediaHandle.link);
  }, [socialMediaHandle]);

  return (
    <>
      <div className={css.edit_new_social_media_handler}>
        <h4>Edit handle</h4>
        <span className={css.type}>
          <i className={`fa-brands fa-${socialMediaHandle.type}`} />{" "}
          {socialMediaHandle.type}
        </span>
        <TextField
          label="URL"
          placeholder="Enter the URL to your handle..."
          variant="outlined"
          type="url"
          className={css.input}
          value={link}
          onChange={(e) => onLinkChange(e.target.value)}
          onBlur={onLinkBlur as any}
          error={linkInputIsInvalid}
          helperText={
            linkInputIsInvalid &&
            "Input must not be same as the previous handle link and must be a valid URL"
          }
        />

        <div className={css.actions}>
          <Button
            color="error"
            onClick={() =>
              displayEditComponent({
                socialMediaHandle: undefined,
                display: false,
              })
            }
          >
            Cancel
          </Button>
          <Button
            color="success"
            disabled={!linkIsValid || loading}
            onClick={editHandle}
          >
            {loading ? "Updating..." : "Update"}
          </Button>
        </div>
      </div>
      {data && (
        <Snackbar
          open={data ? true : false}
          autoHideDuration={1000 * 6}
          onClose={resetData}
        >
          <Alert severity="success" onClose={resetData}>
            Handle updated successfully{" "}
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
            Error updating handle. Please check your internet connection and try
            again...
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

const SocialMediaHandlesSection: FC<{
  socialMediaHandles: SocialMediaHandleClass[];
}> = ({ socialMediaHandles }) => {
  const [displayEditSection, setDisplayEditSection] = useState<{
    socialMediaHandle: SocialMediaHandleClass | undefined;
    display: boolean;
  }>({ socialMediaHandle: undefined, display: false });
  return (
    <>
      <h5>SOCIAL MEDIA HANDLES</h5>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {socialMediaHandles.map((handle, i) => (
          <>
            <SocialMediaHandleItem
              socialMediaHandle={handle}
              displayEditComponent={setDisplayEditSection}
              key={i}
            />
          </>
        ))}
      </List>
      <AddNewSocialMediaHandle />
      {displayEditSection.display && displayEditSection.socialMediaHandle && (
        <EditSocialMediaHandle
          displayEditComponent={setDisplayEditSection}
          socialMediaHandle={displayEditSection.socialMediaHandle}
        />
      )}
    </>
  );
};

const EditOrphanageAccountDetails: FC<{
  existingDetails: {
    name: string | undefined;
    phone_number: string | undefined;
    tagline: string | undefined;
    website: string | undefined;
    social_media_handles: SocialMediaHandleClass[];
  };
}> = ({ existingDetails }) => {
  const modal = useSelector<SelectorType>(
    (state) => state.modal
  ) as ModalReducerType;
  const dispatch = useDispatch();
  const [socialMediaHandles, setSocialMediaHandles] = useState<
    SocialMediaHandleClass[]
  >([]);
  const closeModal = () => {
    dispatch(modalActions.hide());
  };

  const {
    value: name,
    isValid: nameIsValid,
    inputIsInValid: nameInputIsInvalid,
    onBlur: onNameBlur,
    onChange: onNameChange,
    reset: resetName,
  } = useInput<string>((value) =>
    value ? true : false && value?.trim() !== ""
  );

  const {
    value: phoneNumber,
    isValid: phoneNumberIsValid,
    inputIsInValid: phoneNumberInputIsInvalid,
    onBlur: onPhoneNumberBlur,
    onChange: onPhoneNumberChange,
    reset: resetPhoneNumber,
  } = useInput<string>((value) =>
    value
      ? value?.trim()?.length === 11 ||
        (value?.trim()?.includes("+234") && value?.trim()?.length === 14)
      : false
  );

  const {
    value: tagline,
    isValid: taglineIsValid,
    inputIsInValid: taglineInputIsInvalid,
    onBlur: onTaglineBlur,
    onChange: onTaglineChange,
    reset: resetTagline,
  } = useInput<string>((value) =>
    value ? true : false && value?.trim() !== ""
  );

  const {
    value: website,
    isValid: websiteIsValid,
    inputIsInValid: websiteInputIsInvalid,
    onBlur: onWebsiteBlur,
    onChange: onWebsiteChange,
    reset: resetWebsite,
  } = useInput<string>((value) =>
    value && value?.length > 0
      ? value?.trim() !== "" &&
        /^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(value?.trim() as any)
      : true
  );

  const { formIsValid, executeBlurHandlers, reset } = useForm({
    blurHandlers: [onNameBlur, onPhoneNumberBlur, onTaglineBlur, onWebsiteBlur],
    resetHandlers: [resetName, resetPhoneNumber, resetWebsite, resetTagline],
    validateOptions: () =>
      nameIsValid && phoneNumberIsValid && taglineIsValid && websiteIsValid,
  });

  const {
    sendRequest: updateDetails,
    data,
    loading,
    isError,
    resetData,
    resetError,
  } = useAjaxRequest({
    instance: orphanageBackendInstance,
    config: {
      url: "/v1/edit/details",
      method: "PUT",
      data: {
        name: name,
        tagline: tagline,
        phone_number: phoneNumber,
        website: website,
      },
    },
  });

  const saveChanges = async () => {
    if (!formIsValid) return executeBlurHandlers();

    // call API endpoint
    if (!loading) await updateDetails((res) => closeModal());
  };

  useEffect(() => {
    onNameChange(existingDetails.name);
    onTaglineChange(existingDetails.tagline);
    onPhoneNumberChange(existingDetails.phone_number);
    onWebsiteChange(existingDetails.website);
    setSocialMediaHandles([...existingDetails.social_media_handles]);
  }, [existingDetails]);

  return (
    <>
      <DialogTitle
        sx={{ m: 0, p: 2 }}
        id="customized-dialog-title"
        className={css.edit_details_title}
      >
        Edit your details
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
      <DialogContent className={css.edit_details_content} dividers>
        <TextField
          label="Name"
          placeholder="Enter the name of the orphanage..."
          variant="filled"
          className={css.input}
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          onBlur={onNameBlur as any}
          error={nameInputIsInvalid}
          helperText={nameInputIsInvalid && "Input must not be empty"}
        />
        <TextField
          label="Tagline"
          placeholder="Enter the tagline which will be displayed underneath the name..."
          variant="filled"
          className={css.input}
          value={tagline}
          onChange={(e) => onTaglineChange(e.target.value)}
          onBlur={onTaglineBlur as any}
          error={taglineInputIsInvalid}
          helperText={taglineInputIsInvalid && "Input must not be empty"}
        />
        <TextField
          label="Phone number"
          placeholder="Enter the number that will be used to reach you by donors..."
          variant="filled"
          className={css.input}
          value={phoneNumber}
          onChange={(e) => onPhoneNumberChange(e.target.value)}
          onBlur={onPhoneNumberBlur as any}
          error={phoneNumberInputIsInvalid}
          helperText={
            phoneNumberInputIsInvalid &&
            "Input must be a valid nigerian phone number. Input must be 11 characters long with the '0' prefix OR 14 characters long with the '+234' prefix"
          }
        />
        <TextField
          label="Website"
          placeholder="Enter the URL to your website if you have any..."
          variant="filled"
          className={css.input}
          value={website}
          onChange={(e) => onWebsiteChange(e.target.value)}
          onBlur={onWebsiteBlur as any}
          error={websiteInputIsInvalid}
          helperText={websiteInputIsInvalid && "Input must be a valid URL"}
        />
        <br />
        <SocialMediaHandlesSection socialMediaHandles={socialMediaHandles} />
      </DialogContent>
      <DialogActions className={css.edit_details_actions}>
        <Button onClick={closeModal} color="error">
          Cancel
        </Button>
        <Button onClick={saveChanges} color="success" disabled={loading}>
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
            User details updated successfully{" "}
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
            Error updating your details. Please check your internet connection
            and try again...
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default EditOrphanageAccountDetails;

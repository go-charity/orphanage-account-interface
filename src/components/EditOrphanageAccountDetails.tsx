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
import React, { FC, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import css from "@/styles/EditIOrphanageAccountDetails.module.scss";
import { socialMediaHandles } from "./OrphanageAccountDashboard";

const AddNewSocialMediaHandler: FC = () => {
  const [displayForm, setDisplayForm] = useState(false);
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
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={availableTypes}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Type"
              placeholder="Enter the type of social media handle..."
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
        />

        <div className={css.actions}>
          <Button color="error" onClick={() => setDisplayForm(false)}>
            Cancel
          </Button>
          <Button color="success">Add</Button>
        </div>
      </div>
    </>
  );
};

const EditOrphanageAccountDetails: React.FC<{ existingDetails: any }> = ({
  existingDetails,
}) => {
  const modal = useSelector<SelectorType>(
    (state) => state.modal
  ) as ModalReducerType;
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(modalActions.hide());
  };

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
          // id="filled-basic"
          label="Name"
          placeholder="Enter the name of the orphanage..."
          variant="filled"
          className={css.input}
        />
        <TextField
          // id="filled-basic"
          label="Tagline"
          placeholder="Enter the tagline which will be displayed underneath the name..."
          variant="filled"
          className={css.input}
        />
        <TextField
          // id="filled-basic"
          label="Phone number"
          placeholder="Enter the number that will be used to reach you by donors..."
          variant="filled"
          className={css.input}
        />
        <TextField
          // id="filled-basic"
          label="Website"
          placeholder="Enter the URL to your website if you have any..."
          variant="filled"
          className={css.input}
        />
        <br />
        <h5>SOCIAL MEDIA HANDLES</h5>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {socialMediaHandles.map((handle, i) => (
            <>
              <ListItem
                key={i}
                className={css.list_item}
                secondaryAction={
                  <>
                    <div className={css.actions}>
                      <div className={css.edit}>
                        <i className="fas fa-pencil" />
                      </div>
                      <div className={css.delete}>
                        <i className="fas fa-trash" />
                      </div>
                    </div>
                  </>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <i className={`fa-brands fa-${handle.type}`} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={handle.type} secondary={handle.link} />
              </ListItem>
            </>
          ))}
        </List>
        <AddNewSocialMediaHandler />
      </DialogContent>
      <DialogActions className={css.edit_details_actions}>
        <Button onClick={closeModal} color="error">
          Cancel
        </Button>
        <Button onClick={closeModal} color="success">
          Save changes
        </Button>
      </DialogActions>
    </>
  );
};

export default EditOrphanageAccountDetails;

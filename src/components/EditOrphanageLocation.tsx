import { modalActions } from "@/store/store";
import { ModalReducerType, SelectorType } from "@/types";
import {
  Autocomplete,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import css from "@/styles/EditOrphanageLocation.module.scss";
import { position } from "./OrphanageAccountDashboard";

const EditOrphanageLocation: React.FC<{
  existingLocation: { lat: number; lng: number } | undefined;
}> = ({ existingLocation }) => {
  const [places, setPlaces] = useState([]);
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
        className={css.edit_location_title}
      >
        Edit location
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
      <DialogContent className={css.edit_location_content} dividers>
        <div className={css.inner_content}>
          <Button
            variant="contained"
            color="primary"
            className={css.get_location}
          >
            Get my current location
          </Button>
          {/* <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={places}
            className={css.input}
            loading
            renderInput={(params) => (
              <TextField
                {...params}
                label="Address"
                placeholder="Search for your address..."
                className={css.input}
              />
            )}
          /> */}
        </div>
        <iframe
          src={
            "https://maps.google.com/maps?q=" +
            position.lat +
            "," +
            position.lng +
            "&t=&z=15&ie=UTF8&iwloc=&output=embed"
          }
          width="600"
          height="600"
          style={{ border: 0 }}
          className={css.map}
          loading="lazy"
          {...{ referrerpolicy: "no-referrer-when-downgrade" }}
          title="map"
        ></iframe>
      </DialogContent>
      <DialogActions className={css.edit_location_actions}>
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

export default EditOrphanageLocation;

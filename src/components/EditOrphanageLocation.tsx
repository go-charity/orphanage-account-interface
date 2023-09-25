import { modalActions } from "@/store/store";
import { ModalReducerType, SelectorType } from "@/types";
import {
  Alert,
  Autocomplete,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import css from "@/styles/EditOrphanageLocation.module.scss";
import { position } from "./OrphanageAccountDashboard";
import useAjaxRequest from "use-ajax-request";
import { orphanageBackendInstance } from "@/utils/interceptors";

const EditOrphanageLocation: React.FC<{
  existingLocation: { lat: number; lng: number } | undefined;
}> = ({ existingLocation }) => {
  const [places, setPlaces] = useState([]);
  const [currentLocation, setCurrentLocation] = useState<
    | {
        lat: number;
        lng: number;
      }
    | undefined
  >(undefined);
  const [geolocationError, setGeolocationError] = useState<{
    state: boolean;
    message: string | undefined;
  }>({ state: false, message: undefined });
  const modal = useSelector<SelectorType>(
    (state) => state.modal
  ) as ModalReducerType;
  const dispatch = useDispatch();
  const {
    sendRequest: updateLocation,
    data,
    isError,
    loading,
    resetData,
    resetError,
  } = useAjaxRequest({
    instance: orphanageBackendInstance,
    config: {
      url: "/v1/edit/location",
      method: "PUT",
      data: { lat: currentLocation?.lat, lng: currentLocation?.lng },
    },
  });

  const closeModal = () => {
    dispatch(modalActions.hide());
  };

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          setGeolocationError({
            state: true,
            message:
              err.message ||
              "An error occurred while getting your location, please try again",
          });
        }
      );
    } else {
      setGeolocationError({
        state: true,
        message:
          "Your browser doesn't support geo-location, please login on a device that supports geo-location and edit your location",
      });
    }
  };

  const saveChanges = async () => {
    if (!loading) await updateLocation((res) => closeModal());
  };

  useEffect(() => {
    setCurrentLocation(existingLocation);
  }, [existingLocation]);

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
            onClick={getLocation}
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
            currentLocation?.lat +
            "," +
            currentLocation?.lng +
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

        <Button onClick={saveChanges} disabled={loading} color="success">
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
            Location updated successfully{" "}
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
            Error updating location. Please check your internet connection and
            try again...
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default EditOrphanageLocation;

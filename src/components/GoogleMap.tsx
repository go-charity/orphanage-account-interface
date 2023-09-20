import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import React, { FC, ReactNode } from "react";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: -3.745,
  lng: -38.523,
};

const GoogleMapComponent: FC<{
  children?: ReactNode;
  center?: { lat: number; lng: number };
  style?: React.CSSProperties;
}> = ({ children, center, style }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center || defaultCenter);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={style || containerStyle}
      center={center || defaultCenter}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      {children}
    </GoogleMap>
  ) : (
    <>Loading...</>
  );
};

export default GoogleMapComponent;

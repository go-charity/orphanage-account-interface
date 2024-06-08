import axios from "axios";
import { getCookie, setCookie } from "cookies-next";

export const orphanageBackendInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_ORPHANAGE_BACKEND_HOST ||
    process.env.ORPHANAGE_BACKEND_HOST,
  withCredentials: true,
});

orphanageBackendInstance.interceptors.request.use(
  (config) => {
    const access_token = getCookie("access_token");
    const refresh_token = getCookie("refresh_token");

    config.headers["Api-key"] = window.btoa(
      process.env.NEXT_PUBLIC_ORPHANAGE_BACKEND_KEY as any
    );
    config.headers["Authorization"] = `Bearer ${access_token}`;
    config.headers["Refresh-token"] = refresh_token;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

orphanageBackendInstance.interceptors.response.use(
  (res) => {
    // res.headers["Access-token"] &&
    //   setCookie("access_token", res.headers["Access-token"], {
    //     path: "/",
    //     domain: process.env.NEXT_PUBLIC_GOCHARITY_API_DOMAIN,
    //     httpOnly: false,
    //     secure: true,
    //   });
    // res.headers["Refresh-token"] &&
    //   setCookie("refresh_token", res.headers["Refresh-token"], {
    //     path: "/",
    //     domain: process.env.NEXT_PUBLIC_GOCHARITY_API_DOMAIN,
    //     httpOnly: false,
    //     secure: true,
    //   });
    // res.headers["Access-token"] &&
    //   setCookie("local_access_token", res.headers["Access-token"], {
    //     path: "/",
    //     httpOnly: false,
    //     secure: true,
    //   });
    // res.headers["Refresh-token"] &&
    //   setCookie("local_refresh_token", res.headers["Refresh-token"], {
    //     path: "/",
    //     httpOnly: false,
    //     secure: true,
    //   });
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);

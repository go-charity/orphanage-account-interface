import axios from "axios";
import { cookies } from "next/headers";
import { convertTobase64 } from "./utils";

export const orphanageBackendInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_ORPHANAGE_BACKEND_HOST ||
    process.env.ORPHANAGE_BACKEND_HOST,
  withCredentials: true,
});

orphanageBackendInstance.interceptors.request.use(
  (config) => {
    const access_token = cookies().get("local_access_token");
    const refresh_token = cookies().get("local_refresh_token");

    config.headers["Api-key"] = convertTobase64(
      process.env.ORPHANAGE_BACKEND_KEY as any
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
    cookies().set("access_token", res.headers["Access-token"], {
      path: "/",
      domain: process.env.GOCHARITY_API_DOMAIN,
      httpOnly: false,
      secure: true,
    });
    cookies().set("refresh_token", res.headers["Refresh-token"], {
      path: "/",
      domain: process.env.GOCHARITY_API_DOMAIN,
      httpOnly: false,
      secure: true,
    });
    cookies().set("local_access_token", res.headers["Access-token"], {
      path: "/",
      httpOnly: false,
      secure: true,
    });
    cookies().set("local_refresh_token", res.headers["Refresh-token"], {
      path: "/",
      httpOnly: false,
      secure: true,
    });
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);

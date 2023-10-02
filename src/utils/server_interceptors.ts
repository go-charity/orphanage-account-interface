import axios from "axios";
import { cookies } from "next/headers";
import { convertTobase64 } from "@/utils/utils";

export const orphanageBackendInstance = axios.create({
  baseURL: process.env.ORPHANAGE_BACKEND_HOST,
  withCredentials: true,
});

orphanageBackendInstance.interceptors.request.use(
  (config) => {
    const myCookies = cookies();
    const access_token = myCookies.get("local_access_token");
    const refresh_token = myCookies.get("local_refresh_token");

    //! REMOVE
    console.log("ACCESS TOKEN: ", access_token?.value);
    console.log("REFRESH TOKEN: ", refresh_token?.value);

    config.headers["Api-key"] = convertTobase64(
      process.env.ORPHANAGE_BACKEND_KEY as any
    );
    config.headers["Authorization"] = `Bearer ${access_token?.value}`;
    config.headers["Refresh-token"] = refresh_token?.value;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

orphanageBackendInstance.interceptors.response.use(
  async (res) => {
    "use server";
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
  async (err) => {
    "use server";
    cookies().set("access_token", err?.response?.headers?.["Access-token"], {
      path: "/",
      domain: process.env.GOCHARITY_API_DOMAIN,
      httpOnly: false,
      secure: true,
    });
    cookies().set("refresh_token", err?.response?.headers?.["Refresh-token"], {
      path: "/",
      domain: process.env.GOCHARITY_API_DOMAIN,
      httpOnly: false,
      secure: true,
    });
    cookies().set(
      "local_access_token",
      err?.response?.headers?.["Access-token"],
      {
        path: "/",
        httpOnly: false,
        secure: true,
      }
    );
    cookies().set(
      "local_refresh_token",
      err?.response?.headers?.["Refresh-token"],
      {
        path: "/",
        httpOnly: false,
        secure: true,
      }
    );
    return Promise.reject(err);
  }
);

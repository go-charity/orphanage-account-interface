import OrphanageAccountDashboard from "@/components/OrphanageAccountDashboard";
import React from "react";
import css from "@/styles/OrphanageAccountDashboard.module.scss";
import { orphanageBackendInstance } from "@/utils/server_interceptors";
import { UserDetailsType } from "@/types";
import { redirect } from "next/navigation";
import UserAccount404 from "@/components/UserAccount404";
import UserAccountError from "@/components/UserAccountError";

const OrphanageAccountPage = async (req: { params: { id: string } }) => {
  // Get params
  const id = req.params.id;
  // Get details
  try {
    const response = await orphanageBackendInstance.get<UserDetailsType>(
      `/v1/${id}`
    );

    if (response.status !== 200)
      return (
        <>
          <UserAccount404 />
        </>
      );

    return (
      <section className={css.orphanage_account_dashboard_page}>
        <OrphanageAccountDashboard
          userDetails={response.data}
          isUser={response.headers["Is-user"] === "true" ? true : false}
        />
      </section>
    );
  } catch (error: any) {
    console.log(error?.message || error);

    if (error?.response?.status === 404)
      return (
        <>
          <UserAccount404 />
        </>
      );

    return (
      <>
        <UserAccountError />
      </>
    );
  }
};

export default OrphanageAccountPage;

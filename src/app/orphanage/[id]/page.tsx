import OrphanageAccountDashboard from "@/components/OrphanageAccountDashboard";
import React from "react";
import css from "@/styles/OrphanageAccountDashboard.module.scss";
import { orphanageBackendInstance } from "@/utils/server_interceptors";
import { UserDetailsType } from "@/types";
import { redirect } from "next/navigation";
import UserAccount404 from "@/components/UserAccount404";
import UserAccountError from "@/components/UserAccountError";

const OrphanageAccountPage = async (req: { params: { id: string } }) => {
  return (
    <section className={css.orphanage_account_dashboard_page}>
      <OrphanageAccountDashboard />
    </section>
  );
};

export default OrphanageAccountPage;

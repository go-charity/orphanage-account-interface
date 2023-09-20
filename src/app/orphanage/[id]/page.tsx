import OrphanageAccountDashboard from "@/components/OrphanageAccountDashboard";
import React from "react";
import css from "@/styles/OrphanageAccountDashboard.module.scss";

const OrphanageAccountPage = () => {
  return (
    <section className={css.orphanage_account_dashboard_page}>
      <OrphanageAccountDashboard />
    </section>
  );
};

export default OrphanageAccountPage;

import OrphanageAccountDashboard from "@/components/OrphanageAccountDashboard";
import React from "react";
import css from "@/styles/OrphanageAccountDashboard.module.scss";

const OrphanageAccountPage = async (req: { params: { id: string } }) => {
  return (
    <section className={css.orphanage_account_dashboard_page}>
      <OrphanageAccountDashboard id={req.params.id} />
    </section>
  );
};

export default OrphanageAccountPage;

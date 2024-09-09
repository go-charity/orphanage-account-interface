import { OrphanageProjectType } from "@/types";
import React, { FC, useState } from "react";
import css from "@/styles/EachProject.module.scss";
import Slider from "./Slider";
import { convert_textblock_to_html } from "@/utils/utils";
import Collapsible from "./Collapsibe";
import { Button, LinearProgress, linearProgressClasses } from "@mui/material";
import { EditIcon } from "./CustomIcons";
import Donate from "./Donate";
import DonateButton from "./Donate";

const EachProject: FC<{ project: OrphanageProjectType; is_user: boolean }> = ({
  project,
  is_user,
}) => {
  return (
    <div className={css.each_project}>
      {is_user && (
        <EditIcon className={css.edit} background onClick={() => {}} />
      )}
      <div className={css.img_container}>
        <Slider images={project.images} imageClassName={css.each_img} />
      </div>
      <div className={css.content_container}>
        <span className={css.title}>{project.name}</span>
        <Collapsible
          className={css.content}
          desc={convert_textblock_to_html(project.description)}
        ></Collapsible>
        <div className={css.action}>
          <div className={css.goal_container}>
            <span className={css.amount_raised}>NGN {(0).toFixed(2)}</span>
            &nbsp; raised out of NGN {project.goal.toFixed(2)} goal
            <LinearProgress
              variant="determinate"
              value={34.5}
              color="secondary"
              sx={() => ({
                [`&.${linearProgressClasses.colorSecondary}`]: {
                  borderRadius: 5,
                  height: 7.5,
                  backgroundColor: "#ffc0cb",
                },
                [`& .${linearProgressClasses.bar}`]: {
                  borderRadius: 5,
                  height: 7.5,
                  backgroundColor: "#8a113c",
                },
              })}
            />
          </div>
          {!is_user && <DonateButton />}
        </div>
      </div>
    </div>
  );
};

export default EachProject;

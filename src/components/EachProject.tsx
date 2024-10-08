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

const ImageCarousel: FC<{ images: string[] }> = ({ images }) => {
  const [currImg, setCurrImg] = useState(images[0]);

  return (
    <div className={css.img_carousel}>
      <img src={currImg} alt="img" className={css.curr_img} />
      <div className={css.thumbnail_container}>
        {images.map((img, i) => (
          <>
            <img
              src={img}
              key={i}
              alt={i.toString()}
              className={css.thumbnail}
              onClick={() => setCurrImg(img)}
            />
          </>
        ))}
      </div>
    </div>
  );
};

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
        <Slider
          images={project.images}
          className={css.slider}
          imageClassName={css.each_img}
        />
        <ImageCarousel images={project.images} />
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

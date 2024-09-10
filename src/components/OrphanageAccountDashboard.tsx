"use client";
import React, { FC, useState, useEffect } from "react";
import css from "@/styles/OrphanageAccountDashboard.module.scss";
import dummyProfilePic from "@/assets/images/dummy-profile-pic.jpg";
import bgImage from "@/assets/images/bg-image.jpg";
import { EditIcon, AddIcon } from "./CustomIcons";
import { Button, Fab } from "@mui/material";
import {
  convert_textblock_to_html,
  SocialMediaHandleClass,
} from "@/utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "@/store/store";
import EditBgImgCover from "./EditBgImgCover";
import EditImage from "./EditImage";
import EditOrphanageAccountDetails from "./EditOrphanageAccountDetails";
import EditOrphanageAboutSection from "./EditOrphanageAboutSection";
import {
  OrphanageDetailsReducerType,
  OrphanageDetailsType,
  SelectorType,
} from "@/types";
import EditOrphanageLocation from "./EditOrphanageLocation";
import { fetchOrphanageDetailsAction } from "@/store/orphanageReducer";
import UserAccountError from "./UserAccountError";
import UserAccount404 from "./UserAccount404";
import { useInView } from "react-intersection-observer";
import Loader from "./Loader";
import AddEditOrphanageProject from "./AddOrphanageProject";
import EachProject from "./EachProject";
import Collapsible from "./Collapsibe";
import DonateButton from "./Donate";

export const position = { lat: 6.5765376, lng: 3.3521664 };

export const socialMediaHandles = [
  new SocialMediaHandleClass("facebook", "https://facebook.com"),
  new SocialMediaHandleClass("twitter", "https://twitter.com"),
  new SocialMediaHandleClass("whatsapp", "https://whatsapp.com"),
  new SocialMediaHandleClass("instagram", "https://instagram.com"),
];

const SocialMediaHandles: FC<{ handle: SocialMediaHandleClass }> = ({
  handle,
}) => {
  return (
    <a
      href={handle.link}
      title={handle.name}
      className={css.social_media_handle}
      target="_blank"
    >
      <i className={`fa-brands fa-${handle.name}`}></i>
    </a>
  );
};
// ref={mainUtilityRef},
const Utilities = React.forwardRef<any, { format?: "vertical" | "horizontal" }>(
  ({ format }, ref) => {
    const orphanageDetails = useSelector<SelectorType>(
      (state) => state.orphanageDetails.details
    ) as OrphanageDetailsType;
    return (
      <div className={`${css.utilities} ${css[format || ""]}`} ref={ref}>
        <a href={`mailto://${orphanageDetails.email}`} title="mail">
          <Fab
            color="primary"
            size="small"
            aria-label="add"
            className={css.item}
            title="Mail"
          >
            <i className="fa-regular fa-envelope"></i>
          </Fab>
        </a>
        {orphanageDetails.phone_number && (
          <a href={`tel://${orphanageDetails.phone_number}`} title="call">
            <Fab
              color="primary"
              size="small"
              aria-label="add"
              className={css.item}
              title="Mail"
            >
              <i className="fa-solid fa-phone-volume"></i>
            </Fab>
          </a>
        )}
        <a href="#" title="schedule visitation">
          <Fab
            color="primary"
            size="small"
            aria-label="add"
            className={css.item}
            title="Mail"
          >
            <i className="fa-regular fa-calendar-days"></i>
          </Fab>
        </a>
        <a href="#" title="schedule zoom meeting">
          <Fab
            color="primary"
            size="small"
            aria-label="add"
            className={css.item}
            title="Mail"
          >
            <i className="fa-solid fa-video"></i>
          </Fab>
        </a>
        <a href="#" title="message">
          <Fab
            color="primary"
            size="small"
            aria-label="add"
            className={css.item}
            title="Mail"
          >
            <i className="fa-regular fa-comment-dots"></i>
          </Fab>
        </a>
      </div>
    );
  }
);

// const about =
//   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis odit, deserunt numquam nihil quod, eos quis minus rem cum similique sequi, est quae dicta blanditiis praesentium veritatis. Doloribus rerum commodi quidem veniam similique? Corporis ratione quod sint quidem. Ut, earum nesciunt! Fuga rem cupiditate fugit, necessitatibus, architecto sapiente laborum nostrum dolor iste consectetur nihil minima impedit dolores est, dignissimos nobis aut eveniet libero praesentium? Accusantium reiciendis totam culpa dolorum obcaecati delectus iste eaque neque? In alias saepe, necessitatibus dicta cupiditate voluptatem rerum iusto a perferendis porro ipsam omnis voluptates consequatur tempora, error incidunt ad quidem eligendi temporibus aspernatur? Odit sapiente, culpa, eveniet commodi distinctio qui id quas similique minus iste aut, minima accusantium maxime! Illo repudiandae, blanditiis unde modi quod nam sit neque accusantium dolorum inventore amet nisi. Est repellat eveniet minima ullam! Illum nam aperiam ex explicabo alias temporibus laudantium, praesentium natus eius quisquam iure ullam reprehenderit molestias, veritatis rem? Nihil illo officiis deserunt eum atque minima exercitationem praesentium debitis dolor natus quisquam labore voluptate velit alias, ea quod ducimus voluptatibus voluptatum dolores ipsam cumque veniam accusantium. Ea, ipsam iusto? Doloribus fugit autem distinctio. Eveniet error autem natus odit illo maxime possimus, minus quasi iusto nemo, sit consequatur fuga soluta, odio saepe itaque deserunt. Ducimus tempore natus ratione consequuntur laborum libero quia hic repudiandae numquam nulla? Saepe quos est totam obcaecati perspiciatis expedita minima debitis, reprehenderit repudiandae, modi libero ipsa hic tempore numquam quisquam ad ipsam at deleniti, officia neque placeat quibusdam dolorem officiis! Aspernatur natus obcaecati voluptatum officiis accusamus optio, facere beatae alias, nobis voluptatem assumenda. Id reiciendis, amet saepe magni commodi deleniti omnis vero fugiat quos. Aut earum in consequatur vitae tempora sequi deleniti rem quo. Cumque ipsa nostrum dicta perferendis recusandae excepturi! Ut labore laborum asperiores reiciendis soluta, libero cupiditate. Earum, tempore rem. Odio, ipsum quas! Molestiae harum quae ex officiis distinctio hic dolor, accusamus possimus cupiditate veniam suscipit sapiente quas commodi voluptatem quidem voluptates ad quibusdam maxime perspiciatis. Ipsum eos vero commodi aperiam libero obcaecati iste, ullam nam perspiciatis optio hic, doloribus rem molestiae error quis eum veritatis nesciunt similique quod. Hic dignissimos praesentium a sunt totam magnam eum sed architecto pariatur excepturi unde deleniti sapiente enim eveniet est vitae quidem, perferendis quos perspiciatis vero consequuntur. Consectetur impedit recusandae officiis sint magnam illum! Quo repudiandae est facilis voluptate nesciunt natus odio sequi, accusantium labore cupiditate totam. Eaque alias amet exercitationem officiis ratione cupiditate officia quis, animi omnis veritatis facere recusandae perspiciatis aperiam perferendis quam rem dolorum explicabo asperiores nihil ea! Facilis fuga praesentium cum, exercitationem possimus, placeat excepturi ratione blanditiis distinctio aliquam accusamus modi, quod aut optio corporis nemo ipsum? Beatae, corporis reiciendis officia non possimus dignissimos repellendus! Consectetur ipsum ab soluta excepturi illo eaque commodi nemo totam inventore. Quo porro labore mollitia tempore incidunt neque debitis ad nemo id nisi minima voluptas consectetur, perferendis temporibus distinctio? Maiores consectetur nihil fuga magni consequuntur quidem deserunt porro saepe vero. Optio mollitia repudiandae voluptate quis voluptatem, inventore aut saepe expedita maxime aliquam voluptates laudantium vero quae odio?";
const about = {
  raw: `{"blocks":[{"key":"fj3pu","text":"Lorem ipsum dolor sit amet consectetur adipisicing elit. ","type":"header-one","depth":0,"inlineStyleRanges":[{"offset":0,"length":57,"style":"color-rgb(0,0,0)"},{"offset":0,"length":57,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":57,"style":"fontfamily-__Poppins_Fallback_9d9b8c, __Poppins_Fallback_Fallback_9d9b8c"},{"offset":0,"length":57,"style":"fontsize-24"}],"entityRanges":[],"data":{}},{"key":"8h1k1","text":"Nobis odit, deserunt numquam nihil quod, eos quis minus rem cum similique sequi, est quae dicta blanditiis praesentium veritatis. Doloribus rerum commodi quidem veniam similique? Corporis ratione quod sint quidem. Ut, earum nesciunt! Fuga rem cupiditate fugit, necessitatibus, architecto sapiente laborum nostrum dolor iste consectetur nihil minima impedit dolores est, dignissimos nobis aut eveniet libero praesentium? Accusantium reiciendis totam culpa dolorum obcaecati delectus iste eaque neque? In alias saepe, necessitatibus dicta cupiditate voluptatem rerum iusto a perferendis porro ipsam omnis voluptates consequatur tempora, error incidunt ad quidem eligendi temporibus aspernatur? Odit sapiente, culpa, eveniet commodi distinctio qui id quas similique minus iste aut, minima accusantium maxime! Illo repudiandae, blanditiis unde modi quod nam sit neque accusantium dolorum inventore amet nisi. Est repellat eveniet minima ullam! Illum nam aperiam ex explicabo alias temporibus laudantium, praesentium natus eius quisquam iure ullam reprehenderit molestias, veritatis rem? Nihil illo officiis deserunt eum atque minima exercitationem praesentium debitis dolor natus quisquam labore voluptate velit alias, ea quod ducimus voluptatibus voluptatum dolores ipsam cumque veniam accusantium. Ea, ipsam iusto? Doloribus fugit autem distinctio. Eveniet error autem natus odit illo maxime possimus, minus quasi iusto nemo, sit consequatur fuga soluta, odio saepe itaque deserunt. Ducimus tempore natus ratione consequuntur laborum libero quia hic repudiandae numquam nulla? Saepe quos est totam obcaecati perspiciatis expedita minima debitis, reprehenderit repudiandae, modi libero ipsa hic tempore numquam quisquam ad ipsam at deleniti, officia neque placeat quibusdam dolorem officiis! Aspernatur natus obcaecati voluptatum officiis accusamus optio, facere beatae alias, nobis voluptatem assumenda. Id reiciendis, amet saepe magni commodi deleniti omnis vero fugiat quos. Aut earum in consequatur vitae tempora sequi deleniti rem quo. Cumque ipsa nostrum dicta perferendis recusandae excepturi! Ut labore laborum asperiores reiciendis soluta, libero cupiditate. Earum, tempore rem. Odio, ipsum quas! Molestiae harum quae ex officiis distinctio hic dolor, accusamus possimus cupiditate veniam suscipit sapiente quas commodi voluptatem quidem voluptates ad quibusdam maxime perspiciatis. Ipsum eos vero commodi aperiam libero obcaecati iste, ullam nam perspiciatis optio hic, doloribus rem molestiae error quis eum veritatis nesciunt similique quod. Hic dignissimos praesentium a sunt totam magnam eum sed architecto pariatur excepturi unde deleniti sapiente enim eveniet est vitae quidem, perferendis quos perspiciatis vero consequuntur. Consectetur impedit recusandae officiis sint magnam illum! Quo repudiandae est facilis voluptate nesciunt natus odio sequi, accusantium labore cupiditate totam. Eaque alias amet exercitationem officiis ratione cupiditate officia quis, animi omnis veritatis facere recusandae perspiciatis aperiam perferendis quam rem dolorum explicabo asperiores nihil ea! Facilis fuga praesentium cum, exercitationem possimus, placeat excepturi ratione blanditiis distinctio aliquam accusamus modi, quod aut optio corporis nemo ipsum? Beatae, corporis reiciendis officia non possimus dignissimos repellendus! Consectetur ipsum ab soluta excepturi illo eaque commodi nemo totam inventore. Quo porro labore mollitia tempore incidunt neque debitis ad nemo id nisi minima voluptas consectetur, perferendis temporibus distinctio? Maiores consectetur nihil fuga magni consequuntur quidem deserunt porro saepe vero. Optio mollitia repudiandae voluptate quis voluptatem, inventore aut saepe expedita maxime aliquam voluptates laudantium vero quae odio? ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":3768,"style":"color-rgb(0,0,0)"},{"offset":0,"length":3768,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":3768,"style":"fontsize-14"},{"offset":0,"length":3768,"style":"fontfamily-__Poppins_Fallback_9d9b8c, __Poppins_Fallback_Fallback_9d9b8c"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
  text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis odit, deserunt numquam nihil quod, eos quis minus rem cum similique sequi, est quae dicta blanditiis praesentium veritatis. Doloribus rerum commodi quidem veniam similique? Corporis ratione quod sint quidem. Ut, earum nesciunt! Fuga rem cupiditate fugit, necessitatibus, architecto sapiente laborum nostrum dolor iste consectetur nihil minima impedit dolores est, dignissimos nobis aut eveniet libero praesentium? Accusantium reiciendis totam culpa dolorum obcaecati delectus iste eaque neque? In alias saepe, necessitatibus dicta cupiditate voluptatem rerum iusto a perferendis porro ipsam omnis voluptates consequatur tempora, error incidunt ad quidem eligendi temporibus aspernatur? Odit sapiente, culpa, eveniet commodi distinctio qui id quas similique minus iste aut, minima accusantium maxime! Illo repudiandae, blanditiis unde modi quod nam sit neque accusantium dolorum inventore amet nisi. Est repellat eveniet minima ullam! Illum nam aperiam ex explicabo alias temporibus laudantium, praesentium natus eius quisquam iure ullam reprehenderit molestias, veritatis rem? Nihil illo officiis deserunt eum atque minima exercitationem praesentium debitis dolor natus quisquam labore voluptate velit alias, ea quod ducimus voluptatibus voluptatum dolores ipsam cumque veniam accusantium. Ea, ipsam iusto? Doloribus fugit autem distinctio. Eveniet error autem natus odit illo maxime possimus, minus quasi iusto nemo, sit consequatur fuga soluta, odio saepe itaque deserunt. Ducimus tempore natus ratione consequuntur laborum libero quia hic repudiandae numquam nulla? Saepe quos est totam obcaecati perspiciatis expedita minima debitis, reprehenderit repudiandae, modi libero ipsa hic tempore numquam quisquam ad ipsam at deleniti, officia neque placeat quibusdam dolorem officiis! Aspernatur natus obcaecati voluptatum officiis accusamus optio, facere beatae alias, nobis voluptatem assumenda. Id reiciendis, amet saepe magni commodi deleniti omnis vero fugiat quos. Aut earum in consequatur vitae tempora sequi deleniti rem quo. Cumque ipsa nostrum dicta perferendis recusandae excepturi! Ut labore laborum asperiores reiciendis soluta, libero cupiditate. Earum, tempore rem. Odio, ipsum quas! Molestiae harum quae ex officiis distinctio hic dolor, accusamus possimus cupiditate veniam suscipit sapiente quas commodi voluptatem quidem voluptates ad quibusdam maxime perspiciatis. Ipsum eos vero commodi aperiam libero obcaecati iste, ullam nam perspiciatis optio hic, doloribus rem molestiae error quis eum veritatis nesciunt similique quod. Hic dignissimos praesentium a sunt totam magnam eum sed architecto pariatur excepturi unde deleniti sapiente enim eveniet est vitae quidem, perferendis quos perspiciatis vero consequuntur. Consectetur impedit recusandae officiis sint magnam illum! Quo repudiandae est facilis voluptate nesciunt natus odio sequi, accusantium labore cupiditate totam. Eaque alias amet exercitationem officiis ratione cupiditate officia quis, animi omnis veritatis facere recusandae perspiciatis aperiam perferendis quam rem dolorum explicabo asperiores nihil ea! Facilis fuga praesentium cum, exercitationem possimus, placeat excepturi ratione blanditiis distinctio aliquam accusamus modi, quod aut optio corporis nemo ipsum? Beatae, corporis reiciendis officia non possimus dignissimos repellendus! Consectetur ipsum ab soluta excepturi illo eaque commodi nemo totam inventore. Quo porro labore mollitia tempore incidunt neque debitis ad nemo id nisi minima voluptas consectetur, perferendis temporibus distinctio? Maiores consectetur nihil fuga magni consequuntur quidem deserunt porro saepe vero. Optio mollitia repudiandae voluptate quis voluptatem, inventore aut saepe expedita maxime aliquam voluptates laudantium vero quae odio?`,
};

const OrphanageAccountDashboard: FC<{ id: string }> = ({ id }) => {
  const dispatch = useDispatch();
  const orphanageDetails = useSelector<SelectorType>(
    (state) => state.orphanageDetails
  ) as OrphanageDetailsReducerType;
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);
  const [mainUtilityRef, mainUtilityInView] = useInView();
  const [mobileUtilityRef, mobileUtilityInView] = useInView();

  const editBgImageCover = () => {
    dispatch(
      modalActions.show({
        children: (
          <EditBgImgCover
            existingImg={orphanageDetails.details.metadata.cover_image}
          />
        ),
        props: {
          maxWidth: !isMobile ? "md" : "lg",
          open: true,
          fullWidth: true,
        },
      })
    );
  };
  const editImage = () => {
    dispatch(
      modalActions.show({
        children: <EditImage existingImg={orphanageDetails.details.image} />,
        props: {
          maxWidth: !isMobile ? "sm" : "lg",
          open: true,
          fullWidth: true,
        },
      })
    );
  };
  const editDetails = () => {
    dispatch(
      modalActions.show({
        children: (
          <EditOrphanageAccountDetails
            existingDetails={{
              fullname: orphanageDetails.details.fullname,
              phone_number: orphanageDetails.details.phone_number,
              tagline: orphanageDetails.details.tagline,
              website: orphanageDetails.details.website,
              social_media_handles:
                orphanageDetails.details.social_media_handles,
            }}
          />
        ),
        props: {
          maxWidth: !isMobile ? "sm" : "lg",
          open: true,
          fullWidth: true,
        },
      })
    );
  };
  const editAbout = () => {
    dispatch(
      modalActions.show({
        children: (
          <EditOrphanageAboutSection
            existingDescription={orphanageDetails.details.about}
          />
        ),
        props: {
          maxWidth: !isMobile ? "sm" : "lg",
          open: true,
          fullWidth: true,
        },
      })
    );
  };
  const addProject = () => {
    dispatch(
      modalActions.show({
        children: <AddEditOrphanageProject />,
        props: {
          maxWidth: !isMobile ? "sm" : "lg",
          open: true,
          fullWidth: true,
        },
      })
    );
  };
  const editLocation = () => {
    dispatch(
      modalActions.show({
        children: (
          <EditOrphanageLocation
            existingLocation={orphanageDetails.details.location}
          />
        ),
        props: { maxWidth: "sm", open: true, fullWidth: true },
      })
    );
  };

  useEffect(() => {
    setIsMobile(window.innerWidth <= 500);
    dispatch(fetchOrphanageDetailsAction(id) as any);
  }, []);

  if (
    orphanageDetails.metadata.fetching === true ||
    orphanageDetails.metadata.fetching === undefined
  ) {
    return (
      <>
        <Loader />
      </>
    );
  }

  if (orphanageDetails.metadata.errorFetching?.state === true) {
    if (
      [400, 401, 500].includes(
        orphanageDetails.metadata.errorFetching.error?.status as any
      )
    ) {
      console.log(
        "ERROR: ",
        orphanageDetails.metadata.errorFetching.error?.message
      );
      return <UserAccountError />;
    }

    if (
      [404].includes(
        orphanageDetails.metadata.errorFetching.error?.status as any
      )
    ) {
      console.log(
        "ERROR: ",
        orphanageDetails.metadata.errorFetching.error?.message
      );
      return <UserAccount404 />;
    }
  }

  return (
    <section className={css.orphanage_account_dashboard}>
      {/* // * SIDE MENU */}
      <div className={css.side_menu}>
        <Fab
          color="primary"
          size="small"
          aria-label="add"
          className={css.item}
          title="Change password"
        >
          <i className="fa-solid fa-key" />
        </Fab>
        <Fab
          color="primary"
          size="small"
          aria-label="billing"
          className={css.item}
          title="Change payment account details"
        >
          <i className="fa-solid fa-money-bills"></i>
        </Fab>

        {!mainUtilityInView && !mobileUtilityInView && (
          <>
            <br />
            <Utilities format="vertical" />
          </>
        )}
      </div>
      {/* // * MAIN SECTION */}
      <div className={css.sections_container}>
        {/* // * ANALYTICS SECTION */}
        <div className={css.analytics_section}>
          <span>Analytics and overview</span>
          <span>
            Profile view in the last 7 days <b>1,000</b>
          </span>
        </div>
        {/* // * PROFILE SECTION */}
        <div className={css.profile_section}>
          <div className={css.img_section}>
            <div className={css.bg_img_container}>
              <img
                src={
                  orphanageDetails.details.metadata.cover_image || bgImage.src
                }
                alt="Background"
              />
              {orphanageDetails.metadata.isUser && (
                <EditIcon
                  className={css.edit}
                  background
                  onClick={editBgImageCover}
                />
              )}
            </div>
            <div className={css.profile_img_container}>
              <img
                src={orphanageDetails.details.image || dummyProfilePic.src}
                alt={orphanageDetails.details.fullname}
              />
              {orphanageDetails.metadata.isUser && (
                <EditIcon className={css.edit} background onClick={editImage} />
              )}
            </div>
          </div>
          <div className={css.details_section}>
            {orphanageDetails.metadata.isUser && (
              <EditIcon className={css.edit} background onClick={editDetails} />
            )}
            <div className={css.left}>
              <div className={css.name_container}>
                <span className={css.name}>
                  {orphanageDetails.details.fullname}
                </span>
                <span className={css.tagline}>
                  {orphanageDetails.details.tagline}
                </span>
              </div>
              <div className={css.external_links}>
                {orphanageDetails.details.website && (
                  <span className={css.website}>
                    <i className="fa-solid fa-globe"></i>{" "}
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      {orphanageDetails.details.website}
                    </a>
                  </span>
                )}
                <nav className={css.social_media_handles}>
                  {orphanageDetails.details?.social_media_handles?.map(
                    (handle, i) => (
                      <SocialMediaHandles handle={handle} key={i} />
                    )
                  )}
                </nav>
              </div>
              <div className={css.utilities_container}>
                <Utilities ref={mobileUtilityRef} format="horizontal" />
              </div>
              {!orphanageDetails.metadata.isUser && (
                <div className={css.action}>
                  <DonateButton />
                </div>
              )}
            </div>
            <div className={css.right}>
              <Utilities ref={mainUtilityRef} />
            </div>
          </div>
        </div>
        {/* // * ABOUT SECTION */}
        <div className={css.about_section} id="about">
          {orphanageDetails.metadata.isUser && (
            <EditIcon className={css.edit} background onClick={editAbout} />
          )}
          <span>About</span>
          {orphanageDetails?.details?.about ? (
            <Collapsible
              desc={convert_textblock_to_html(orphanageDetails.details.about)}
            />
          ) : (
            <div className={css.placeholder}>
              Describe your orphanage here...
            </div>
          )}
        </div>
        {/* // * LOCATION SECTION */}
        <div className={css.location_section}>
          {orphanageDetails.metadata.isUser && (
            <EditIcon className={css.edit} background onClick={editLocation} />
          )}
          <span>Location</span>
          <div className={css.map_container}>
            {orphanageDetails.details.location?.metadata?.address ? (
              <span className={css.address}>
                <i className="fa-solid fa-location-dot"></i>{" "}
                {orphanageDetails.details.location?.metadata?.address}
              </span>
            ) : (
              <div className={css.placeholder}>Add your location here...</div>
            )}

            <br />
            {orphanageDetails.details.location?.lat &&
              orphanageDetails.details.location?.lng && (
                <iframe
                  src={
                    "https://maps.google.com/maps?q=" +
                    orphanageDetails.details.location?.lat +
                    "," +
                    orphanageDetails.details.location?.lng +
                    "&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  }
                  width="600"
                  height="600"
                  style={{ border: 0 }}
                  className={css.map}
                  loading="lazy"
                  {...{ referrerpolicy: "no-referrer-when-downgrade" }}
                  title="map"
                ></iframe>
              )}
          </div>
        </div>
        {/* // * PROJECTS SECTION */}
        <div className={css.projects_section} id="projects">
          {orphanageDetails.metadata.isUser && (
            <AddIcon className={css.add} background onClick={addProject} />
          )}
          <span>Projects</span>
          {orphanageDetails?.details?.projects?.length > 0 ? (
            <>
              {orphanageDetails.details.projects.map((project) => (
                <>
                  <EachProject
                    project={project}
                    is_user={orphanageDetails.metadata.isUser ? true : false}
                  />
                </>
              ))}
            </>
          ) : (
            <div className={css.placeholder}>
              {orphanageDetails.metadata.isUser
                ? "Add project initiatives here..."
                : "No project added"}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrphanageAccountDashboard;

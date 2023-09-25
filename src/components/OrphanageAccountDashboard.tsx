"use client";
import React, { FC, useState, useEffect } from "react";
import css from "@/styles/OrphanageAccountDashboard.module.scss";
import dummyProfilePic from "@/assets/images/dummy-profile-pic.jpg";
import bgImage from "@/assets/images/bg-image.jpg";
import EditIcon from "./EditIcon";
import { Button, Divider, Fab } from "@mui/material";
import { SocialMediaHandleClass } from "@/utils/utils";
import { useDispatch } from "react-redux";
import { modalActions } from "@/store/store";
import EditBgImgCover from "./EditBgImgCover";
import EditImage from "./EditImage";
import EditOrphanageAccountDetails from "./EditOrphanageAccountDetails";
import EditOrphanageAboutSection from "./EditOrphanageAboutSection";
import draftToHtml from "draftjs-to-html";
import { DescriptionType, UserDetailsType } from "@/types";
import EditOrphanageLocation from "./EditOrphanageLocation";

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
      title={handle.type}
      className={css.social_media_handle}
      target="_blank"
    >
      <i className={`fa-brands fa-${handle.type}`}></i>
    </a>
  );
};

const Utilities: FC<{ format?: "vertical" | "horizontal" }> = ({ format }) => {
  return (
    <div className={`${css.utilities} ${css[format || ""]}`}>
      <a href="mailto://onukwilip@gmail.com" title="mail">
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
      <a href="tel://+2349168572271" title="call">
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
};

// const about =
//   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis odit, deserunt numquam nihil quod, eos quis minus rem cum similique sequi, est quae dicta blanditiis praesentium veritatis. Doloribus rerum commodi quidem veniam similique? Corporis ratione quod sint quidem. Ut, earum nesciunt! Fuga rem cupiditate fugit, necessitatibus, architecto sapiente laborum nostrum dolor iste consectetur nihil minima impedit dolores est, dignissimos nobis aut eveniet libero praesentium? Accusantium reiciendis totam culpa dolorum obcaecati delectus iste eaque neque? In alias saepe, necessitatibus dicta cupiditate voluptatem rerum iusto a perferendis porro ipsam omnis voluptates consequatur tempora, error incidunt ad quidem eligendi temporibus aspernatur? Odit sapiente, culpa, eveniet commodi distinctio qui id quas similique minus iste aut, minima accusantium maxime! Illo repudiandae, blanditiis unde modi quod nam sit neque accusantium dolorum inventore amet nisi. Est repellat eveniet minima ullam! Illum nam aperiam ex explicabo alias temporibus laudantium, praesentium natus eius quisquam iure ullam reprehenderit molestias, veritatis rem? Nihil illo officiis deserunt eum atque minima exercitationem praesentium debitis dolor natus quisquam labore voluptate velit alias, ea quod ducimus voluptatibus voluptatum dolores ipsam cumque veniam accusantium. Ea, ipsam iusto? Doloribus fugit autem distinctio. Eveniet error autem natus odit illo maxime possimus, minus quasi iusto nemo, sit consequatur fuga soluta, odio saepe itaque deserunt. Ducimus tempore natus ratione consequuntur laborum libero quia hic repudiandae numquam nulla? Saepe quos est totam obcaecati perspiciatis expedita minima debitis, reprehenderit repudiandae, modi libero ipsa hic tempore numquam quisquam ad ipsam at deleniti, officia neque placeat quibusdam dolorem officiis! Aspernatur natus obcaecati voluptatum officiis accusamus optio, facere beatae alias, nobis voluptatem assumenda. Id reiciendis, amet saepe magni commodi deleniti omnis vero fugiat quos. Aut earum in consequatur vitae tempora sequi deleniti rem quo. Cumque ipsa nostrum dicta perferendis recusandae excepturi! Ut labore laborum asperiores reiciendis soluta, libero cupiditate. Earum, tempore rem. Odio, ipsum quas! Molestiae harum quae ex officiis distinctio hic dolor, accusamus possimus cupiditate veniam suscipit sapiente quas commodi voluptatem quidem voluptates ad quibusdam maxime perspiciatis. Ipsum eos vero commodi aperiam libero obcaecati iste, ullam nam perspiciatis optio hic, doloribus rem molestiae error quis eum veritatis nesciunt similique quod. Hic dignissimos praesentium a sunt totam magnam eum sed architecto pariatur excepturi unde deleniti sapiente enim eveniet est vitae quidem, perferendis quos perspiciatis vero consequuntur. Consectetur impedit recusandae officiis sint magnam illum! Quo repudiandae est facilis voluptate nesciunt natus odio sequi, accusantium labore cupiditate totam. Eaque alias amet exercitationem officiis ratione cupiditate officia quis, animi omnis veritatis facere recusandae perspiciatis aperiam perferendis quam rem dolorum explicabo asperiores nihil ea! Facilis fuga praesentium cum, exercitationem possimus, placeat excepturi ratione blanditiis distinctio aliquam accusamus modi, quod aut optio corporis nemo ipsum? Beatae, corporis reiciendis officia non possimus dignissimos repellendus! Consectetur ipsum ab soluta excepturi illo eaque commodi nemo totam inventore. Quo porro labore mollitia tempore incidunt neque debitis ad nemo id nisi minima voluptas consectetur, perferendis temporibus distinctio? Maiores consectetur nihil fuga magni consequuntur quidem deserunt porro saepe vero. Optio mollitia repudiandae voluptate quis voluptatem, inventore aut saepe expedita maxime aliquam voluptates laudantium vero quae odio?";
const about = {
  raw: `{"blocks":[{"key":"fj3pu","text":"Lorem ipsum dolor sit amet consectetur adipisicing elit. ","type":"header-one","depth":0,"inlineStyleRanges":[{"offset":0,"length":57,"style":"color-rgb(0,0,0)"},{"offset":0,"length":57,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":57,"style":"fontfamily-__Poppins_Fallback_9d9b8c, __Poppins_Fallback_Fallback_9d9b8c"},{"offset":0,"length":57,"style":"fontsize-24"}],"entityRanges":[],"data":{}},{"key":"8h1k1","text":"Nobis odit, deserunt numquam nihil quod, eos quis minus rem cum similique sequi, est quae dicta blanditiis praesentium veritatis. Doloribus rerum commodi quidem veniam similique? Corporis ratione quod sint quidem. Ut, earum nesciunt! Fuga rem cupiditate fugit, necessitatibus, architecto sapiente laborum nostrum dolor iste consectetur nihil minima impedit dolores est, dignissimos nobis aut eveniet libero praesentium? Accusantium reiciendis totam culpa dolorum obcaecati delectus iste eaque neque? In alias saepe, necessitatibus dicta cupiditate voluptatem rerum iusto a perferendis porro ipsam omnis voluptates consequatur tempora, error incidunt ad quidem eligendi temporibus aspernatur? Odit sapiente, culpa, eveniet commodi distinctio qui id quas similique minus iste aut, minima accusantium maxime! Illo repudiandae, blanditiis unde modi quod nam sit neque accusantium dolorum inventore amet nisi. Est repellat eveniet minima ullam! Illum nam aperiam ex explicabo alias temporibus laudantium, praesentium natus eius quisquam iure ullam reprehenderit molestias, veritatis rem? Nihil illo officiis deserunt eum atque minima exercitationem praesentium debitis dolor natus quisquam labore voluptate velit alias, ea quod ducimus voluptatibus voluptatum dolores ipsam cumque veniam accusantium. Ea, ipsam iusto? Doloribus fugit autem distinctio. Eveniet error autem natus odit illo maxime possimus, minus quasi iusto nemo, sit consequatur fuga soluta, odio saepe itaque deserunt. Ducimus tempore natus ratione consequuntur laborum libero quia hic repudiandae numquam nulla? Saepe quos est totam obcaecati perspiciatis expedita minima debitis, reprehenderit repudiandae, modi libero ipsa hic tempore numquam quisquam ad ipsam at deleniti, officia neque placeat quibusdam dolorem officiis! Aspernatur natus obcaecati voluptatum officiis accusamus optio, facere beatae alias, nobis voluptatem assumenda. Id reiciendis, amet saepe magni commodi deleniti omnis vero fugiat quos. Aut earum in consequatur vitae tempora sequi deleniti rem quo. Cumque ipsa nostrum dicta perferendis recusandae excepturi! Ut labore laborum asperiores reiciendis soluta, libero cupiditate. Earum, tempore rem. Odio, ipsum quas! Molestiae harum quae ex officiis distinctio hic dolor, accusamus possimus cupiditate veniam suscipit sapiente quas commodi voluptatem quidem voluptates ad quibusdam maxime perspiciatis. Ipsum eos vero commodi aperiam libero obcaecati iste, ullam nam perspiciatis optio hic, doloribus rem molestiae error quis eum veritatis nesciunt similique quod. Hic dignissimos praesentium a sunt totam magnam eum sed architecto pariatur excepturi unde deleniti sapiente enim eveniet est vitae quidem, perferendis quos perspiciatis vero consequuntur. Consectetur impedit recusandae officiis sint magnam illum! Quo repudiandae est facilis voluptate nesciunt natus odio sequi, accusantium labore cupiditate totam. Eaque alias amet exercitationem officiis ratione cupiditate officia quis, animi omnis veritatis facere recusandae perspiciatis aperiam perferendis quam rem dolorum explicabo asperiores nihil ea! Facilis fuga praesentium cum, exercitationem possimus, placeat excepturi ratione blanditiis distinctio aliquam accusamus modi, quod aut optio corporis nemo ipsum? Beatae, corporis reiciendis officia non possimus dignissimos repellendus! Consectetur ipsum ab soluta excepturi illo eaque commodi nemo totam inventore. Quo porro labore mollitia tempore incidunt neque debitis ad nemo id nisi minima voluptas consectetur, perferendis temporibus distinctio? Maiores consectetur nihil fuga magni consequuntur quidem deserunt porro saepe vero. Optio mollitia repudiandae voluptate quis voluptatem, inventore aut saepe expedita maxime aliquam voluptates laudantium vero quae odio? ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":3768,"style":"color-rgb(0,0,0)"},{"offset":0,"length":3768,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":3768,"style":"fontsize-14"},{"offset":0,"length":3768,"style":"fontfamily-__Poppins_Fallback_9d9b8c, __Poppins_Fallback_Fallback_9d9b8c"}],"entityRanges":[],"data":{}}],"entityMap":{}}`,
  text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis odit, deserunt numquam nihil quod, eos quis minus rem cum similique sequi, est quae dicta blanditiis praesentium veritatis. Doloribus rerum commodi quidem veniam similique? Corporis ratione quod sint quidem. Ut, earum nesciunt! Fuga rem cupiditate fugit, necessitatibus, architecto sapiente laborum nostrum dolor iste consectetur nihil minima impedit dolores est, dignissimos nobis aut eveniet libero praesentium? Accusantium reiciendis totam culpa dolorum obcaecati delectus iste eaque neque? In alias saepe, necessitatibus dicta cupiditate voluptatem rerum iusto a perferendis porro ipsam omnis voluptates consequatur tempora, error incidunt ad quidem eligendi temporibus aspernatur? Odit sapiente, culpa, eveniet commodi distinctio qui id quas similique minus iste aut, minima accusantium maxime! Illo repudiandae, blanditiis unde modi quod nam sit neque accusantium dolorum inventore amet nisi. Est repellat eveniet minima ullam! Illum nam aperiam ex explicabo alias temporibus laudantium, praesentium natus eius quisquam iure ullam reprehenderit molestias, veritatis rem? Nihil illo officiis deserunt eum atque minima exercitationem praesentium debitis dolor natus quisquam labore voluptate velit alias, ea quod ducimus voluptatibus voluptatum dolores ipsam cumque veniam accusantium. Ea, ipsam iusto? Doloribus fugit autem distinctio. Eveniet error autem natus odit illo maxime possimus, minus quasi iusto nemo, sit consequatur fuga soluta, odio saepe itaque deserunt. Ducimus tempore natus ratione consequuntur laborum libero quia hic repudiandae numquam nulla? Saepe quos est totam obcaecati perspiciatis expedita minima debitis, reprehenderit repudiandae, modi libero ipsa hic tempore numquam quisquam ad ipsam at deleniti, officia neque placeat quibusdam dolorem officiis! Aspernatur natus obcaecati voluptatum officiis accusamus optio, facere beatae alias, nobis voluptatem assumenda. Id reiciendis, amet saepe magni commodi deleniti omnis vero fugiat quos. Aut earum in consequatur vitae tempora sequi deleniti rem quo. Cumque ipsa nostrum dicta perferendis recusandae excepturi! Ut labore laborum asperiores reiciendis soluta, libero cupiditate. Earum, tempore rem. Odio, ipsum quas! Molestiae harum quae ex officiis distinctio hic dolor, accusamus possimus cupiditate veniam suscipit sapiente quas commodi voluptatem quidem voluptates ad quibusdam maxime perspiciatis. Ipsum eos vero commodi aperiam libero obcaecati iste, ullam nam perspiciatis optio hic, doloribus rem molestiae error quis eum veritatis nesciunt similique quod. Hic dignissimos praesentium a sunt totam magnam eum sed architecto pariatur excepturi unde deleniti sapiente enim eveniet est vitae quidem, perferendis quos perspiciatis vero consequuntur. Consectetur impedit recusandae officiis sint magnam illum! Quo repudiandae est facilis voluptate nesciunt natus odio sequi, accusantium labore cupiditate totam. Eaque alias amet exercitationem officiis ratione cupiditate officia quis, animi omnis veritatis facere recusandae perspiciatis aperiam perferendis quam rem dolorum explicabo asperiores nihil ea! Facilis fuga praesentium cum, exercitationem possimus, placeat excepturi ratione blanditiis distinctio aliquam accusamus modi, quod aut optio corporis nemo ipsum? Beatae, corporis reiciendis officia non possimus dignissimos repellendus! Consectetur ipsum ab soluta excepturi illo eaque commodi nemo totam inventore. Quo porro labore mollitia tempore incidunt neque debitis ad nemo id nisi minima voluptas consectetur, perferendis temporibus distinctio? Maiores consectetur nihil fuga magni consequuntur quidem deserunt porro saepe vero. Optio mollitia repudiandae voluptate quis voluptatem, inventore aut saepe expedita maxime aliquam voluptates laudantium vero quae odio?`,
};
const About: FC<{ desc: string }> = ({ desc }) => {
  const [expanded, setExpanded] = useState(false);
  const [descState, setDescState] = useState(desc.slice(0, 600));

  return (
    <>
      <div>
        {desc?.length > 200 ? (
          <>
            {/* {descState} */}
            <div dangerouslySetInnerHTML={{ __html: descState }}></div>
            {expanded ? (
              <>
                <a
                  href="#about"
                  className={css.expand_link}
                  onClick={() => {
                    setExpanded(false);
                    setDescState(desc.slice(0, 600));
                  }}
                >
                  {" "}
                  See less
                </a>
              </>
            ) : (
              <>
                <a
                  href="#about"
                  className={css.expand_link}
                  onClick={() => {
                    setExpanded(true);
                    setDescState(desc);
                  }}
                >
                  ...See more
                </a>
              </>
            )}
          </>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: desc }}></div>
        )}
      </div>
    </>
  );
};

const OrphanageAccountDashboard: FC<{
  userDetails: UserDetailsType;
  isUser: boolean;
}> = ({ userDetails, isUser }) => {
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  const editBgImageCover = () => {
    dispatch(
      modalActions.show({
        children: <EditBgImgCover existingImg={bgImage.src} />,
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
        children: <EditImage existingImg={dummyProfilePic.src} />,
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
              name: "Prince C. Onukwili",
              phone_number: "090909088",
              tagline: "Giving hope to needy children",
              website: undefined,
              social_media_handles: [
                new SocialMediaHandleClass("facebook", "https://facebook.com"),
              ],
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
        children: <EditOrphanageAboutSection existingDescription={about} />,
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
            existingLocation={{ lat: 3.7872, lng: 5.9862 }}
          />
        ),
        props: { maxWidth: "sm", open: true, fullWidth: true },
      })
    );
  };

  const convertAboutDescriptionToHTML = (description: DescriptionType) => {
    try {
      return draftToHtml(JSON.parse(description.raw));
    } catch (error: any) {
      return description.text;
    }
  };

  useEffect(() => {
    setIsMobile(window.innerWidth <= 500);
    console.log("DETAILS: ", userDetails);
  }, []);

  return (
    <section className={css.orphanage_account_dashboard}>
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
        <br />
        <Utilities format="vertical" />
      </div>
      <div className={css.sections_container}>
        <div className={css.analytics_section}>
          <span>Analytics and overview</span>
          <span>
            Profile view in the last 7 days <b>1,000</b>
          </span>
        </div>
        <div className={css.profile_section}>
          <div className={css.img_section}>
            <div className={css.bg_img_container}>
              <img src={bgImage.src} alt="Background" />
              <EditIcon
                className={css.edit}
                background
                onClick={editBgImageCover}
              />
            </div>
            <div className={css.profile_img_container}>
              <img src={dummyProfilePic.src} alt="Prince C. Onukwili" />
              <EditIcon className={css.edit} background onClick={editImage} />
            </div>
          </div>
          <div className={css.details_section}>
            <EditIcon className={css.edit} background onClick={editDetails} />
            <div className={css.left}>
              <div className={css.name_container}>
                <span className={css.name}>Hope at last</span>
                <span className={css.tagline}>
                  Giving hope to needy children
                </span>
              </div>
              <div className={css.external_links}>
                <span className={css.website}>
                  <i className="fa-solid fa-globe"></i>{" "}
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    www.example.com
                  </a>
                </span>
                <nav className={css.social_media_handles}>
                  {socialMediaHandles.map((handle, i) => (
                    <SocialMediaHandles handle={handle} key={i} />
                  ))}
                </nav>
              </div>
              <div className={css.utilities_container}>
                <Utilities />
              </div>
              <div className={css.action}>
                <Button variant="contained">
                  <i className="fa-solid fa-hand-holding-dollar"></i> Donate
                </Button>
              </div>
            </div>
            <div className={css.right}>
              <Utilities />
            </div>
          </div>
        </div>
        <div className={css.about_section} id="about">
          <EditIcon className={css.edit} background onClick={editAbout} />
          <span>About</span>
          <About desc={convertAboutDescriptionToHTML(about)} />
        </div>
        <div className={css.location_section}>
          <EditIcon className={css.edit} background onClick={editLocation} />
          <span>Location</span>
          <div className={css.map_container}>
            <span className={css.address}>
              <i className="fa-solid fa-location-dot"></i> 157 Candos road,
              Baruwa, Alimosho. Lagos state, Nigeria
            </span>
            <br />
            {/* <GoogleMapComponent
            center={position}
            style={{ width: "100%", height: 700 }}
          >
            <Marker position={position} />
          </GoogleMapComponent> */}
            <iframe
              src={
                "https://maps.google.com/maps?q=" +
                position.lat +
                "," +
                position.lng +
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrphanageAccountDashboard;

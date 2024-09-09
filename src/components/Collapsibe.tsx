import { FC, useState } from "react";
import css from "@/styles/CollapsibleContent.module.scss";

const Collapsible: FC<{ desc: string; className?: string }> = ({
  desc,
  className,
}) => {
  const slice_count = 200;
  const [expanded, setExpanded] = useState(false);
  const [descState, setDescState] = useState(desc?.slice(0, slice_count));

  return (
    <>
      {desc?.length > slice_count ? (
        <div>
          {/* {descState} */}
          <div
            dangerouslySetInnerHTML={{
              __html: `${descState}${!expanded ? "..." : ""}`,
            }}
          ></div>

          {expanded ? (
            <>
              <a
                className={css.expand_link}
                onClick={() => {
                  setExpanded(false);
                  setDescState(desc.slice(0, slice_count));
                }}
              >
                {" "}
                See less
              </a>
            </>
          ) : (
            <>
              <a
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
        </div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: desc }}></div>
      )}
    </>
  );
};

export default Collapsible;

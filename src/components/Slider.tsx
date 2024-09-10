import React, { FC, ReactNode } from "react";
// core version + navigation, pagination modules:
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import css from "@/styles/Slider.module.scss";

const Slider: FC<
  { images: string[]; className?: string; imageClassName?: string } & Record<
    any,
    any
  >
> = ({ images, className, imageClassName, ...props }) => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Pagination]}
      className={`${css.swiper} ${className}`}
      {...props}
    >
      <div>
        {images.map((image) => (
          <>
            <SwiperSlide className={css.swiper_slide}>
              <img src={image} alt="img" className={imageClassName} />
            </SwiperSlide>
          </>
        ))}
      </div>
    </Swiper>
  );
};

export default Slider;

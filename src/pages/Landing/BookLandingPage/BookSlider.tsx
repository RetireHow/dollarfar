import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { assets } from "../../../assets/assets";
import { Swiper as SwiperClass } from "swiper/types"; // Import Swiper class type
import { Autoplay, Pagination } from "swiper/modules";

const swiperConfig = {
  modules: [Pagination, Autoplay],
  pagination: {
    clickable: true,
    dynamicBullets: true,
  },
  autoplay: {
    delay: 2000, // autoplay every 2 seconds
    disableOnInteraction: false, // keeps autoplay running after user interaction
    pauseOnMouseEnter: true,
  },
  slidesPerView: 1,
  spaceBetween: 10,
  breakpoints: {
    1200: {
      slidesPerView: 1,
    },
  },
};

const BookSlider: React.FC = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(
    null
  );
  const [isEnd, setIsEnd] = useState<boolean | null>(null);
  const [isBeginning, setIsBeginning] = useState<boolean | null>(null);

  const handleNext = () => {
    swiperInstance?.slideNext();
    setIsEnd(swiperInstance?.isEnd ?? false);
    setIsBeginning(swiperInstance?.isBeginning ?? false);
  };

  const handlePrev = () => {
    swiperInstance?.slidePrev();
    setIsBeginning(swiperInstance?.isBeginning ?? false);
    setIsEnd(swiperInstance?.isEnd ?? false);
  };

  return (
    <section className="bg-[#EDF3F8] dark:bg-neutral-800 md:px-10 px-1 md:py-10 py-5 md:mb-28 mb-16">
      <h3 className="text-[1.5rem] font-bold text-center mb-5">
        Book Content Preview
      </h3>

      <div className="flex items-center justify-center gap-5 md:mx-32 mx-2">
        <button onClick={handlePrev}>
          <Icon
            className={isBeginning ? "text-gray-400" : ""}
            icon="solar:alt-arrow-left-line-duotone"
            width="40"
            height="40"
          />
        </button>

        <Swiper
          onSwiper={(swiper: SwiperClass) => setSwiperInstance(swiper)}
          {...swiperConfig}
          className="w-full m-3"
        >
          <SwiperSlide>
            <div className="shadow-md flex justify-center pb-5">
              <img
                className="w-full md:h-[800px] h-[300px]"
                src={assets.bookContentCover}
                alt="Book Cover Page"
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="shadow-md flex justify-center pb-5">
              <img
                className="w-full md:h-[800px] h-[300px]"
                src={assets.tableOfContent1}
                alt="Book Cover Page"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="shadow-md flex justify-center pb-5">
              <img
                className="w-full md:h-[800px] h-[300px]"
                src={assets.tableOfContent2}
                alt="Book Cover Page"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="shadow-md flex justify-center pb-5">
              <img
                className="w-full md:h-[800px] h-[300px]"
                src={assets.bookIntroduction}
                alt="Book Cover Page"
              />
            </div>
          </SwiperSlide>
        </Swiper>

        <button onClick={handleNext}>
          <Icon
            className={isEnd ? "text-gray-400" : ""}
            icon="solar:alt-arrow-right-line-duotone"
            width="40"
            height="40"
          />
        </button>
      </div>
    </section>
  );
};

export default BookSlider;

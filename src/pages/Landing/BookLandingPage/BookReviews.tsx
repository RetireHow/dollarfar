import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useState } from "react";
import { Icon } from "@iconify/react";
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
  spaceBetween: 16,
  breakpoints: {
    1200: {
      slidesPerView: 3,
    },
  },
};

const BookReviews: React.FC = () => {
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
    <section className="md:px-10 px-1 mb-28">
      <h3 className="text-[1.5rem] font-bold text-center mb-5">
        What Readers Are Saying
      </h3>

      <div className="flex items-center justify-center gap-5 md:mx-5 mx-2">
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
            <div className="shadow-md pb-5 bg-[#EAECF0] border-[1px] border-gray-200 p-5 mb-8">
              <div className="flex items-center gap-1">
                <Icon
                  className="text-yellow-500"
                  icon="material-symbols:star-rounded"
                  width="24"
                  height="24"
                />
                <Icon
                  className="text-yellow-500"
                  icon="material-symbols:star-rounded"
                  width="24"
                  height="24"
                />
                <Icon
                  className="text-yellow-500"
                  icon="material-symbols:star-rounded"
                  width="24"
                  height="24"
                />
                <Icon
                  className="text-yellow-500"
                  icon="material-symbols:star-rounded"
                  width="24"
                  height="24"
                />
                <Icon
                  className="text-yellow-500"
                  icon="material-symbols:star-rounded"
                  width="24"
                  height="24"
                />
              </div>
              <p className="my-3">
                “This book helped me understand my CPP and OAS better than
                anything else I’ve read. It’s practical and easy to follow!”
              </p>
              <div>
                <p className="font-bold">-James C</p>
                <p>Toronto</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="shadow-md pb-5 bg-[#EAECF0] border-[1px] border-gray-200 p-5 mb-8">
              <div className="flex items-center gap-1">
                <Icon
                  className="text-yellow-500"
                  icon="material-symbols:star-rounded"
                  width="24"
                  height="24"
                />
                <Icon
                  className="text-yellow-500"
                  icon="material-symbols:star-rounded"
                  width="24"
                  height="24"
                />
                <Icon
                  className="text-yellow-500"
                  icon="material-symbols:star-rounded"
                  width="24"
                  height="24"
                />
                <Icon
                  className="text-yellow-500"
                  icon="material-symbols:star-rounded"
                  width="24"
                  height="24"
                />
                <Icon
                  className="text-yellow-500"
                  icon="material-symbols:star-rounded"
                  width="24"
                  height="24"
                />
              </div>
              <p className="my-3">
                “This book helped me understand my CPP and OAS better than
                anything else I’ve read. It’s practical and easy to follow!”
              </p>
              <div>
                <p className="font-bold">-James C</p>
                <p>Toronto</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="shadow-md pb-5 bg-[#EAECF0] border-[1px] border-gray-200 p-5">
              <div className="flex items-center gap-1">
                <Icon
                  className="text-yellow-500"
                  icon="material-symbols:star-rounded"
                  width="24"
                  height="24"
                />
                <Icon
                  className="text-yellow-500"
                  icon="material-symbols:star-rounded"
                  width="24"
                  height="24"
                />
                <Icon
                  className="text-yellow-500"
                  icon="material-symbols:star-rounded"
                  width="24"
                  height="24"
                />
                <Icon
                  className="text-yellow-500"
                  icon="material-symbols:star-rounded"
                  width="24"
                  height="24"
                />
                <Icon
                  className="text-yellow-500"
                  icon="material-symbols:star-rounded"
                  width="24"
                  height="24"
                />
              </div>
              <p className="my-3">
                “This book helped me understand my CPP and OAS better than
                anything else I’ve read. It’s practical and easy to follow!”
              </p>
              <div>
                <p className="font-bold">-James C</p>
                <p>Toronto</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="shadow-md pb-5 bg-[#EAECF0] border-[1px] border-gray-200 p-5">
              <div className="flex items-center gap-1">
                <Icon
                  className="text-yellow-500"
                  icon="material-symbols:star-rounded"
                  width="24"
                  height="24"
                />
                <Icon
                  className="text-yellow-500"
                  icon="material-symbols:star-rounded"
                  width="24"
                  height="24"
                />
                <Icon
                  className="text-yellow-500"
                  icon="material-symbols:star-rounded"
                  width="24"
                  height="24"
                />
                <Icon
                  className="text-yellow-500"
                  icon="material-symbols:star-rounded"
                  width="24"
                  height="24"
                />
                <Icon
                  className="text-yellow-500"
                  icon="material-symbols:star-rounded"
                  width="24"
                  height="24"
                />
              </div>
              <p className="my-3">
                “This book helped me understand my CPP and OAS better than
                anything else I’ve read. It’s practical and easy to follow!”
              </p>
              <div>
                <p className="font-bold">-James C</p>
                <p>Toronto</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="shadow-md pb-5 bg-[#EAECF0] border-[1px] border-gray-200 p-5">
              <div className="flex items-center gap-1">
                <Icon
                  className="text-yellow-500"
                  icon="material-symbols:star-rounded"
                  width="24"
                  height="24"
                />
                <Icon
                  className="text-yellow-500"
                  icon="material-symbols:star-rounded"
                  width="24"
                  height="24"
                />
                <Icon
                  className="text-yellow-500"
                  icon="material-symbols:star-rounded"
                  width="24"
                  height="24"
                />
                <Icon
                  className="text-yellow-500"
                  icon="material-symbols:star-rounded"
                  width="24"
                  height="24"
                />
                <Icon
                  className="text-yellow-500"
                  icon="material-symbols:star-rounded"
                  width="24"
                  height="24"
                />
              </div>
              <p className="my-3">
                “This book helped me understand my CPP and OAS better than
                anything else I’ve read. It’s practical and easy to follow!”
              </p>
              <div>
                <p className="font-bold">-James C</p>
                <p>Toronto</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="shadow-md pb-5 bg-[#EAECF0] border-[1px] border-gray-200 p-5">
              <div className="flex items-center gap-1">
                <Icon
                  className="text-yellow-500"
                  icon="material-symbols:star-rounded"
                  width="24"
                  height="24"
                />
                <Icon
                  className="text-yellow-500"
                  icon="material-symbols:star-rounded"
                  width="24"
                  height="24"
                />
                <Icon
                  className="text-yellow-500"
                  icon="material-symbols:star-rounded"
                  width="24"
                  height="24"
                />
                <Icon
                  className="text-yellow-500"
                  icon="material-symbols:star-rounded"
                  width="24"
                  height="24"
                />
                <Icon
                  className="text-yellow-500"
                  icon="material-symbols:star-rounded"
                  width="24"
                  height="24"
                />
              </div>
              <p className="my-3">
                “This book helped me understand my CPP and OAS better than
                anything else I’ve read. It’s practical and easy to follow!”
              </p>
              <div>
                <p className="font-bold">-James C</p>
                <p>Toronto</p>
              </div>
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

export default BookReviews;

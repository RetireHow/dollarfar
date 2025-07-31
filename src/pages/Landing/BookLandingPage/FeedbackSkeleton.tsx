import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
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

export const FeedbackSkeleton = () => {
  const skeletonArray = Array(3).fill(0); // Show 3 loading slides

  return (
    <Swiper {...swiperConfig} className="w-full m-3">
      {skeletonArray.map((_, index) => (
        <SwiperSlide key={index}>
          <div className="shadow-md pb-5 bg-gray-100 border-[1px] border-gray-200 p-5 mb-8 dark:bg-neutral-900 dark:text-white animate-pulse">
            <div className="flex items-center gap-1 mb-3">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="w-6 h-6 bg-yellow-300 rounded"></div>
                ))}
            </div>
            <div className="h-4 bg-gray-300 dark:bg-neutral-700 rounded w-full mb-3"></div>
            <div className="h-4 bg-gray-300 dark:bg-neutral-700 rounded w-5/6 mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-neutral-700 rounded w-1/3 mb-1"></div>
            <div className="h-4 bg-gray-300 dark:bg-neutral-700 rounded w-1/4"></div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

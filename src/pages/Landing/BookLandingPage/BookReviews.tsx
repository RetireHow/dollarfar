import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Swiper as SwiperClass } from "swiper/types"; // Import Swiper class type
import { Autoplay, Pagination } from "swiper/modules";
import { baseUrl } from "../../../api/apiConstant";
import { toast } from "react-toastify";
import { FeedbackSkeleton } from "./FeedbackSkeleton";

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
  const [isLoading, setIsLoading] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);

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

  const loadFeedbacks = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/feedbacks/get-feedbacks`);
      const data = await response.json();
      if (data?.success) {
        console.log({ data });
        setFeedbacks(data?.data);
      } else {
        toast.error("There is something went wrong!");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (error: any) {
      setIsLoading(false);
      toast.error("There is something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFeedbacks();
  }, []);

  return (
    <section className="md:px-10 px-1 md:mb-28 mb-16">
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

        {isLoading ? (
          <FeedbackSkeleton />
        ) : feedbacks?.length === 0 ? (
          <div className="text-gray-600 dark:text-gray-300 text-center text-[1.2rem] max-w-xl mx-auto my-6">
            <p>We haven’t received any reader feedback yet.</p>
            <p>
              Be the first to share your thoughts and help others learn from
              your experience!
            </p>
          </div>
        ) : (
          <Swiper
            onSwiper={(swiper: SwiperClass) => setSwiperInstance(swiper)}
            {...swiperConfig}
            className="w-full m-3"
          >
            {feedbacks?.map((feedback) => {
              const { name, city, rating, comments } = feedback;
              return (
                <SwiperSlide key={name}>
                  <div className="shadow-md pb-5 bg-gray-100 border-[1px] border-gray-200 p-5 mb-8 dark:bg-neutral-900 dark:text-white leading-7">
                    <div className="flex items-center gap-1">
                      {Array(rating)
                        ?.fill(0)
                        ?.map(() => (
                          <Icon
                            className="text-yellow-500"
                            icon="material-symbols:star-rounded"
                            width="24"
                            height="24"
                          />
                        ))}
                    </div>
                    <p className="my-3">{comments}</p>
                    <div>
                      <p className="font-bold">-{name}</p>
                      <p>{city}</p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}

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

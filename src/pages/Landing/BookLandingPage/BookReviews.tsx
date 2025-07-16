import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { Swiper as SwiperClass } from "swiper/types"; // Import Swiper class type
import { Autoplay, Pagination } from "swiper/modules";

const feedbacks = [
  {
    rating: 5,
    review:
      "This book helped me understand my CPP and OAS better than anything else I’ve read. It’s practical and easy to follow!",
    name: "James C",
    location: "Toronto",
  },
  {
    rating: 5,
    review:
      "Finally, a clear explanation of how U.S. and Canadian pensions interact. I feel way more confident planning my cross-border retirement now.",
    name: "Susan M",
    location: "Vancouver",
  },
  {
    rating: 4,
    review:
      "Very informative, especially the sections on RRSP vs 401(k). I would have liked more examples though.",
    name: "Daniel T",
    location: "Ottawa",
  },
  {
    rating: 5,
    review:
      "This should be required reading for anyone turning 60! The step-by-step breakdowns are gold.",
    name: "Helen B",
    location: "Calgary",
  },
  {
    rating: 5,
    review:
      "I’ve read a lot on retirement planning, but this book connected all the dots for me—especially across borders. Highly recommend!",
    name: "Michael R",
    location: "Buffalo, NY",
  },
  {
    rating: 4,
    review:
      "Solid resource for Canadians living in the U.S. Some content could use updates, but overall very helpful.",
    name: "Priya S",
    location: "Montreal",
  },
  {
    rating: 5,
    review:
      "Simple, clear, and packed with actionable advice. I loved the checklists at the end of each chapter.",
    name: "Greg W",
    location: "Edmonton",
  },
  {
    rating: 5,
    review:
      "I wish I found this book earlier. It saved me from making a huge CPP deferral mistake.",
    name: "Linda K",
    location: "Halifax",
  },
];

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
          {feedbacks?.map((feedback) => {
            const { name, location, rating, review } = feedback;
            return (
              <SwiperSlide key={name}>
                <div className="shadow-md pb-5 bg-gray-100 border-[1px] border-gray-200 p-5 mb-8 md:h-[230px] h-auto dark:bg-neutral-900 dark:text-white">
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
                  <p className="my-3">{review}</p>
                  <div>
                    <p className="font-bold">-{name}</p>
                    <p>{location}</p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
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

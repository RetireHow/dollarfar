import { Link } from "react-router-dom";
import { assets } from "../../../assets/assets";
import { useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import BookSlider from "./BookSlider";
import BookReviews from "./BookReviews";
import BookFAQ from "./BookFAQ";
import { EbookDownloadFormPopup } from "./EbookDownloadForm";
import useTitle from "../../../hooks/useTitle";

export default function BookLandingPage() {
  useTitle("Dollarfar | Book Landing");
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <main className="min-h-screen">
      <section className="relative md:mb-28 mb-16 md:block hidden">
        <img
          className="w-full min-h-[650px]"
          src={assets.bookShadowWithCoverPage}
          alt="Book Shadow"
        />
        <div className="absolute z-50 top-10 flex flex-col justify-center items-center w-full text-black px-5">
          <h3 className="text-[2rem] font-bold">Retire How?</h3>
          <p className="md:text-[#696969] text-[1.3rem] text-center mt-2">
            Master your retirement journey with{" "}
            <span className="font-bold text-black">Retire How?</span> — a
            straightforward, expert-backed book designed to simplify
            understanding retirement benefits.
          </p>
        </div>

        <div className="absolute z-50 md:bottom-40 bottom-10 w-full text-black px-5 text-center">
          <div className="flex md:flex-row flex-col gap-5 justify-center items-center">
            <EbookDownloadFormPopup />
            <button className="bg-black rounded-lg text-white md:px-5 px-2 py-3 md:w-auto w-full">
              Buy Now
            </button>
          </div>

          <p className="mt-3">
            <span>Special Offer</span>{" "}
            <span className="md:text-[#696969] leading-7">
              🎁 : Be among the first 1,000 users to download the eBook for
              FREE! After that, it will be available as a paid download.
            </span>
          </p>

          <p className="mt-5">Or order from</p>
          <Link to="https://www.amazon.com/dp/B0FB46844J" target="_blank">
            <img className="mt-5" src={assets.amazonLogo} alt="Amazon Link" />
          </Link>
        </div>
      </section>

      {/* Mobile Layout  */}
      <section
        style={{
          backgroundImage: `url(${assets.bookShadow})`,
          backgroundSize: "cover",
          backgroundRepeat:"no-repeat",
          WebkitBackgroundSize:"100%",
          backgroundPosition:"bottom"
        }}
        className="md:mb-28 mb-16 bg-[#EDF3F8] py-8 md:hidden block"
      >
        <div className="flex flex-col justify-center items-center w-full text-black px-5">
          <h3 className="text-[1.5rem] font-bold">Retire How?</h3>
          <p className="md:text-[#696969] text-[1rem] text-center mt-2">
            Master your retirement journey with{" "}
            <span className="font-bold text-black">Retire How?</span> — a
            straightforward, expert-backed book designed to simplify
            understanding retirement benefits.
          </p>
        </div>

        <div className="flex justify-center m-5">
          <img src={assets.bookCoverPageWithBadge} alt="Book Cover Page" />
        </div>

        <div className="w-full text-black px-5 text-center">
          <div className="flex md:flex-row flex-col gap-5 justify-center items-center">
            <EbookDownloadFormPopup />
            <button className="bg-black rounded-lg text-white md:px-5 px-2 py-3 md:w-auto w-full">
              Buy Now
            </button>
          </div>

          <p className="mt-3">
            <span>Special Offer</span>{" "}
            <span className="md:text-[#696969] leading-7">
              🎁 : Be among the first 1,000 users to download the eBook for
              FREE! After that, it will be available as a paid download.
            </span>
          </p>

          <p className="mt-5">Or order from</p>
          <Link to="https://www.amazon.com/dp/B0FB46844J" target="_blank">
            <img className="mt-5" src={assets.amazonLogo} alt="Amazon Link" />
          </Link>
        </div>
      </section>

      <section className="flex md:flex-row flex-col-reverse items-center md:gap-20 gap-5 md:px-20 px-10 md:mb-28 mb-16">
        <div>
          <h5 className="font-semibold my-2 md:text-[1.3rem] text-[1.1rem]">
            About The Author
          </h5>
          <h3 className="font-bold md:text-[2rem] text-[1.5rem]">
            Rao Movva, PFP®, CIM®, CIWM, FCSI®
          </h3>
          <p className="dark:text-gray-300 text-[#696969] my-4 leading-8 md:text-[20px] text-[1rem]">
            Rao Movva is a seasoned financial professional with over 25 years of
            experience in Canada’s banking sector. He has held senior
            roles—including Private Banker, Financial Planner, and Wealth
            Advisor—at Scotiabank, RBC, and TD. His career began on the stock
            exchange floor in India, where he gained deep insights into market
            behavior and economics. Throughout his career, Rao has worked
            closely with mass affluent to ultra high-net-worth (UHNW)
            individuals and families, helping them navigate complex financial
            decisions across retirement, investment, and estate planning needs.
            He is recognized as one of the Fellows of the Canadian Securities
            Institute, a distinction that underscores his commitment to
            financial excellence and professional development. Rao is also the
            author of{" "}
            <span className="font-bold text-black">*Retire How?*</span>, a
            practical guide to understanding retirement benefits and planning
            strategies in both Canada and the U.S.
          </p>
          <div>
            <p className="mb-2 text-[20px]">Follow movva on</p>
            <div className="flex items-center gap-3">
              <Link target="_blank" to="https://www.facebook.com/RetireHowInc/">
                <Icon icon="ic:baseline-facebook" width="24" height="24" />
              </Link>
              <Link
                to="https://www.linkedin.com/in/rao-movva-pfp%C2%AE-cim%C2%AE-ciwm-fcsi%C2%AE-1826263/"
                target="_blank"
              >
                <Icon
                  icon="entypo-social:linkedin-with-circle"
                  width="20"
                  height="20"
                />
              </Link>
              <Link
                to="https://www.instagram.com/founder_ceo_travelglobal.ca/"
                target="_blank"
              >
                <Icon
                  icon="entypo-social:instagram-with-circle"
                  width="20"
                  height="20"
                />
              </Link>
              <Link
                to="https://x.com/FallowRaoMovva?t=TtOXJBp-ztKfOUZNiDYFXQ&s=09"
                target="_blank"
              >
                <Icon
                  icon="entypo-social:twitter-with-circle"
                  width="20"
                  height="20"
                />
              </Link>
              <Link to="https://www.youtube.com/@movvarao1060" target="_blank">
                <Icon
                  icon="entypo-social:youtube-with-circle"
                  width="20"
                  height="20"
                />
              </Link>
            </div>
          </div>
        </div>
        <div>
          <img
            className="rounded-md"
            src={assets.authorImgFormal}
            alt="Author Image"
          />
        </div>
      </section>

      <section className="flex md:flex-row flex-col md:gap-16 gap-8 md:mx-16 mx-8 md:mb-28 mb-16 leading-8">
        <div className="border-[1px] border-gray-200 rounded-lg p-5">
          <h3 className="font-bold md:text-[1.8rem] text-[1.5rem]">
            Retire with Confidence Across Borders
          </h3>
          <p className="dark:text-gray-300 text-[#696969] my-3 md:text-[1.2rem] text-[1rem]">
            Retire How? is your step-by-step guide to understanding and
            maximizing retirement benefits in both Canada and the U.S. Written
            in plain English with real-life examples, this book helps you make
            smarter decisions about your retirement income, taxes, and
            cross-border planning.
          </p>
          <ul className="text-[#696969] space-y-3 md:text-[1.2rem] text-[1rem]">
            <li className="flex items-center gap-2">
              <img
                className="w-[20px] h-[20px]"
                src={assets.roundedChecked}
                alt="check icon"
              />
              <span>
                Compare Canada’s CPP, OAS, and GIS with U.S. Social Security and
                SSI
              </span>
            </li>
            <li className="flex items-center gap-2">
              <img
                className="w-[20px] h-[20px]"
                src={assets.roundedChecked}
                alt="check icon"
              />
              <span>
                Learn how retirement ages, taxes, and benefit calculations
                differ—and what they mean for your bottom line
              </span>
            </li>
            <li className="flex items-center gap-2">
              <img
                className="w-[20px] h-[20px]"
                src={assets.roundedChecked}
                alt="check icon"
              />
              <span>
                Discover smart claiming strategies to boost income and reduce
                clawbacks
              </span>
            </li>
            <li className="flex items-center gap-2">
              <img
                className="w-[20px] h-[20px]"
                src={assets.roundedChecked}
                alt="check icon"
              />
              <span>
                Explore healthcare realities for retirees in both countries
              </span>
            </li>
            <li className="flex items-center gap-2">
              <img
                className="w-[20px] h-[20px]"
                src={assets.roundedChecked}
                alt="check icon"
              />
              <span>
                Access practical tools and tips to stretch your fixed income and
                plan with confidence
              </span>
            </li>
          </ul>
        </div>

        <div className="border-[1px] border-gray-200 rounded-lg p-5 leading-8">
          <h3 className="font-bold mb-3 md:text-[1.8rem] text-[1.5rem]">Who this book is for</h3>
          <ul className="text-[#696969] space-y-3 md:text-[1.2rem] text-[1rem]">
            <li className="flex items-center gap-2">
              <img
                className="w-[20px] h-[20px]"
                src={assets.roundedChecked}
                alt="check icon"
              />
              <span>
                Canadians approaching retirement – Learn how to navigate and
                maximize your CPP, OAS, and GIS benefits.
              </span>
            </li>
            <li className="flex items-center gap-2">
              <img
                className="w-[20px] h-[20px]"
                src={assets.roundedChecked}
                alt="check icon"
              />
              <span>
                Americans planning with Social Security – Understand eligibility
                rules, benefit calculations, and claiming strategies to optimize
                your income.
              </span>
            </li>
            <li className="flex items-center gap-2">
              <img
                className="w-[20px] h-[20px]"
                src={assets.roundedChecked}
                alt="check icon"
              />
              <span>
                Cross-border retirees – Get clear, expert-backed advice on how
                to align your benefits when retiring across borders.
              </span>
            </li>
            <li className="flex items-center gap-2">
              <img
                className="w-[20px] h-[20px]"
                src={assets.roundedChecked}
                alt="check icon"
              />
              <span>
                Financial professionals – While written with individuals in
                mind, this book also serves as a practical, credible resource
                for financial planners, investment advisors, portfolio managers,
                bankers, and consultants. It’s well-suited as a client handout
                to support retirement conversations and reinforce key planning
                concepts.
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section className="w-full dark:bg-neutral-800 bg-gray-100 py-12 px-4 flex flex-col items-center md:mb-28 mb-16">
        <h2 className="text-3xl font-bold text-center mb-6">
          Watch Our Introduction
        </h2>
        <div className="w-full max-w-3xl aspect-video shadow-lg rounded-xl overflow-hidden">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/ArhUl8TAXB0"
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      <BookSlider />

      <section className="bg-black text-white md:py-16 py-8 md:px-28 px-5 text-center md:text-[1.5rem] text-[1.1rem] md:mb-28 mb-16">
        <p className="mb-3 md:leading-10 leading-8">
          No two retirement plans look the same, but one thing is certain:
          understanding your benefits ahead of time makes all the difference.
          Retirement should be a time of freedom, not financial stress.
        </p>
        <p>— Author</p>
      </section>

      <BookFAQ />
      <BookReviews />

      {/* <section className="md:mx-20 mb-28 md:px-0 px-5">
        <h3 className="font-bold text-[1.5rem] text-center mb-8">
          The Author’s upcoming Books
        </h3>
        <div className="flex md:flex-row flex-col items-center justify-center gap-10">
          <img
            className="md:w-[400px] w-full"
            src={assets.futureBook2}
            alt="Book2"
          />
          <img
            className="md:w-[400px] w-full"
            src={assets.futureBook3}
            alt="Book3"
          />
        </div>
      </section> */}

      <section className="relative">
        <img
          className="w-full md:h-auto h-[350px]"
          src={assets.getCopyBg}
          alt="Get Copy BG"
        />

        <div className="absolute z-50 md:top-10 top-0 flex flex-col justify-center items-center w-full text-black px-5 md:bg-transparent bg-[#edf3f8d7] md:h-auto h-full">
          <h3 className="md:text-[2rem] text-[1.5rem] font-bold">Get Your Copy</h3>
          <div className="my-3 md:w-auto w-full">
            <EbookDownloadFormPopup />
          </div>
          <div className="mt-3 flex max-w-[700px] text-center">
            <p className="text-black">
              <span className="font-bold leading-7">Special Offer</span>🎁 : Be
              among the first 1,000 users to download the eBook for FREE! After
              that, it will be available as a paid download.
            </p>
          </div>

          <p className="mt-5">Or order from</p>
          <Link to="https://www.amazon.com/dp/B0FB46844J" target="_blank">
            <img className="mt-5" src={assets.amazonLogo} alt="Amazon Link" />
          </Link>
        </div>
      </section>
    </main>
  );
}

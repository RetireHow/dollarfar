import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

type TPageHeroProps = {
  title: string;
  description: string;
  image: string;
};

export default function PageHero({data}:{data:TPageHeroProps}) {
    const { title, description, image } = data;
    const navigate = useNavigate();
    const handleGoBack = ()=>navigate(-1);
  return (
    <section className="bg-gradient-to-r from-teal-100 to-orange-100 dark:from-gray-700 dark:to-gray-900 border-[1px] border-orange-100 dark:border-gray-700 md:px-[5rem] px-[2rem] py-[2.5rem] space-y-[1.5rem] relative" data-html2canvas-ignore>
        <button onClick={handleGoBack} className="flex items-center gap-[1rem] border-[1px] bg-teal-500 text-white border-teal-500 rounded-[10px] px-[1.5rem] py-[0.5rem] md:text-[18px] text-[14px] font-bold">
          <Icon icon="gg:arrow-left" width="24" height="24" />
          <span>Back</span>
        </button>

      <h3 className="md:text-[28px] font-extrabold dark:text-darkModeHeadingTextColor">{title}</h3>
      <p className="md:text-[18px] text-[14px]  dark:text-darkModeNormalTextColor leading-[27px] md:mr-[8rem]">
        {description}
      </p>
      <div className="absolute bottom-0 right-0 flex justify-end">
        <img className="md:w-auto w-[80px]" src={image} alt="" />
      </div>
    </section>
  );
}

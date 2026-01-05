import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

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
    <section className="bg-black text-white md:px-[5rem] px-[2rem] py-[2.5rem] space-y-[1.5rem] relative" data-html2canvas-ignore>
        <button onClick={handleGoBack} className="flex items-center gap-[1rem] border-[1px] border-[#EAECF0] rounded-[10px] px-[1.5rem] py-[0.5rem] md:text-[18px] text-[14px] font-bold">
          <img className="md:w-auto w-[20px]" src={assets.leftArrow} alt="" />
          <span>Back</span>
        </button>

      <h3 className="md:text-[28px] font-extrabold dark:text-darkModeHeadingTextColor">{title}</h3>
      <p className="md:text-[18px] text-[14px] text-[#DADADA] dark:text-darkModeNormalTextColor leading-[27px] md:mr-[8rem]">
        {description}
      </p>
      <div className="absolute bottom-0 right-0 flex justify-end">
        <img className="md:w-auto w-[80px]" src={image} alt="" />
      </div>
    </section>
  );
}

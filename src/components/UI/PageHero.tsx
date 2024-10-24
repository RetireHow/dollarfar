import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";

type TPageHeroProps = {
  title: string;
  description: string;
  image: string;
};

export default function PageHero({data}:{data:TPageHeroProps}) {
    const { title, description, image } = data;
  return (
    <section className="bg-black text-white md:px-[5rem] px-[1rem] py-[2.5rem] space-y-[1.5rem] relative mb-[5rem]">
      <Link to="/">
        <button className="flex items-center gap-[1rem] border-[1px] border-[#EAECF0] rounded-[10px] px-[1.5rem] py-[0.5rem] text-[18px] font-bold">
          <img src={assets.leftArrow} alt="" />
          <span> Back</span>
        </button>
      </Link>
      <h3 className="text-[28px] font-extrabold">{title}</h3>
      <p className="text-[18px] text-[#DADADA] leading-[27px] md:mr-[8rem]">
        {description}
      </p>
      <div className="md:absolute bottom-0 right-0">
        <img src={image} alt="" />
      </div>
    </section>
  );
}

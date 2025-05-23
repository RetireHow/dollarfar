import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";

type TCalculatorCardProps = {
  id: number;
  title: string;
  description: string;
  arrowIcon: string;
  calcIcon: string;
  btnText: string;
  navLink: string;
};

export default function CalculatorCard({
  item,
}: {
  item: TCalculatorCardProps;
}) {
  const { title, description, calcIcon, navLink } = item;
  return (
    <div className="border-[1px] border-[#EAECF0] dark:border-darkModeBorderColor shadow-sm hover:border-[#b5b8bd] dark:hover:border-darkModeHoverColor duration-300 rounded-[10px] flex flex-col justify-between hover:scale-105">
      <div className="pt-[1.5rem] px-[1.5rem]">
        <h3 className="md:text-[28px] text-[18px] font-bold mb-[1rem] dark:text-darkModeHeadingTextColor">
          {title}
        </h3>
        <p className="md:text-[18px] text-[14px] text-[#696969] dark:text-darkModeNormalTextColor">{description}</p>
      </div>
      <Link to={navLink}>
        <div className="flex justify-between items-center text-[#404040] dark:text-darkModeNormalTextColor dark:hover:text-darkModeHoverColor">
          <div className="flex items-center gap-[1.5rem] pl-[1.5rem]">
            <p className="font-semibold text-[18px]">
              Calculate
            </p>
            <img
              className="w-[1.5rem] h-[1.5rem]"
              src={assets.arrowUpIcon}
              alt="Arrow Icon"
            />
          </div>
          <img
            className="md:w-[150px] w-[80px] md:h-[90px] h-[80px] md:mb-0 mb-[-0.2rem]"
            src={calcIcon}
            alt="Calculator Icon"
          />
        </div>
      </Link>
    </div>
  );
}

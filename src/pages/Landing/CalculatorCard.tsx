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
    <div className="border-[1px] border-[#EAECF0] hover:border-[#b5b8bd] duration-300 rounded-[10px] flex flex-col justify-between hover:scale-105">
      <div className="pt-[1.5rem] px-[1.5rem]">
        <h3 className="md:text-[28px] text-[18px] font-bold mb-[1rem]">
          {title}
        </h3>
        <p className="md:text-[18px] text-[14px] text-[#696969]">{description}</p>
      </div>
      <Link to={navLink}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-[1.5rem] pl-[1.5rem]">
            <p className="font-semibold text-[18px] text-[#404040]">
              Calculate
            </p>
            <img
              className="w-[1.5rem] h-[1.5rem]"
              src={assets.arrowUpIcon}
              alt="Arrow Icon"
            />
          </div>
          <img
            className="md:w-[150px] w-[100px] md:h-[90px] h-[50px]"
            src={calcIcon}
            alt="Calculator Icon"
          />
        </div>
      </Link>
    </div>
  );
}

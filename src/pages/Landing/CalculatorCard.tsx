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
  const { title, description, arrowIcon, calcIcon, btnText, navLink } = item;
  return (
    <div className="border-[1px] border-[#EAECF0] rounded-[10px] flex flex-col justify-between">
      <div className="pt-[1.5rem] px-[1.5rem]">
      <h3 className="md:text-[28px] text-[1.25rem] font-bold mb-[1rem]">
        {title}
      </h3>
      <p className="text-[18px] text-[#696969]">
        {description}
      </p>
      </div>
      <div className="flex justify-between items-center">
        <Link to={navLink}>
        <div className="flex items-center gap-[1.5rem] pl-[1.5rem]">
          <p className="font-semibold text-[18px] text-[#404040]">Calculate</p>
          <img
            className="w-[1.5rem] h-[1.5rem]"
            src={assets.arrowUpIcon}
            alt="Arrow Icon"
          />
        </div>
        </Link>
        <img
          className="w-[150px] h-[90px]"
          src={calcIcon}
          alt="Calculator Icon"
        />
      </div>
    </div>
  );
}

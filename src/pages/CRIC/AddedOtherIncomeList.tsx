import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { removeAddedOtherIncome } from "../../redux/features/CRIC/CRICSlice";
import { toast } from "react-toastify";
import EditAddedOtherIncomeModal from "./EditAddedOtherIncomeModal";
import { numberWithCommas } from "../../utils/numberWithCommas";

export default function AddedOtherIncomeList() {
  const dispatch = useAppDispatch();
  const {
    calculatedResult: {
      otherIncomeResult: { addedOtherIncomesList },
    },
  } = useAppSelector((state) => state.CRICalculator);
  console.log(addedOtherIncomesList)
  const handleRemoveAddedOtherIncome = (index: number) => {
    const isConfirmed = window.confirm("Are you sure to delete this ?");
    if (!isConfirmed) {
      return;
    }
    dispatch(removeAddedOtherIncome(index));
    toast.success("Successfully Deleted.");
  };
  return (
    <div>
      <h5 className="font-bold mb-2 bg-green-100 p-3 rounded-md">
        Added Other Income(s) :{" "}
      </h5>
      <ul className="space-y-5 border-[1px] border-gray-300 rounded-md p-3 inline-block shadow-lg">
        {addedOtherIncomesList.map((item, index) => {
          const totalAnnualIncome =
            Number(item.otherIncomeAmount) * Number(item.otherIncomeFrequency);
          return (
            <li
              key={index}
              className="flex items-center flex-wrap md:gap-10 gap-5"
            >
              <p className="flex-1">
                {item.otherIncomeType} ({numberWithCommas(totalAnnualIncome)})
              </p>
              <div className="flex items-center gap-3">
                <EditAddedOtherIncomeModal index={index} item={item} />
                <p
                  onClick={() => handleRemoveAddedOtherIncome(index)}
                  className="border-[1px] border-red-500 px-3 py-1 rounded-md text-red-500 cursor-pointer hover:bg-red-500 hover:text-white duration-300"
                >
                  Remove
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

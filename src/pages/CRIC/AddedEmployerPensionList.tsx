import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { removeAddedEmployerPension } from "../../redux/features/CRIC/CRICSlice";
import { toast } from "react-toastify";
import EditAddedEmployerPensionModal from "./EditAddedEmployerPensionsModal";
import { numberWithCommas } from "../../utils/numberWithCommas";

export default function AddedEmployerPensionList() {
  const dispatch = useAppDispatch();
  const {
    calculatedResult: {
      employerPensionResult: { addedEmployerPensionsList },
    },
  } = useAppSelector((state) => state.CRICalculator);

  const handleRemoveAddedEmployerPension = (index: number) => {
    const isConfirmed = window.confirm("Are you sure to delete this ?");
    if (!isConfirmed) {
      return;
    }
    dispatch(removeAddedEmployerPension(index));
    toast.success("Successfully Deleted.");
  };

  return (
    <div>
      <h5 className="font-bold mb-2 bg-green-100 p-3 rounded-md">
        Added Employer Pension(s) :{" "}
      </h5>
      <ul className="space-y-5 border-[1px] border-gray-300 rounded-md p-3 inline-block shadow-lg">
        {addedEmployerPensionsList.map((item, index) => {
          return (
            <li
              key={index}
              className="flex items-center flex-wrap md:gap-10 gap-5"
            >
              <p className="flex-1">
                {item.pensionPlanType} (
                {numberWithCommas(Number(item?.annualPension))})
              </p>
              <div className="flex items-center gap-3">
                <EditAddedEmployerPensionModal index={index} item={item} />
                <p
                  onClick={() => handleRemoveAddedEmployerPension(index)}
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

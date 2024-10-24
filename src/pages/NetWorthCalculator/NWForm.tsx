import { Icon } from "@iconify/react/dist/iconify.js";
// import { useEffect } from "react";
import PropertyInputFields from "./Inputs/PropertyInputFields";

export default function NWForm() {
  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // }, []);

  return (
    <section className="mb-[5rem] grid md:grid-cols-2 grid-cols-1 gap-[2.5rem]">
      <div>
        <h3 className="font-bold text-[2rem] mb-[1.5rem]">Assets</h3>

        <div>
          {/* Main Input Field  */}
          <div className="flex justify-between items-center text-[1.2rem] mb-1">
            <label
              className="flex items-center gap-1 font-semibold"
              htmlFor="property"
            >
              <span>Property</span>{" "}
              <Icon
                className="text-[#838383] text-[1rem]"
                icon="material-symbols:info-outline"
              />
            </label>
            <button className="font-semibold flex items-center gap-1">
              <span>Add Properties</span>
              <Icon className="text-[1.25rem]" icon="ic:round-plus" />
            </button>
          </div>
          <input
            className="border-[1px] border-[#838383] rounded-[8px] p-[0.6rem] outline-none w-full"
            type="number"
            placeholder="$0"
            onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
              e.currentTarget.blur()
            }
          />
          {/* Sub-menus Container */}
          <div className="mt-3 text-[14px] flex gap-[1.5rem] overflow-x-auto pb-2">
            {/* Sub Input-1  */}
            <div>
              <div className="mb-1">
                <label
                  className="flex items-center gap-1 font-semibold"
                  htmlFor="property"
                >
                  <span className="text-nowrap">Principal Residence</span>{" "}
                  <Icon
                    className="text-[#838383] text-[1rem] min-w-[1rem] min-h-[1rem]"
                    icon="material-symbols:info-outline"
                  />
                </label>
              </div>
              <input
                className="border-[1px] min-w-[140px] border-[#838383] rounded-[8px] p-[0.6rem] outline-none w-full"
                type="number"
                placeholder="$0"
                onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                  e.currentTarget.blur()
                }
              />
            </div>
            {/* Sub Input-2  */}
            <div>
              <div className="mb-1">
                <label
                  className="flex items-center gap-1 font-semibold"
                  htmlFor="property"
                >
                  <span className="text-nowrap">Cottage</span>{" "}
                  <Icon
                    className="text-[#838383] text-[1rem] min-w-[1rem] min-h-[1rem]"
                    icon="material-symbols:info-outline"
                  />
                </label>
              </div>
              <input
                className="border-[1px] min-w-[140px] border-[#838383] rounded-[8px] p-[0.6rem] outline-none w-full"
                type="number"
                placeholder="$0"
                onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                  e.currentTarget.blur()
                }
              />
            </div>
            {/* Sub Input-3  */}
            <div>
              <div className="mb-1">
                <label
                  className="flex items-center gap-1 font-semibold"
                  htmlFor="property"
                >
                  <span className="text-nowrap">Real Estate Assets</span>{" "}
                  <Icon
                    className="text-[#838383] text-[1rem] min-w-[1rem] min-h-[1rem]"
                    icon="material-symbols:info-outline"
                  />
                </label>
              </div>
              <input
                className="border-[1px] min-w-[140px] border-[#838383] rounded-[8px] p-[0.6rem] outline-none w-full"
                type="number"
                placeholder="$0"
                onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
                  e.currentTarget.blur()
                }
              />
            </div>
            {/* Add More Button Container  */}
            <div>
              <div className="mb-1 opacity-0">
                <label
                  className="flex items-center gap-1 font-medium"
                  htmlFor="property"
                >
                  <span className="text-nowrap">Real Estate Assets</span>{" "}
                  <Icon
                    className="text-[#838383] text-[1rem] min-w-[1rem] min-h-[1rem]"
                    icon="material-symbols:info-outline"
                  />
                </label>
              </div>
              <button className="font-semibold text-nowrap border-[1px] border-[#E5E5E5] rounded-[8px] py-[0.2rem] px-[1rem]">
                <span className="text-[1.3rem] pr-1">+</span> Add More
              </button>
            </div>
          </div>
        </div>

        <PropertyInputFields/>


      </div>
      <div>
        <h3 className="font-bold text-[2rem] mb-[1.5rem]">Liabilities</h3>
      </div>
    </section>
  );
}
